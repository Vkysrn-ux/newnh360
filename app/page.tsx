import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Cortez - Better Sleep, Better Life | Premium Memory Foam Mattresses",
  description:
    "Discover Cortez premium sleep solutions with 7-layer latex technology. Memory foam mattresses, luxury pillows, and sleep accessories. 100-night trial, 10-year warranty, free shipping across India.",
  openGraph: {
    title: "Cortez - Better Sleep, Better Life",
    description: "Premium memory foam mattresses with 7-layer latex technology. 100-night trial and 10-year warranty.",
    images: ["/images/hero-mattress.jpg"],
  },
}

export default function HomePage() {
  return <ClientPage />
}
