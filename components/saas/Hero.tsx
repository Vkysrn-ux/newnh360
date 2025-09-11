import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SaasHero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 bg-gradient-to-br from-orange-50 via-white to-white">
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-semibold">FASTag SaaS Platform</span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Buy, Recharge & Manage FASTag
              <span className="text-orange-600"> Seamlessly</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              NH360 FASTag helps individuals and fleets issue tags, recharge across issuers, update KYC and resolve blacklist disputes with 24×7 support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white h-12 px-8 text-base">
                <Link href="#buy">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-8 text-base border-orange-600 text-orange-700 hover:bg-orange-50">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">5,000+</div>
                <div className="text-gray-500 text-sm">Tags Issued</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">900+</div>
                <div className="text-gray-500 text-sm">Fleets Served</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">24×7</div>
                <div className="text-gray-500 text-sm">Expert Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl border border-orange-100 shadow-2xl overflow-hidden">
              <Image
                src="/images/product-catalog.png"
                alt="NH360 FASTag dashboard"
                width={1000}
                height={700}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-orange-100 rounded-xl p-4 shadow-xl">
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-2xl font-bold text-orange-600">₹499</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

