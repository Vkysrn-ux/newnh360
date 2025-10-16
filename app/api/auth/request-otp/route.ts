import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { db } from "@/lib/db"
import { generateOtp } from "@/lib/auth"

export const runtime = "nodejs"

async function ensureTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NULL,
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(32) UNIQUE NULL,
      role ENUM('user','admin') DEFAULT 'user',
      password_hash VARCHAR(255) NULL,
      otp_hash VARCHAR(255) NULL,
      otp_salt VARCHAR(255) NULL,
      otp_expires_at DATETIME NULL,
      email_verified_at DATETIME NULL,
      email_verify_token VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_login_at DATETIME NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)
  try { await db.query("ALTER TABLE users ADD COLUMN email_verified_at DATETIME NULL") } catch {}
  try { await db.query("ALTER TABLE users ADD COLUMN email_verify_token VARCHAR(255) NULL") } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = String(body?.email || "").trim().toLowerCase()
    if (!email) return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })

    await ensureTable()
    const [rows]: any = await db.query("SELECT id, name FROM users WHERE email = ?", [email])
    if (!rows.length) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    const user = rows[0]

    const { code, salt, hash } = generateOtp()
    const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    await db.query("UPDATE users SET otp_hash=?, otp_salt=?, otp_expires_at=? WHERE id=?", [hash, salt, expires, user.id])

    const env = process.env as Record<string, string | undefined>
    const {
      SMTP_HOST,
      SMTP_PORT = "587",
      SMTP_SECURE = "false",
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM = "NH360 FASTag <no-reply@nh360fastag.com>",
    } = env

    if (SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport(
        SMTP_HOST
          ? { host: SMTP_HOST, port: Number(SMTP_PORT), secure: SMTP_SECURE === "true", auth: { user: SMTP_USER, pass: SMTP_PASS } }
          : { service: "gmail", auth: { user: SMTP_USER, pass: SMTP_PASS } }
      )
      try { await transporter.verify() } catch {}
      await transporter.sendMail({
        from: SMTP_FROM,
        to: email,
        subject: "Your NH360 login code",
        html: `<p>Hi${user.name ? ` ${user.name}` : ""},</p><p>Your login code is <b>${code}</b>.</p><p>It expires in 10 minutes.</p>`,
      })
    }

    return NextResponse.json({ success: true, message: "OTP sent" })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || "Error" }, { status: 500 })
  }
}
