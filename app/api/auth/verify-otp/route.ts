import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { signToken, verifyOtp } from "@/lib/auth"

export const runtime = "nodejs"

const cookieName = "nh360_auth"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = String(body?.email || "").trim().toLowerCase()
    const code = String(body?.code || "").trim()
    if (!email || !code) return NextResponse.json({ success: false, message: "Email and code required" }, { status: 400 })

    const [rows]: any = await db.query("SELECT id, role, otp_hash, otp_salt, otp_expires_at FROM users WHERE email=?", [email])
    if (!rows.length) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    const u = rows[0]

    if (!u.otp_hash || !u.otp_salt || !u.otp_expires_at) {
      return NextResponse.json({ success: false, message: "No active OTP, request a new one" }, { status: 400 })
    }
    if (new Date(u.otp_expires_at).getTime() < Date.now()) {
      return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 })
    }
    if (!verifyOtp(code, u.otp_salt, u.otp_hash)) {
      return NextResponse.json({ success: false, message: "Invalid code" }, { status: 401 })
    }

    // Invalidate OTP and set last_login
    await db.query("UPDATE users SET otp_hash=NULL, otp_salt=NULL, otp_expires_at=NULL, last_login_at=NOW() WHERE id=?", [u.id])

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

