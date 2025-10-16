"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type MagicCardProps = React.HTMLAttributes<HTMLDivElement> & {
  glowColor?: string
}

/**
 * MagicCard – a lightweight clone inspired by MagicUI’s Magic Card.
 * - Gradient border with subtle animated glow on hover
 * - Pointer-follow radial highlight for delightful depth
 * - Dark-friendly by default; tweak via className/glowColor
 */
export function MagicCard({ className, children, glowColor = "rgba(251,146,60,0.45)", ...props }: MagicCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [pos, setPos] = React.useState<{ x: number; y: number }>({ x: -9999, y: -9999 })

  const updateFromEvent = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: clientX - rect.left, y: clientY - rect.top })
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => updateFromEvent(e.clientX, e.clientY)
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => updateFromEvent(e.clientX, e.clientY)
  const onLeave = () => setPos({ x: -9999, y: -9999 })

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      onPointerLeave={onLeave}
      className={cn(
        // Outer wrapper renders the gradient "border"
        "group relative overflow-hidden rounded-xl p-[1px]",
        className
      )}
      {...props}
    >
      {/* Border gradient (subtle by default; brighter on hover) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-30 transition-opacity duration-300 group-hover:opacity-60"
        style={{
          background:
            `conic-gradient(at 30% 20%, ${glowColor}, transparent 28%, transparent 72%, ${glowColor})`,
        }}
      />

      {/* Pointer-follow glow overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200"
        style={{
          opacity: pos.x === -9999 ? 0 : 1,
          background: `radial-gradient(220px 220px at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 60%)`,
          mixBlendMode: "screen" as any,
        }}
      />

      {/* Card body */}
      <div className="relative rounded-[calc(0.75rem-1px)] bg-neutral-900 p-6 ring-1 ring-inset ring-white/5">
        {children}
      </div>
    </div>
  )
}

