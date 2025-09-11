import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import LeadForm from "./lead-form"

export const metadata: Metadata = {
  title: "Buy FASTag | NH360 FASTag",
}

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <section className="py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          <div className="lg:col-span-2 -mt-2 mb-2">
            <Link href="/" className="text-orange-400 hover:text-orange-300 text-sm">← Back to Home</Link>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Buy FASTag</h1>
            <p className="text-gray-400">Same‑day activation with doorstep KYC assistance for all vehicle classes.</p>
            <ul className="space-y-2 text-sm">
              {[
                "New tag issuance for cars, LCVs, trucks and buses",
                "Assisted KYC and document guidance",
                "Support for all major issuers",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm product="Buy FASTag" />
        </div>
      </section>
    </div>
  )
}
