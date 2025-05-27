import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cortez - Premium Sleep Solutions | Memory Foam Mattresses & Sleep Products",
  description:
    "Experience better sleep with Cortez premium mattresses, pillows, and sleep accessories. 7-layer latex technology, 100-night trial, 10-year warranty. Made in India with international quality standards.",
  keywords:
    "mattress, memory foam, sleep, pillows, mattress topper, sleep products, latex mattress, orthopaedic mattress, cooling gel, India",
  authors: [{ name: "Cortez by BRITEX" }],
  creator: "BRITEX",
  publisher: "Cortez",
  robots: "index, follow",
  openGraph: {
    title: "Cortez - Premium Sleep Solutions",
    description:
      "Experience better sleep with Cortez premium mattresses and sleep accessories. 7-layer latex technology with 100-night trial.",
    url: "https://cortez.com",
    siteName: "Cortez",
    images: [
      {
        url: "/images/hero-mattress.jpg",
        width: 1200,
        height: 630,
        alt: "Cortez Premium Mattress",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortez - Premium Sleep Solutions",
    description: "Experience better sleep with Cortez premium mattresses and sleep accessories.",
    images: ["/images/hero-mattress.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ea580c",
    generator: 'v0.dev'
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
        <meta name="theme-color" content="#ea580c" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
