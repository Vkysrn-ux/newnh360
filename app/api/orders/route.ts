// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const [orders] = await db.query("SELECT * FROM orders ORDER BY orderDate DESC")

    for (const order of orders as any[]) {
      const [items] = await db.query("SELECT * FROM order_items WHERE orderId = ?", [order.id])
      order.items = items
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    
    const { id, newStatus } = await req.json();

    if (!id || !newStatus) {
      return NextResponse.json({ error: "Missing orderId or newStatus" }, { status: 400 })
    }

    await db.query("UPDATE orders SET status = ? WHERE id = ?", [newStatus, id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
 