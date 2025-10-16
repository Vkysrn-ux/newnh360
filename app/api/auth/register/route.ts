import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hashPassword, normalizePhone } from "@/lib/auth"

export const runtime = "nodejs"

async function ensureTables() {
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
  // For existing tables, try to add missing columns
  try { await db.query("ALTER TABLE users ADD COLUMN email_verified_at DATETIME NULL") } catch {}
  try { await db.query("ALTER TABLE users ADD COLUMN email_verify_token VARCHAR(255) NULL") } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, password } = body || {}
    const emailNorm = String(email || "").trim().toLowerCase()
    const phoneNorm = normalizePhone(phone || undefined)
    if (!emailNorm) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    await ensureTables()

    // Decide role via env allowlist
    const admins = (process.env.ADMIN_EMAILS || "").toLowerCase().split(/[,\s]+/).filter(Boolean)
    const role = admins.includes(emailNorm) ? "admin" : "user"

    // Existing user?
    const [rows]: any = await db.query("SELECT id FROM users WHERE email = ?", [emailNorm])
    if (rows.length) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 409 })
    }

    const password_hash = password ? hashPassword(String(password)) : null
    await db.query(
      "INSERT INTO users (name, email, phone, role, password_hash) VALUES (?, ?, ?, ?, ?)",
      [name || null, emailNorm, phoneNorm || null, role, password_hash]
    )

    return NextResponse.json({ success: true, message: "Registered successfully", role })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || "Error" }, { status: 500 })
  }
}
