import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

const cookieName = "nh360_auth"
export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const token = req.cookies.get(cookieName)?.value
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 })
  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ authenticated: false }, { status: 401 })

  const [rows]: any = await db.query(
    "SELECT id, name, email, phone, role, email_verified_at, created_at, last_login_at FROM users WHERE id=?",
    [payload.uid]
  )
  const user = rows[0]

  // Orders linked by email for now
  let orders: any[] = []
  if (user?.email) {
    try {
      const [o]: any = await db.query(
        "SELECT id, orderId, totalAmount, status, orderDate FROM orders WHERE customerEmail = ? ORDER BY orderDate DESC LIMIT 100",
        [user.email]
      )
      orders = o
    } catch {}
  }

  return NextResponse.json({ authenticated: true, user, orders })
}
