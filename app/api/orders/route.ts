// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId VARCHAR(64) UNIQUE,
        customerName VARCHAR(255),
        customerEmail VARCHAR(255),
        phone VARCHAR(32),
        payment_method VARCHAR(16) DEFAULT 'Prepaid',
        address TEXT,
        city VARCHAR(128),
        state VARCHAR(128),
        pincode VARCHAR(16),
        totalAmount INT,
        status VARCHAR(32) DEFAULT 'new',
        shipping_provider VARCHAR(32) DEFAULT 'unassigned',
        orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)
    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId INT NOT NULL,
        name VARCHAR(255),
        quantity INT,
        price INT,
        FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_shipment_id VARCHAR(64) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_awb VARCHAR(64) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_label_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_manifest_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_tracking_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_courier VARCHAR(128) NULL") } catch {}

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
    const { id, newStatus, provider } = await req.json();

    if (!id && typeof id !== 'number') {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }
    const fields: string[] = []
    const values: any[] = []
    if (typeof newStatus === 'string') { fields.push("status = ?"); values.push(newStatus) }
    if (typeof provider === 'string') { fields.push("shipping_provider = ?"); values.push(provider) }
    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }
    values.push(id)
    await db.query(`UPDATE orders SET ${fields.join(', ')} WHERE id = ?`, values)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      orderId,
      customerName,
      customerEmail,
      phone,
      address,
      city,
      state,
      pincode,
      totalAmount,
      items = [],
    } = body || {}

    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId VARCHAR(64) UNIQUE,
        customerName VARCHAR(255),
        customerEmail VARCHAR(255),
        phone VARCHAR(32),
        payment_method VARCHAR(16) DEFAULT 'Prepaid',
        address TEXT,
        city VARCHAR(128),
        state VARCHAR(128),
        pincode VARCHAR(16),
        totalAmount INT,
        status VARCHAR(32) DEFAULT 'new',
        shipping_provider VARCHAR(32) DEFAULT 'unassigned',
        orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)
    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId INT NOT NULL,
        name VARCHAR(255),
        quantity INT,
        price INT,
        FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_shipment_id VARCHAR(64) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_awb VARCHAR(64) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_label_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_manifest_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_tracking_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE orders ADD COLUMN shipping_courier VARCHAR(128) NULL") } catch {}

    const [result] = await db.query(
      `INSERT INTO orders (orderId, customerName, customerEmail, phone, payment_method, address, city, state, pincode, totalAmount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, customerName, customerEmail, phone, (body.paymentMethod || 'Prepaid'), address, city, state, pincode, totalAmount]
    )
    // @ts-ignore
    const id = result.insertId as number

    if (Array.isArray(items)) {
      for (const it of items) {
        const { name, quantity, price } = it || {}
        await db.query(
          `INSERT INTO order_items (orderId, name, quantity, price) VALUES (?, ?, ?, ?)`,
          [id, name || '', Number(quantity) || 1, Number(price) || 0]
        )
      }
    }

    return NextResponse.json({ success: true, id })
  } catch (e: any) {
    console.error('order create error', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
 
