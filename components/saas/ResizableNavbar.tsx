"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"

type Item = { label: string; href: string }

export default function ResizableNavbar({
  items = [
    { label: "Home", href: "/" },
    { label: "Buy FASTag", href: "/buy" },
    { label: "Recharge FASTag", href: "/recharge" },
    { label: "Get Support", href: "/support" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
}: { items?: Item[] }) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 })
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // Derive active item from pathname
  const computedActive = useMemo(() => {
    const idx = items.findIndex((it) => pathname === it.href)
    return idx >= 0 ? idx : 0
  }, [items, pathname])

  useEffect(() => {
    setActiveIndex(computedActive)
  }, [computedActive])

  const moveTo = (index: number) => {
    const el = itemRefs.current[index]
    const container = containerRef.current
    if (!el || !container) return
    const elRect = el.getBoundingClientRect()
    const parentRect = container.getBoundingClientRect()
    const left = elRect.left - parentRect.left
    const width = elRect.width
    setIndicator({ left, width, opacity: 1 })
  }

  useEffect(() => {
    // Position under active on mount and on resize
    const handle = () => moveTo(activeIndex)
    handle()
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, items.length])

  return (
    <div
      ref={containerRef}
      className="relative hidden md:flex items-center gap-6 rounded-full border border-orange-900 bg-black/60 px-2 py-1"
      onMouseLeave={() => moveTo(activeIndex)}
    >
      {/* Indicator bar */}
      <div
        className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 transition-all duration-300"
        style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
      />
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          ref={(el) => (itemRefs.current[i] = el)}
          onMouseEnter={() => moveTo(i)}
          onFocus={() => moveTo(i)}
          onClick={() => setActiveIndex(i)}
          className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-white ${
            i === activeIndex ? "text-white" : "text-gray-300"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
