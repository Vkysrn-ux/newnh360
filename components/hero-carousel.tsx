"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductModal } from "./product-modal"

interface HeroSlide {
  id: number
  badge: string
  title: string
  subtitle: string
  description: string
  primaryButton: {
    text: string
    action: "shop" | "product"
    href?: string
  }
  secondaryButton: {
    text: string
    href: string
  }
  rating: number
  reviews: string
  additionalInfo: string
  startingPrice: string
  image: string
  imageAlt: string
  product?: {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    description: string
    rating: number
    reviews: number
    category: string
    size: string
    features: string[]
    warranty: string
    specifications: {
      material: string
      thickness: string
      firmness: string
      care: string
    }
  }
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const slides: HeroSlide[] = [
    {
      id: 1,
      badge: "NH360 FASTag",
      title: "Buy FASTag,",
      subtitle: "Online in Minutes",
      description:
        "FASTag sales and activation across India. Doorstep KYC help, same‑day activation, and expert support for individuals and fleets.",
      primaryButton: {
        text: "Buy FASTag",
        action: "shop",
        href: "#buy",
      },
      secondaryButton: {
        text: "Recharge FASTag",
        href: "#recharge",
      },
      rating: 4.8,
      reviews: "5,000+ tags issued",
      additionalInfo: "PAN‑India assistance",
      startingPrice: "₹499",
      image: "/placeholder.jpg",
      imageAlt: "FASTag purchase and activation",
    },
    {
      id: 2,
      badge: "Instant Recharge",
      title: "FASTag Recharge",
      subtitle: "Assistance",
      description:
        "Top up any bank’s FASTag quickly. Get help fixing failed recharges, reversals, and wallet issues.",
      primaryButton: {
        text: "Recharge Now",
        action: "shop",
        href: "#recharge",
      },
      secondaryButton: {
        text: "See Services",
        href: "#services",
      },
      rating: 4.9,
      reviews: "10,000+ recharges",
      additionalInfo: "Support for all issuers",
      startingPrice: "From ₹100",
      image: "/placeholder.jpg",
      imageAlt: "FASTag recharge support",
    },
    {
      id: 3,
      badge: "Fleet Solutions",
      title: "Corporate & Fleet",
      subtitle: "FASTag",
      description:
        "Bulk issuance, centralized recharge, usage reports, and dispute handling tailored for logistics and transport fleets.",
      primaryButton: {
        text: "Talk to Expert",
        action: "shop",
        href: "/contact",
      },
      secondaryButton: {
        text: "Explore Fleet",
        href: "#services",
      },
      rating: 4.7,
      reviews: "900+ fleets served",
      additionalInfo: "Dedicated account support",
      startingPrice: "Custom",
      image: "/placeholder.jpg",
      imageAlt: "Fleet FASTag solutions",
    },
    {
      id: 4,
      badge: "24×7 Support",
      title: "KYC, Blacklist",
      subtitle: "& Disputes",
      description:
        "End‑to‑end help for KYC updates, blacklist removal, tag replacement, and toll dispute resolution.",
      primaryButton: {
        text: "Get Support",
        action: "shop",
        href: "#services",
      },
      secondaryButton: {
        text: "Contact Us",
        href: "/contact",
      },
      rating: 4.6,
      reviews: "3,500+ resolved",
      additionalInfo: "All India coverage",
      startingPrice: "—",
      image: "/placeholder.jpg",
      imageAlt: "FASTag support and services",
    },
  ]

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  const currentSlideData = slides[currentSlide]

  const handlePrimaryButtonClick = () => {
    if (currentSlideData.primaryButton.action === "product" && currentSlideData.product) {
      setSelectedProduct(currentSlideData.product)
      setIsProductModalOpen(true)
    }
  }

  return (
    <>
      <section className="bg-gradient-to-br from-black to-neutral-950 py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Text Content */}
            <div className="space-y-8 relative">
              <div
                className={`space-y-6 transition-all duration-500 ease-in-out ${
                  isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
                }`}
              >
                <div className="space-y-4">
                  <Badge className="bg-orange-500/20 text-orange-300 hover:bg-orange-500/25 text-sm font-medium px-4 py-2">
                    {currentSlideData.badge}
                  </Badge>

                  <div className="space-y-2">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                      {currentSlideData.title}
                      <br />
                      <span className="text-orange-600">{currentSlideData.subtitle}</span>
                    </h1>
                  </div>

                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">{currentSlideData.description}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {currentSlideData.primaryButton.action === "shop" ? (
                    <Link href={currentSlideData.primaryButton.href!}>
                      <Button
                        size="lg"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold w-full sm:w-auto transition-all duration-300 hover:shadow-lg"
                      >
                        {currentSlideData.primaryButton.text}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold w-full sm:w-auto transition-all duration-300 hover:shadow-lg"
                      onClick={handlePrimaryButtonClick}
                    >
                      {currentSlideData.primaryButton.text}
                    </Button>
                  )}
                  <Link href={currentSlideData.secondaryButton.href}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto transition-all duration-300"
                    >
                      {currentSlideData.secondaryButton.text}
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
                      <span className="font-bold text-white text-base">{currentSlideData.rating}/5</span>
                    </div>
                    <span className="text-gray-400">({currentSlideData.reviews})</span>
                  </div>
                  <div className="text-gray-400 font-medium">{currentSlideData.additionalInfo}</div>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative">
              <div
                className={`relative transition-all duration-500 ease-in-out ${
                  isTransitioning ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
                }`}
              >
                <Image
                  src={currentSlideData.image || "/placeholder.svg"}
                  alt={currentSlideData.imageAlt}
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  priority
                />

                {/* Price Badge */}
                <div className="absolute -bottom-6 -left-6 bg-black p-6 rounded-xl shadow-xl border border-orange-900">
                  <div className="text-sm text-gray-300 font-medium">Starting from</div>
                  <div className="text-3xl font-bold text-orange-500">{currentSlideData.startingPrice}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
          <button
            aria-label="Previous slide"
            onClick={prevSlide}
            className="pointer-events-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow border border-gray-200"
          >
            <span className="sr-only">Previous</span>
            {/* left chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M15.53 4.47a.75.75 0 0 1 0 1.06L9.06 12l6.47 6.47a.75.75 0 1 1-1.06 1.06l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={nextSlide}
            className="pointer-events-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow border border-gray-200"
          >
            <span className="sr-only">Next</span>
            {/* right chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.47 19.53a.75.75 0 0 1 0-1.06L14.94 12 8.47 5.53a.75.75 0 0 1 1.06-1.06l7 7a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${idx === currentSlide ? "w-6 bg-orange-600" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </>
  )
}

