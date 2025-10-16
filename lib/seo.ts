import type { Metadata } from "next"

type BuildOptions = {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
  keywords?: string[] | string
}

/**
 * Helper to build page-level Metadata with sane defaults.
 * Usage in a page file:
 *   export const metadata = buildMetadata({ title: "About", path: "/about" })
 */
export function buildMetadata(opts: BuildOptions = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nh360fastag.com"
  const url = new URL(opts.path || "/", baseUrl).toString()
  const titleDefault = "NH360 FASTag | FASTag Sales & Support Across India"
  const title = opts.title ? `${opts.title} | NH360 FASTag` : titleDefault
  const description =
    opts.description ||
    "NH360fastag.com offers FASTag sales, recharge, and support services across India. Get your FASTag quickly, enjoy seamless toll payments, and access expert customer support for all your FASTag needs."
  const image = opts.image || "/placeholder.jpg"

  const robots = opts.noIndex
    ? { index: false, follow: false }
    : { index: true, follow: true }

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    robots,
    openGraph: {
      title,
      description,
      url,
      siteName: "NH360fastag.com",
      images: [
        {
          url: image,
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
      title,
      description,
      images: [image],
    },
  }
}

