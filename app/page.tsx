import type { Metadata } from "next"
import Link from "next/link"
import { HeroCarousel } from "@/components/hero-carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { ProductCarousel } from "@/components/product-carousel"
import BlogCarousel from "@/components/blog-carousel"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "NH360 FASTag – Saasland Styled | FASTag Sales & Support",
  description:
    "Buy FASTag, recharge across issuers, update KYC, resolve blacklist and manage fleets with NH360 FASTag.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-gray-200">
      <HeroCarousel />

      {/* Trust & Issuers */}
      <section className="py-12 border-y border-orange-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[{ k: "FASTags Issued", v: "5,000+" }, { k: "Recharge Assisted", v: "10,000+" }, { k: "Fleets Served", v: "900+" }].map((s) => (
              <CardSpotlight key={s.k}>
                <div className="text-3xl font-extrabold text-white">{s.v}</div>
                <div className="text-sm text-gray-400">{s.k}</div>
              </CardSpotlight>
            ))}
          </div>

          <div className="mt-8">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 text-center">Supported Issuers</div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["HDFC Bank", "ICICI Bank", "IDFC FIRST", "SBI", "Axis Bank", "Kotak", "Paytm", "Airtel Payments Bank"].map((n) => (
                <span key={n} className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-orange-900 text-gray-300 bg-neutral-950">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "FASTag Issuance", d: "Same‑day activation with KYC help" },
              { t: "Recharge Assistance", d: "Support for all issuers" },
              { t: "Fleet Solutions", d: "Bulk issuance & reports" },
            ].map((f, i) => (
              <div key={i} className="rounded-xl border border-orange-900 bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-md bg-orange-500/20 text-orange-300 flex items-center justify-center mb-3">{i + 1}</div>
                <h3 className="text-lg font-semibold text-white">{f.t}</h3>
                <p className="text-gray-400">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Share Details", d: "Tell us about your vehicle and city." },
              { t: "KYC & Issuer", d: "We guide you through KYC and bank selection." },
              { t: "Activation", d: "Tag is activated and ready for tolls." },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-orange-900 bg-neutral-900 p-6">
                <div className="w-8 h-8 rounded-md bg-orange-500/20 text-orange-300 flex items-center justify-center mb-3">{i + 1}</div>
                <h3 className="text-lg font-semibold text-white">{s.t}</h3>
                <p className="text-gray-400 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy FASTag */}
      <section id="buy" className="py-16 border-t border-orange-900/50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Buy FASTag</h2>
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
            <div className="pt-2">
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                <Link href="/buy">Get Started</Link>
              </Button>
            </div>
          </div>
          <Card className="border-orange-900 bg-neutral-900">
            <CardContent className="p-6 space-y-3">
              <div className="text-sm text-gray-400">Why NH360 FASTag?</div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {["PAN‑India assistance", "24×7 expert support", "Bulk / fleet issuance", "Dispute help"].map((x) => (
                  <div key={x} className="rounded-lg border border-orange-900/60 bg-neutral-950 p-3 text-gray-300">{x}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recharge FASTag */}
      <section id="recharge" className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Recharge FASTag</h2>
            <p className="text-gray-400">Top up any bank’s FASTag. Get help with failed recharges and reversals.</p>
            <ul className="space-y-2 text-sm">
              {["Recharge across all issuers", "Assistance for payment failures / reversals", "Instant help on disputes"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> {t}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button asChild variant="outline" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50">
                <Link href="/recharge">Recharge Now</Link>
              </Button>
            </div>
          </div>
          <Card className="border-orange-900 bg-neutral-900">
            <CardContent className="p-6 space-y-3">
              <div className="text-sm text-gray-400">Common issues we fix</div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {["Wallet not reflecting", "UPI/PG failure", "Reversal delays", "Bank app errors"].map((x) => (
                  <div key={x} className="rounded-lg border border-orange-900/60 bg-neutral-950 p-3 text-gray-300">{x}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 border-t border-orange-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8">Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "KYC Update", d: "Update KYC or change vehicle/owner details", href: "/buy" },
              { t: "Blacklist Removal", d: "Resolve blacklist due to KYC or low balance", href: "/recharge" },
              { t: "Tag Replacement", d: "Replace damaged or lost FASTag", href: "/buy" },
              { t: "Dispute Help", d: "Toll double‑charge or debit disputes", href: "/recharge" },
            ].map((c) => (
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

      {/* Products */}
      <section id="products" className="py-16 bg-black text-gray-200 border-y border-orange-900">
        <div className="container mx-auto px-4">
          {(() => {
            const issuers = ["SBI", "IDFC", "KOTAK", "AIRTEL"] as const
            const classes = [4, 5, 6, 7, 8, 9, 10, 12]
            const products = issuers.flatMap((issuer, i) =>
              classes.map((cls, j) => ({
                id: 2000 + i * 100 + cls,
                name: `${issuer} CLASS ${cls}`,
                price: cls >= 7 ? "₹599" : "₹499",
                originalPrice: cls >= 7 ? "₹699" : "₹599",
                image: "/placeholder.jpg",
                description: `FASTag issuance for Class ${cls} vehicles with KYC and activation support`,
                rating: 4.7,
                reviews: 900 + j * 30 + i * 10,
                category: "fastag",
                features: [
                  cls >= 7 ? "Fleet ready" : "Same‑day activation",
                  "PAN‑India",
                ],
              }))
            )
            return (
              <ProductCarousel
                title="FASTag Products"
                subtitle="SBI, IDFC, KOTAK, AIRTEL — Classes 4–12"
                disableLinks
                dark
                showDots={false}
                products={products as any}
              />
            )
          })()}
        </div>
      </section>

      {/* Blog teasers */}
      <section id="blog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">From the blog</h2>
            <Link href="/blog" className="text-orange-400 hover:text-orange-300 text-sm">View all</Link>
          </div>
          <BlogCarousel />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 border-t border-orange-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">FAQ</h2>
          <Accordion type="single" collapsible className="bg-neutral-900/60 rounded-xl border border-orange-900">
            <AccordionItem value="q1">
              <AccordionTrigger className="px-4 text-left text-white">How fast can I get a FASTag?</AccordionTrigger>
              <AccordionContent className="px-4 text-gray-300">Most tags are activated the same day once KYC is complete.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="px-4 text-left text-white">Do you support all issuers?</AccordionTrigger>
              <AccordionContent className="px-4 text-gray-300">Yes, we assist across major banks including HDFC, ICICI, SBI, Axis, IDFC FIRST, Kotak, Paytm and more.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="px-4 text-left text-white">Can you help with blacklist or disputes?</AccordionTrigger>
              <AccordionContent className="px-4 text-gray-300">We help resolve blacklist due to KYC/low balance and assist with toll double‑charge or debit disputes.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Ready to get your FASTag?</h2>
              <p className="text-orange-100">Quick onboarding with 24×7 expert support.</p>
            </div>
            <Link href="/buy" className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-orange-700 font-semibold hover:bg-orange-50">Get Started</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
