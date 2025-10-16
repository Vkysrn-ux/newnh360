import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyPassword, signToken } from "@/lib/auth"

export const runtime = "nodejs"
const cookieName = "nh360_auth"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = String(body?.email || "").trim().toLowerCase()
    const password = String(body?.password || "")
    if (!email || !password) return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 })

    const [rows]: any = await db.query("SELECT id, role, password_hash FROM users WHERE email=?", [email])
    if (!rows.length) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    const u = rows[0]
    if (!u.password_hash) return NextResponse.json({ success: false, message: "Password not set; use OTP login" }, { status: 400 })

    const ok = verifyPassword(password, u.password_hash)
    if (!ok) return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })

    await db.query("UPDATE users SET last_login_at=NOW() WHERE id=?", [u.id])
    const token = signToken({ uid: u.id, role: u.role })
    const res = NextResponse.json({ success: true, role: u.role })
    res.cookies.set(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || "Error" }, { status: 500 })
  }
}

