"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Post = {
  slug: string
  title: string
  created_at?: string
}

export default function AdminBlogsList({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const remove = async (slug: string) => {
    if (!confirm("Delete this post? This action cannot be undone.")) return
    setError(null)
    setLoadingSlug(slug)
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to delete")
      }
      router.refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoadingSlug(null)
    }
  }

  return (
    <div className="space-y-3">
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div className="divide-y divide-orange-900/60 rounded-xl border border-orange-900 bg-neutral-900">
        {posts.map((p) => (
          <div key={p.slug} className="p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-white font-semibold">{p.title}</div>
              <div className="text-xs text-gray-500">{p.created_at ? new Date(p.created_at).toLocaleString() : "—"}</div>
            </div>
            <div className="flex items-center gap-3">
              <Link className="text-orange-400 hover:text-orange-300 text-sm" href={`/blog/${p.slug}`}>
                View
              </Link>
              <Link className="text-orange-400 hover:text-orange-300 text-sm" href={`/admin/blogs/${p.slug}`}>
                Edit
              </Link>
              <button
                onClick={() => remove(p.slug)}
                disabled={loadingSlug === p.slug}
                className="text-red-400 hover:text-red-300 text-sm disabled:opacity-60"
              >
                {loadingSlug === p.slug ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

