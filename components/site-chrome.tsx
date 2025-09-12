"use client"
import type React from "react"
import { usePathname } from "next/navigation"
import SaasHeader from "@/components/saas/Header"
import SaasFooter from "@/components/saas/Footer"
import { CartSidebar } from "@/components/cart-sidebar"

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <SaasHeader />
      <div className="h-16 md:h-20" />
      {children}
      <SaasFooter />
      <CartSidebar />
    </>
  )
}
