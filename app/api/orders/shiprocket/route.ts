import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { Shiprocket } from "@/lib/shiprocket"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })

    // Ensure schema
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_shipment_id VARCHAR(64) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_awb VARCHAR(64) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_label_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_manifest_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_tracking_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_courier VARCHAR(128) NULL") } catch {}

    const [oRows] = await db.query("SELECT * FROM orders WHERE id = ? LIMIT 1", [id])
    const orders = oRows as any[]
    if (!orders || orders.length === 0) return NextResponse.json({ error: "not found" }, { status: 404 })
    const o = orders[0]
    const [iRows] = await db.query("SELECT name, quantity, price FROM order_items WHERE orderId = ?", [id])
    const items = (iRows as any[]) || []

    const payload: any = {
      order_id: o.orderId,
      order_date: new Date(o.orderDate || Date.now()).toISOString(),
      billing_customer_name: String(o.customerName || '').slice(0, 40),
      billing_address: String(o.address || '').slice(0, 200),
      billing_city: o.city || '',
      billing_pincode: o.pincode || '',
      billing_state: o.state || '',
      billing_email: o.customerEmail || 'na@example.com',
      billing_phone: o.phone || '0000000000',
      payment_method: (o.payment_method === 'COD' ? 'COD' : 'Prepaid') as 'Prepaid' | 'COD',
      sub_total: Number(o.totalAmount || 0),
      length: 10,
      breadth: 10,
      height: 2,
      weight: 0.5,
      order_items: items.map((it) => ({ name: it.name || 'Item', units: Number(it.quantity) || 1, selling_price: Number(it.price) || 0 })),
    }
    if (payload.payment_method === 'COD') {
      payload.collectable_amount = Number(o.totalAmount || 0)
    }

    const created = await Shiprocket.createOrder(payload)
    const shipment_id = created?.shipment_id || created?.data?.shipment_id || null
    await db.query(
      "UPDATE orders SET shipping_provider = 'shiprocket', status = 'processing', shipping_shipment_id = ? WHERE id = ?",
      [shipment_id, id]
    )

    return NextResponse.json({ success: true, shipment_id, raw: created })
  } catch (e: any) {
    console.error('shiprocket create error', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
