"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Truck,
  Shield,
  Clock,
  MapPin,
  Award,
  Leaf,
  Baby,
  Building2,
  Hotel,
  PillIcon as Pillow,
  ShoppingBag,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductCarousel } from "@/components/product-carousel"
import { HeroCarousel } from "@/components/hero-carousel"
import { useCart } from "@/components/cart-context"

// Add this component before the main HomePage component:
function CartIcon() {
  const { state, dispatch } = useCart()
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={() => dispatch({ type: "TOGGLE_CART" })}>
      <ShoppingBag className="h-6 w-6" />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </Badge>
      )}
    </Button>
  )
}

export default function ClientPage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Natural Latex Mattress 78x72x6",
      price: "₹46,000",
      originalPrice: "₹55,000",
      image: "/images/memory-foam-mattress.jpg",
      description: "7-zone comfort latex imported from Thailand with 15-year warranty",
      rating: 4.9,
      reviews: 1247,
      category: "mattresses",
      features: ["100% Natural Latex", "7-Zone Support", "15 Year Warranty"],
    },
    {
      id: 2,
      name: "Cervical Latex Shredded Pillow",
      price: "₹1,950",
      originalPrice: "₹2,500",
      image: "/images/cervical-pillow.jpg",
      description: "Ergonomic cervical support with shredded latex filling",
      rating: 4.8,
      reviews: 723,
      category: "pillows",
      features: ["Cervical Support", "Shredded Latex", "Breathable"],
    },
    {
      id: 3,
      name: "Natural Latex Topper 78x72x2",
      price: "₹19,500",
      originalPrice: "₹24,000",
      image: "/images/mattress-topper.jpg",
      description: "2-inch natural latex topper for enhanced comfort",
      rating: 4.7,
      reviews: 456,
      category: "toppers",
      features: ["100% Natural Latex", "Pressure Relief", "10 Year Warranty"],
    },
    {
      id: 4,
      name: "Waterproof Mattress Protector",
      price: "₹2,499",
      originalPrice: "₹3,299",
      image: "/images/mattress-protector.jpg",
      description: "100% waterproof protection with breathable fabric",
      rating: 4.9,
      reviews: 1156,
      category: "protectors",
      features: ["100% Waterproof", "Breathable", "Machine Washable"],
    },
    {
      id: 5,
      name: "Charcoal Pillows",
      price: "₹1,950",
      originalPrice: "₹2,400",
      image: "/images/charcoal-pillow.jpg",
      description: "Activated charcoal infused pillows for odor control",
      rating: 4.6,
      reviews: 543,
      category: "pillows",
      features: ["Charcoal Infused", "Odor Control", "Anti-Bacterial"],
    },
    {
      id: 6,
      name: "Baby Bed",
      price: "₹6,999",
      originalPrice: "₹9,499",
      image: "/images/baby-bed.jpg",
      description: "Safe and comfortable bed designed specifically for babies",
      rating: 4.8,
      reviews: 345,
      category: "mattresses",
      features: ["Baby Safe", "Hypoallergenic", "Soft Support"],
    },
  ]

  const specializations = [
    {
      icon: <Hotel className="h-8 w-8" />,
      title: "Hotel & Hospitality",
      description: "Premium linens and mattresses for hotels and resorts",
      products: ["Hotel Linens", "Commercial Mattresses", "Bulk Orders"],
      image: "/images/hotel-linens.jpg",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Hostel Solutions",
      description: "Space-saving foldable beds perfect for hostels",
      products: ["Foldable Beds", "Compact Mattresses", "Durable Design"],
      image: "/images/hostel-bed.jpg",
    },
    {
      icon: <Baby className="h-8 w-8" />,
      title: "Baby & Kids",
      description: "Safe and comfortable sleep solutions for children",
      products: ["Baby Beds", "Kids Mattresses", "Hypoallergenic Materials"],
      image: "/images/baby-bed.jpg",
    },
    {
      icon: <Pillow className="h-8 w-8" />,
      title: "Therapeutic Pillows",
      description: "Specialized pillows for neck and spine support",
      products: ["Cervical Pillows", "Charcoal Pillows", "Memory Foam"],
      image: "/images/cervical-pillow.jpg",
    },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Best investment for my sleep! The Cortez mattress has completely transformed my nights. No more back pain and I wake up refreshed every morning.",
      verified: true,
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "Amazing quality and comfort. The 100-night trial gave me confidence to try it, and I'm so glad I did. Highly recommend Cortez!",
      verified: true,
    },
    {
      name: "Anita Patel",
      location: "Bangalore",
      rating: 5,
      text: "The customer service is exceptional and the mattress quality is top-notch. Worth every penny for the comfort it provides.",
      verified: true,
    },
  ]

  const usp = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "100-Night Trial",
      description: "Try risk-free for 100 nights",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "15-Year Warranty",
      description: "Comprehensive warranty coverage",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description: "Free delivery across India",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Made in India",
      description: "Proudly manufactured in India",
    },
  ]

  const certifications = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "ECO INSTITUT Certified",
      description: "Environmental safety and sustainability standards",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "SGS Certified",
      description: "International quality and safety verification",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "GOLS Certified",
      description: "Global Organic Latex Standard certification",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-orange-600">Cortez</div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-orange-600 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-orange-600 transition-colors">
              Reviews
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <CartIcon />
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Shop Now</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroCarousel />

      {/* Certifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Certified Quality You Can Trust</h2>
            <p className="text-xl text-gray-600">International certifications ensuring premium quality and safety</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full">
                  {cert.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {usp.map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={featuredProducts}
            title="Featured Products"
            subtitle="Discover our most loved sleep solutions"
          />
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Specializations</h2>
            <p className="text-xl text-gray-600">Tailored sleep solutions for every need</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializations.map((spec, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={spec.image || "/placeholder.svg"}
                      alt={spec.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                        {spec.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{spec.title}</h3>
                    </div>
                    <p className="text-gray-600">{spec.description}</p>
                    <div className="space-y-2">
                      {spec.products.map((product, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{product}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cortez Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose Cortez?</h2>
            <p className="text-xl text-orange-100">The difference that makes all the difference</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-orange-100">Certified materials and rigorous quality testing ensure lasting comfort</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Superior Comfort</h3>
              <p className="text-orange-100">Advanced memory foam technology adapts to your body for perfect support</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Innovative Technology</h3>
              <p className="text-orange-100">Cooling gel infusion and breathable design for temperature regulation</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Exceptional Service</h3>
              <p className="text-orange-100">Dedicated customer support and hassle-free delivery experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                    {testimonial.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-orange-500">Cortez</div>
              </div>
              <p className="text-gray-400">A BRITEX Sleep Solution</p>
              <p className="text-gray-400">
                Experience better sleep with our premium mattresses and sleep accessories.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Shop</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Mattresses
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Pillows
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Toppers
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Protectors
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Bedding
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  About Us
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  FAQ
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Contact
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Warranty
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Return Policy
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Connect</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Facebook
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Instagram
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  Twitter
                </Link>
                <Link href="#" className="block hover:text-orange-500 transition-colors">
                  YouTube
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Cortez by BRITEX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
