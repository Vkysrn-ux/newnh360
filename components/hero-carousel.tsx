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
      badge: "A BRITEX Sleep Solution",
      title: "Better Sleep,",
      subtitle: "Better Life",
      description:
        "Experience the perfect blend of comfort, support, and technology with Cortez mattresses. Designed for the modern Indian home, crafted for your best sleep.",
      primaryButton: {
        text: "Shop Now",
        action: "shop",
        href: "/shop",
      },
      secondaryButton: {
        text: "Explore Cortez Collection",
        href: "/shop",
      },
      rating: 4.8,
      reviews: "3,000+ reviews",
      additionalInfo: "Free shipping across India",
      startingPrice: "₹24,999",
      image: "/images/hero-interior-room.jpg",
      imageAlt: "Modern bedroom with Cortez mattress",
    },
    {
      id: 2,
      badge: "Premium Natural Latex",
      title: "7-Zone Comfort",
      subtitle: "Technology",
      description:
        "Revolutionary 7-layer natural latex construction imported from Thailand. Each zone provides targeted support for optimal spine alignment and pressure relief.",
      primaryButton: {
        text: "View Product",
        action: "product",
      },
      secondaryButton: {
        text: "Learn More",
        href: "/about",
      },
      rating: 4.9,
      reviews: "1,200+ reviews",
      additionalInfo: "15-year warranty included",
      startingPrice: "₹43,500",
      image: "/images/memory-foam-mattress.jpg",
      imageAlt: "Natural latex mattress with 7-zone technology",
      product: {
        id: 1,
        name: "Natural Latex Mattress 78x72x6",
        price: 46000,
        originalPrice: 55000,
        image: "/images/memory-foam-mattress.jpg",
        description:
          "Revolutionary 7-layer natural latex construction imported from Thailand with superior comfort and support",
        rating: 4.9,
        reviews: 1247,
        category: "mattresses",
        size: "78x72x6 inches",
        features: [
          "100% Natural Latex",
          "7-Zone Support",
          "Anti-Allergic",
          "Breathable",
          "Temperature Regulation",
          "Edge Support",
        ],
        warranty: "15 Years",
        specifications: {
          material: "100% Natural Latex from Thailand",
          thickness: "6 inches with 7-layer construction",
          firmness: "Medium-firm with zoned support",
          care: "Spot clean with mild detergent",
        },
      },
    },
    {
      id: 3,
      badge: "Baby Safe Materials",
      title: "Safe Sleep for",
      subtitle: "Little Ones",
      description:
        "Specially designed baby beds with hypoallergenic materials and gentle support. Certified safe for infants with non-toxic, breathable construction.",
      primaryButton: {
        text: "View Product",
        action: "product",
      },
      secondaryButton: {
        text: "Safety Features",
        href: "/about",
      },
      rating: 4.8,
      reviews: "340+ reviews",
      additionalInfo: "Pediatrician recommended",
      startingPrice: "₹6,999",
      image: "/images/baby-bed.jpg",
      imageAlt: "Safe and comfortable baby bed",
      product: {
        id: 16,
        name: "Baby Bed",
        price: 6999,
        originalPrice: 9499,
        image: "/images/baby-bed.jpg",
        description: "Safe and comfortable bed designed specifically for babies with hypoallergenic materials",
        rating: 4.8,
        reviews: 345,
        category: "mattresses",
        size: "48x24x4 inches",
        features: ["Baby Safe Materials", "Hypoallergenic", "Soft Support", "Non-toxic", "Breathable", "Easy Clean"],
        warranty: "3 Years",
        specifications: {
          material: "Certified baby-safe foam and fabrics",
          thickness: "4 inches with gentle support",
          firmness: "Soft yet supportive for infants",
          care: "Machine washable cover",
        },
      },
    },
    {
      id: 4,
      badge: "Space-Saving Solutions",
      title: "Hostel & Compact",
      subtitle: "Living",
      description:
        "Innovative foldable beds and compact mattresses perfect for hostels, PG accommodations, and small spaces. Durable, portable, and easy to store.",
      primaryButton: {
        text: "View Product",
        action: "product",
      },
      secondaryButton: {
        text: "Bulk Orders",
        href: "/contact",
      },
      rating: 4.5,
      reviews: "180+ reviews",
      additionalInfo: "Bulk pricing available",
      startingPrice: "₹8,999",
      image: "/images/hostel-bed.jpg",
      imageAlt: "Foldable hostel bed for compact living",
      product: {
        id: 14,
        name: "Hostel Bed Foldable 72x36x2",
        price: 8999,
        originalPrice: 11999,
        image: "/images/hostel-bed.jpg",
        description: "Compact foldable bed perfect for hostels and small spaces with durable construction",
        rating: 4.4,
        reviews: 189,
        category: "mattresses",
        size: "72x36x2 inches",
        features: ["Foldable Design", "Space Saving", "Portable", "Durable", "Easy Storage", "Quick Setup"],
        warranty: "5 Years",
        specifications: {
          material: "High-density foam with fabric cover",
          thickness: "2 inches when unfolded",
          firmness: "Medium support for daily use",
          care: "Removable washable cover",
        },
      },
    },
  ]

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
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
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 lg:py-24 relative overflow-hidden">
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
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 text-sm font-medium px-4 py-2">
                    {currentSlideData.badge}
                  </Badge>

                  <div className="space-y-2">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      {currentSlideData.title}
                      <br />
                      <span className="text-orange-600">{currentSlideData.subtitle}</span>
                    </h1>
                  </div>

                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">{currentSlideData.description}</p>
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
                      <span className="font-bold text-gray-900 text-base">{currentSlideData.rating}/5</span>
                    </div>
                    <span className="text-gray-600">({currentSlideData.reviews})</span>
                  </div>
                  <div className="text-gray-600 font-medium">{currentSlideData.additionalInfo}</div>
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
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                  <div className="text-sm text-gray-600 font-medium">Starting from</div>
                  <div className="text-3xl font-bold text-orange-600">{currentSlideData.startingPrice}</div>
                </div>
              </div>
            </div>
          </div>
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
