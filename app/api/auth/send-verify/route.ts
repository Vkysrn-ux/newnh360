import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    const emailNorm = String(email || "").trim().toLowerCase()
    if (!emailNorm) return NextResponse.json({ success: false, message: "Email required" }, { status: 400 })

    const [rows]: any = await db.query("SELECT id, name FROM users WHERE email=?", [emailNorm])
    if (!rows.length) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    const u = rows[0]

    // token
    const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    await db.query("UPDATE users SET email_verify_token=? WHERE id=?", [token, u.id])

    const APP_URL = (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "")
    const link = `${APP_URL}/api/auth/verify-email?email=${encodeURIComponent(emailNorm)}&token=${encodeURIComponent(token)}`

    const {
      SMTP_HOST,
      SMTP_PORT = "587",
      SMTP_SECURE = "false",
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM = "NH360 FASTag <no-reply@nh360fastag.com>",
    } = process.env as Record<string, string | undefined>

    if (SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport(
        SMTP_HOST
          ? { host: SMTP_HOST, port: Number(SMTP_PORT), secure: SMTP_SECURE === "true", auth: { user: SMTP_USER, pass: SMTP_PASS } }
          : { service: "gmail", auth: { user: SMTP_USER, pass: SMTP_PASS } }
      )
      try { await transporter.verify() } catch {}
      await transporter.sendMail({
        from: SMTP_FROM,
        to: emailNorm,
        subject: "Verify your email",
        html: `<p>Hi${u.name ? ` ${u.name}` : ""},</p><p>Please verify your email:</p><p><a href="${link}">${link}</a></p>`,
      })
    }

    return NextResponse.json({ success: true, message: "Verification email sent" })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || "Error" }, { status: 500 })
  }
}

