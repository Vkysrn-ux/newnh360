import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import SaasHeader from "@/components/saas/Header"
import SaasFooter from "@/components/saas/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NH360fastag.com - FASTag Sales & Services Across India",
  description:
    "NH360fastag.com offers FASTag sales, recharge, and support services across India. Get your FASTag quickly, enjoy seamless toll payments, and access expert customer support for all your FASTag needs.",
  keywords:
    "FASTag, toll payment, FASTag recharge, FASTag sales, FASTag support, highway toll, India, NH360fastag",
  authors: [{ name: "NH360fastag.com Team" }],
  creator: "NH360fastag.com",
  publisher: "NH360fastag.com",
  robots: "index, follow",
  openGraph: {
    title: "NH360fastag.com - FASTag Sales & Services",
    description:
      "Buy FASTag, recharge online, and get support for FASTag services across India. NH360fastag.com makes toll payments easy and hassle-free.",
    url: "https://nh360fastag.com",
    siteName: "NH360fastag.com",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "NH360fastag FASTag Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NH360fastag.com - FASTag Sales & Services",
    description: "Buy FASTag, recharge, and get support across India with NH360fastag.com.",
    images: ["/images/fastag-banner.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#FF7A00",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="/saasland/index.css" />
        <meta name="theme-color" content="#FF7A00" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <SaasHeader />
          {/* Spacer for fixed header */}
          <div className="h-16 md:h-20" />
          {children}
          <SaasFooter />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
