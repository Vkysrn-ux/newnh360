import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = String(searchParams.get("email") || "").trim().toLowerCase()
  const token = String(searchParams.get("token") || "")
  if (!email || !token) return NextResponse.json({ success: false, message: "Invalid link" }, { status: 400 })

  const [rows]: any = await db.query("SELECT id, email_verify_token FROM users WHERE email=?", [email])
  if (!rows.length) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
  const u = rows[0]
  if (!u.email_verify_token || u.email_verify_token !== token) {
    return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 400 })
  }
  await db.query("UPDATE users SET email_verified_at=NOW(), email_verify_token=NULL WHERE id=?", [u.id])
  return NextResponse.redirect(new URL("/login?verified=1", req.url))
}

