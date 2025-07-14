import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, User, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cortez Customer Reviews | 4.8/5 Stars | Real Sleep Experiences",
  description:
    "Read genuine customer reviews for Cortez mattresses and sleep products. 4.8/5 star rating with 3,000+ verified reviews. See why customers love our 7-layer latex technology.",
  openGraph: {
    title: "Cortez Customer Reviews - 4.8/5 Stars",
    description: "Read real customer experiences and reviews for Cortez premium sleep products.",
    images: ["/images/memory-foam-mattress.jpg"],
  },
}

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      date: "2024-01-15",
      product: "Cortez Premium Memory Foam Mattress",
      title: "Life-changing sleep experience!",
      content:
        "I've been struggling with back pain for years, and this mattress has completely transformed my sleep. The 7-layer latex construction provides perfect support, and I wake up pain-free every morning. The cooling gel technology works amazingly well in Mumbai's humid climate. Worth every penny!",
      verified: true,
      helpful: 24,
      images: 2,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, NCR",
      rating: 5,
      date: "2024-01-10",
      product: "Cortez Luxury Pillow Set",
      title: "Best pillows I've ever owned",
      content:
        "The ergonomic design is fantastic. My neck pain has completely disappeared since I started using these pillows. The bamboo fiber cover is incredibly soft and breathable. The 100-night trial gave me confidence to try them, and I'm so glad I did. Highly recommend to anyone with neck issues.",
      verified: true,
      helpful: 18,
      images: 1,
    },
    {
      id: 3,
      name: "Anita Patel",
      location: "Bangalore, Karnataka",
      rating: 5,
      date: "2024-01-08",
      product: "Cortez Ortho Spine Support Mattress",
      title: "Exceptional quality and customer service",
      content:
        "The mattress quality is top-notch. The orthopaedic support is exactly what I needed for my spine alignment issues. The delivery was prompt, and the customer service team was incredibly helpful throughout the process. The 10-year warranty gives me peace of mind about this investment.",
      verified: true,
      helpful: 31,
      images: 3,
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Pune, Maharashtra",
      rating: 4,
      date: "2024-01-05",
      product: "Cortez Mattress Topper",
      title: "Great addition to my existing mattress",
      content:
        "Added this topper to my old mattress and it feels like a completely new bed. The 3-inch memory foam provides excellent comfort and the cooling technology works well. Only reason for 4 stars is that it took a few days to expand fully, but overall very satisfied with the purchase.",
      verified: true,
      helpful: 15,
      images: 0,
    },
    {
      id: 5,
      name: "Meera Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      date: "2024-01-03",
      product: "Cortez Waterproof Protector",
      title: "Perfect protection for my investment",
      content:
        "This protector is amazing! It's completely waterproof yet breathable. I have kids and pets, so spill protection was essential. It doesn't change the feel of the mattress at all, and it's easy to wash. Great quality product that does exactly what it promises.",
      verified: true,
      helpful: 12,
      images: 1,
    },
    {
      id: 6,
      name: "Arjun Gupta",
      location: "Chennai, Tamil Nadu",
      rating: 5,
      date: "2023-12-28",
      product: "Cortez Premium Memory Foam Mattress",
      title: "Best sleep investment ever made",
      content:
        "After months of research, I chose Cortez and it exceeded all expectations. The motion isolation is perfect - my partner's movements don't disturb my sleep at all. The edge support is excellent, and the mattress maintains its shape perfectly. The Made in India quality is impressive!",
      verified: true,
      helpful: 27,
      images: 2,
    },
  ]

  const stats = [
    { label: "Average Rating", value: "4.8/5", icon: <Star className="h-6 w-6" /> },
    { label: "Total Reviews", value: "3,247", icon: <User className="h-6 w-6" /> },
    { label: "Verified Purchases", value: "98%", icon: <Badge className="h-6 w-6" /> },
    { label: "Recommend Rate", value: "96%", icon: <ThumbsUp className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-orange-600">Cortez</div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-orange-600 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link href="/reviews" className="text-orange-600 font-medium">
              Reviews
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">Contact Us</Button>
        </div>
      </header>

      {/* Reviews Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Customer Reviews</h1>
            <p className="text-xl text-gray-600">Real experiences from real customers</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {reviews.map((review) => (
              <Card key={review.id} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                          {review.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Verified Purchase</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                          </span>
                          <span>{review.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Product */}
                    <div className="text-sm text-orange-600 font-medium">Product: {review.product}</div>

                    {/* Review Content */}
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-gray-900">{review.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{review.content}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {review.images > 0 && (
                          <span>
                            {review.images} photo{review.images > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              Load More Reviews
            </Button>
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
                <Link href="/shop?category=mattresses" className="block hover:text-orange-500 transition-colors">
                  Mattresses
                </Link>
                <Link href="/shop?category=pillows" className="block hover:text-orange-500 transition-colors">
                  Pillows
                </Link>
                <Link href="/shop?category=toppers" className="block hover:text-orange-500 transition-colors">
                  Toppers
                </Link>
                <Link href="/shop?category=protectors" className="block hover:text-orange-500 transition-colors">
                  Protectors
                </Link>
                <Link href="/shop?category=accessories" className="block hover:text-orange-500 transition-colors">
                  Accessories
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/about" className="block hover:text-orange-500 transition-colors">
                  About Us
                </Link>
                <Link href="/faq" className="block hover:text-orange-500 transition-colors">
                  FAQ
                </Link>
                <Link href="/contact" className="block hover:text-orange-500 transition-colors">
                  Contact
                </Link>
                <Link href="/privacy-policy" className="block hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/return-policy" className="block hover:text-orange-500 transition-colors">
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
