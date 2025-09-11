import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog | NH360 FASTag",
}

const posts = [
  { slug: "fastag-basics", title: "FASTag Basics: How It Works", excerpt: "Understand FASTag, KYC, and toll processing.", date: "2025-01-10" },
  { slug: "issuer-recharge", title: "Recharge Across Issuers", excerpt: "Tips to recharge any bank’s FASTag without issues.", date: "2025-01-08" },
  { slug: "blacklist-fixes", title: "Fixing Blacklist Quickly", excerpt: "Common causes and quick resolution steps.", date: "2025-01-05" },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-orange-400 hover:text-orange-300 text-sm">← Back to Home</Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Blog</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.slug} className="rounded-xl border border-orange-900 bg-neutral-900 p-6">
                <div className="text-xs text-gray-500 mb-2">{new Date(p.date).toLocaleDateString()}</div>
                <h2 className="text-xl font-semibold text-white mb-2">{p.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{p.excerpt}</p>
                <Link href="#" className="text-orange-400 hover:text-orange-300 text-sm">Read more →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
