import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const runtime = "nodejs"

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export async function GET() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt VARCHAR(500),
        content LONGTEXT NOT NULL,
        author VARCHAR(255),
        image_url VARCHAR(1024),
        doc_url VARCHAR(1024),
        youtube_url VARCHAR(512),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)
    // Best-effort alter in case table exists without new columns
    // Try to add potentially missing columns for forward compatibility
    try { await db.query("ALTER TABLE blogs ADD COLUMN image_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE blogs ADD COLUMN doc_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE blogs ADD COLUMN youtube_url VARCHAR(512) NULL") } catch {}
    try { await db.query("ALTER TABLE blogs ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP") } catch {}
    try { await db.query("ALTER TABLE blogs ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") } catch {}
    try {
      const [rows] = await db.query(
        "SELECT slug, title, excerpt, created_at FROM blogs ORDER BY created_at DESC LIMIT 200"
      )
      return NextResponse.json(rows)
    } catch (e) {
      // Fallback if created_at doesn't exist in legacy schema
      const [rows] = await db.query(
        "SELECT slug, title, excerpt, NULL AS created_at FROM blogs LIMIT 200"
      )
      return NextResponse.json(rows)
    }
  } catch (e: any) {
    console.error("blogs list error", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, excerpt = "", content = "", slug: providedSlug, author = "Admin", image_url = null, doc_url = null, youtube_url = null } = body || {}
    if (!title || !content) {
      return NextResponse.json({ error: "title and content are required" }, { status: 400 })
    }

    await db.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt VARCHAR(500),
        content LONGTEXT NOT NULL,
        author VARCHAR(255),
        image_url VARCHAR(1024),
        doc_url VARCHAR(1024),
        youtube_url VARCHAR(512),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)
    try { await db.query("ALTER TABLE blogs ADD COLUMN image_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE blogs ADD COLUMN doc_url VARCHAR(1024) NULL") } catch {}
    try { await db.query("ALTER TABLE blogs ADD COLUMN youtube_url VARCHAR(512) NULL") } catch {}
    try { await db.query("ALTER TABLE blogs ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP") } catch {}
    try { await db.query("ALTER TABLE blogs ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") } catch {}

    let slug = providedSlug && providedSlug.trim() ? providedSlug.trim().toLowerCase() : slugify(title)

    // ensure uniqueness
    let unique = slug
    let i = 1
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const [rows] = await db.query("SELECT slug FROM blogs WHERE slug = ? LIMIT 1", [unique])
      // @ts-ignore
      if (!rows || (Array.isArray(rows) && rows.length === 0)) break
      unique = `${slug}-${i++}`
    }
    slug = unique

    await db.query(
      "INSERT INTO blogs (slug, title, excerpt, content, author, image_url, doc_url, youtube_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [slug, title, excerpt, content, author, image_url, doc_url, youtube_url]
    )

    return NextResponse.json({ success: true, slug })
  } catch (e: any) {
    console.error("blogs create error", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
