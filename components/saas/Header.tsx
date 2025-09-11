"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import TextHoverLogo from "./TextHoverLogo"
import ResizableNavbar from "./ResizableNavbar"

export default function SaasHeader() {
  const [open, setOpen] = useState(false)
  const nav = [
    { href: "/", label: "Home" },
    { href: "/buy", label: "Buy FASTag" },
    { href: "/recharge", label: "Recharge FASTag" },
    { href: "/support", label: "Get Support" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <TextHoverLogo />
        </Link>

        <ResizableNavbar
          items={[
            { label: "Home", href: "/" },
            { label: "Buy FASTag", href: "/#buy" },
            { label: "Recharge FASTag", href: "/#recharge" },
            { label: "Get Support", href: "/#services" },
            { label: "Blog", href: "/#blog" },
            { label: "Contact Us", href: "/contact" },
          ]}
        />

        <div className="hidden md:flex items-center gap-3">
          <Link href="/buy" className="text-gray-300 hover:text-white">Sign in</Link>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
            <Link href="/buy">Get Started</Link>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-orange-800 text-gray-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25A.75.75 0 0 1 4.5 11h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-orange-900 bg-black">
          <div className="px-4 py-3 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-gray-200" onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white w-full">
              <Link href="/buy" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
