import type { Metadata } from "next"
import Link from "next/link"
import { db } from "@/lib/db"
import PrintButton from "@/components/admin/print-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Order Details | Admin",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function AdminOrderDetail({ params }: { params: { id: string } }) {
  const idNum = Number(params.id)
  if (!idNum || Number.isNaN(idNum)) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="text-red-400">Invalid order id.</div>
          </div>
        </section>
      </div>
    )
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      orderId VARCHAR(64) UNIQUE,
      customerName VARCHAR(255),
      customerEmail VARCHAR(255),
      phone VARCHAR(32),
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

  const [orderRows] = await db.query(
    "SELECT id, orderId, customerName, customerEmail, phone, address, city, state, pincode, totalAmount, status, shipping_provider, orderDate FROM orders WHERE id = ? LIMIT 1",
    [idNum]
  )
  const orderList = orderRows as any[]
  if (!orderList || orderList.length === 0) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="mb-4"><Link href="/admin/dashboard" className="text-orange-400 hover:text-orange-300 text-sm">← Back</Link></div>
            <div className="text-red-400">Order not found.</div>
          </div>
        </section>
      </div>
    )
  }
  const order = orderList[0]

  const [itemRows] = await db.query(
    "SELECT id, name, quantity, price FROM order_items WHERE orderId = ? ORDER BY id ASC",
    [idNum]
  )
  const items = (itemRows as any[]) || []

  const formatPrice = (n: number) => `₹${Number(n || 0).toLocaleString()}`

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <section className="py-10">
        <div className="container mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="text-orange-400 hover:text-orange-300 text-sm">← Back to Dashboard</Link>
            <PrintButton />
          </div>

          <Card className="border-orange-900 bg-neutral-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Order #{order.orderId}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div><span className="text-gray-400">Date:</span> <span className="text-white">{order.orderDate ? new Date(order.orderDate).toLocaleString() : '—'}</span></div>
                <div><span className="text-gray-400">Customer:</span> <span className="text-white">{order.customerName}</span></div>
                <div><span className="text-gray-400">Email:</span> <span className="text-white">{order.customerEmail}</span></div>
                <div><span className="text-gray-400">Phone:</span> <span className="text-white">{order.phone || '—'}</span></div>
              </div>
              <div className="space-y-1">
                <div><span className="text-gray-400">Status:</span> <span className="text-white capitalize">{order.status || 'new'}</span></div>
                <div><span className="text-gray-400">Shipping:</span> <span className="text-white capitalize">{order.shipping_provider || 'unassigned'}</span></div>
                <div><span className="text-gray-400">Pincode:</span> <span className="text-white">{order.pincode}</span></div>
                <div><span className="text-gray-400">Total:</span> <span className="text-white">{formatPrice(order.totalAmount)}</span></div>
              </div>
              <div className="md:col-span-2">
                <div className="text-gray-400">Delivery Address</div>
                <div className="text-white">{order.address}, {order.city}, {order.state} - {order.pincode}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-900 bg-neutral-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Items</CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-gray-400">No items recorded.</div>
              ) : (
                <div className="divide-y divide-orange-900/60">
                  {items.map((it) => (
                    <div key={it.id} className="py-3 flex items-center justify-between">
                      <div className="text-white">{it.name}</div>
                      <div className="text-gray-400">Qty: {it.quantity}</div>
                      <div className="text-white">{formatPrice(it.price)}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
