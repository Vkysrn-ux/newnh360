import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Get Support | NH360 FASTag",
}

export default function SupportPage() {
  const categories = [
    { t: "KYC Update", d: "Update KYC or change vehicle/owner details", href: "/buy" },
    { t: "Blacklist Removal", d: "Resolve blacklist due to KYC or low balance", href: "/recharge" },
    { t: "Tag Replacement", d: "Replace damaged or lost FASTag", href: "/buy" },
    { t: "Dispute Help", d: "Toll double-charge or debit disputes", href: "/recharge" },
  ]

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-orange-400 hover:text-orange-300 text-sm">← Back to Home</Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Get Support</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <Card key={c.t} className="border-orange-900 bg-neutral-900">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold text-white">{c.t}</h3>
                  <p className="text-gray-400 text-sm">{c.d}</p>
                  <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white w-full">
                    <Link href={c.href}>Start</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
