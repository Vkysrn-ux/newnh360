import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const runtime = "nodejs"

export async function GET() {
  const env = process.env as Record<string, string | undefined>
  const info: any = {
    host: env.MYSQL_HOST || "localhost",
    port: env.MYSQL_PORT || "3306",
    user: env.MYSQL_USER || "root",
    database: env.MYSQL_DATABASE || "ecomnh360web",
    ssl: env.MYSQL_SSL || "false",
  }
  try {
    await db.query("SELECT 1")
    info.connected = true
  } catch (e: any) {
    info.connected = false
    info.error = e?.message
    return NextResponse.json(info, { status: 500 })
  }
  try {
    const [tables] = await db.query("SHOW TABLES LIKE 'blogs'")
    // @ts-ignore
    const exists = Array.isArray(tables) && tables.length > 0
    info.blogsTable = exists
    if (exists) {
      const [rows] = await db.query("SELECT COUNT(*) AS cnt FROM blogs")
      const list = rows as any[]
      info.blogCount = list?.[0]?.cnt ?? 0
      const [sample] = await db.query(
        "SELECT slug, title, created_at FROM blogs ORDER BY created_at DESC LIMIT 3"
      )
      info.sample = sample
    }
  } catch (e: any) {
    info.blogsError = e?.message
  }
  return NextResponse.json(info)
}

