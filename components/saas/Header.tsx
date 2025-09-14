"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-context"
import TextHoverLogo from "./TextHoverLogo"
import ResizableNavbar from "./ResizableNavbar"

export default function SaasHeader() {
  const [open, setOpen] = useState(false)
  const { state, dispatch } = useCart()
  const itemCount = state.items.reduce((n, it) => n + it.quantity, 0)
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
          <Link href="/admin/dashboard" className="text-gray-300 hover:text-white">Login</Link>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white inline-flex items-center gap-2"
            onClick={() => dispatch({ type: "OPEN_CART" })}
          >
            <ShoppingCart className="w-4 h-4" />
            Cart{itemCount > 0 ? ` (${itemCount})` : ""}
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
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" className="text-gray-200" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
                onClick={() => {
                  setOpen(false)
                  dispatch({ type: "OPEN_CART" })
                }}
              >
                <span className="inline-flex items-center gap-2 justify-center">
                  <ShoppingCart className="w-4 h-4" />
                  Cart{itemCount > 0 ? ` (${itemCount})` : ""}
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
