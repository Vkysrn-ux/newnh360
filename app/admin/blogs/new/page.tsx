"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug: slug || undefined, excerpt, content }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to create post")
      router.push("/admin/blogs")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6">New Blog Post</h1>
          <Card className="border-orange-900 bg-neutral-900">
            <CardContent className="p-6 space-y-4">
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input placeholder="Custom slug (optional)" value={slug} onChange={(e) => setSlug(e.target.value)} />
              <Input placeholder="Excerpt (optional)" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[240px] w-full rounded-md border border-orange-900 bg-neutral-950 p-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-700"
              />
              <div className="flex justify-end">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={submit} disabled={saving || !title || !content}>
                  {saving ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

