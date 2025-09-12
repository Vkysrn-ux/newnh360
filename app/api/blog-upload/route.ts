import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const kind = (formData.get("kind") as string) || "image" // image | doc

    if (!file) return NextResponse.json({ error: "file is required" }, { status: 400 })

    const baseDir = path.join(process.cwd(), "public", "uploads", "blogs", kind === "doc" ? "docs" : "images")
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const ext = (file.name.split(".").pop() || "bin").toLowerCase()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const filePath = path.join(baseDir, filename)
    fs.writeFileSync(filePath, buffer)

    const url = `/uploads/blogs/${kind === "doc" ? "docs" : "images"}/${filename}`
    return NextResponse.json({ url })
  } catch (e: any) {
    console.error("blog upload error", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

