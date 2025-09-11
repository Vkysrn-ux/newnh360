import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Clock,
  Shield,
  Truck,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  RefreshCw,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Refund Policy - NH360 FASTag | Service Refunds & Dispute Support",
  description:
    "Read NH360 FASTag refund and support policy for services like recharge assistance, KYC updates, blacklist removal, and tag replacement.",
  openGraph: {
    title: "Refund Policy - NH360 FASTag",
    description: "Refunds and dispute assistance for FASTag-related services.",
    images: ["/placeholder.jpg"],
  },
}

export default function ReturnPolicyPage() {
  const lastUpdated = "January 15, 2025"
  const contactInfo = {
    phone: "+91-9894517926",
    email: "karan@britexcbe.com",
    address: "54RC+F3, Kakapalayam, Paduvampalli, Tamil Nadu 641659",
  }

  const trialPeriod = {
    duration: "100 Nights",
    description: "Sleep on your mattress for 100 nights to ensure it's the perfect fit for you",
    features: [
      "Full 100-night trial period",
      "No questions asked returns",
      "Free pickup and return",
      "Full refund guarantee",
      "No restocking fees",
    ],
  }

  const returnProcess = [
    {
      step: 1,
      title: "Contact Customer Service",
      description: "Call or email us within 100 days of delivery",
      icon: <Phone className="h-6 w-6" />,
      details: "Reach out to our customer service team to initiate your return",
    },
    {
      step: 2,
      title: "Schedule Pickup",
      description: "We'll arrange free pickup within 3-5 business days",
      icon: <Truck className="h-6 w-6" />,
      details: "Our team will contact you to schedule a convenient pickup time",
    },
    {
      step: 3,
      title: "Product Inspection",
      description: "We'll inspect the product upon pickup",
      icon: <Package className="h-6 w-6" />,
      details: "Standard inspection to ensure product condition meets return criteria",
    },
    {
      step: 4,
      title: "Refund Processing",
      description: "Receive your refund within 7-10 business days",
      icon: <CreditCard className="h-6 w-6" />,
      details: "Refund will be processed to your original payment method",
    },
  ]

  const warrantyInfo = {
    duration: "15 Years",
    coverage: [
      "Manufacturing defects",
      "Sagging beyond normal wear",
      "Structural integrity issues",
      "Material quality problems",
      "Edge support failures",
    ],
    exclusions: [
      "Normal wear and tear",
      "Damage from improper use",
      "Stains or spills",
      "Damage from pets",
      "Unauthorized modifications",
    ],
  }

  const returnConditions = {
    eligible: [
      "Products in original condition",
      "Original packaging included",
      "No stains or damage",
      "Within 100 days of delivery",
      "All accessories included",
    ],
    notEligible: [
      "Products with stains or damage",
      "Missing original packaging",
      "Used beyond normal wear",
      "After 100-day trial period",
      "Custom or special order items",
    ],
  }

  const refundTimeline = [
    {
      stage: "Return Request",
      timeline: "Same day",
      description: "Contact customer service to initiate return",
    },
    {
      stage: "Pickup Scheduled",
      timeline: "3-5 business days",
      description: "Our team arranges pickup from your location",
    },
    {
      stage: "Product Inspection",
      timeline: "1-2 business days",
      description: "Quality check and condition assessment",
    },
    {
      stage: "Refund Processing",
      timeline: "7-10 business days",
      description: "Refund credited to original payment method",
    },
  ]

  const faq = [
    {
      question: "What is the 100-night trial period?",
      answer: "You have 100 nights to sleep on your mattress and decide if it's right for you. If you're not satisfied, you can return it for a full refund, no questions asked.",
    },
    {
      question: "Is there a return fee?",
      answer: "No return fees for trial returns within the 100-night period. We cover all pickup and return shipping costs.",
    },
    {
      question: "What if the mattress doesn't feel right?",
      answer: "We understand that finding the perfect mattress takes time. Our 100-night trial gives you plenty of time to adjust and decide if it's the right fit for you.",
    },
    {
      question: "How do I initiate a return?",
      answer: "Simply call us at +91-9894517926 or email karan@britexcbe.com within 100 days of delivery. Our customer service team will guide you through the process.",
    },
    {
      question: "What happens to the returned mattress?",
      answer: "Returned mattresses are donated to local charities or recycled responsibly, ensuring they don't go to waste while helping those in need.",
    },
    {
      question: "Can I return accessories and bedding?",
      answer: "Yes, pillows, toppers, protectors, and bedding can be returned within 30 days of purchase if unused and in original packaging.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-orange-600">NH360 FASTag</div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#buy" className="text-gray-700 hover:text-orange-600 transition-colors">Buy FASTag</Link>
            <Link href="/#recharge" className="text-gray-700 hover:text-orange-600 transition-colors">Recharge</Link>
            <Link href="/#services" className="text-gray-700 hover:text-orange-600 transition-colors">Services</Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</Link>
          </nav>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white"><Link href="/#buy">Buy FASTag</Link></Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Return Policy</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sleep with confidence knowing you have 100 nights to find your perfect mattress
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 100-Night Trial */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-600 to-orange-700 text-white">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl font-bold">{trialPeriod.duration}</div>
                    <div className="text-xl font-semibold">Trial Period</div>
                  </div>
                  <p className="text-orange-100 text-lg">{trialPeriod.description}</p>
                  <div className="space-y-3">
                    {trialPeriod.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-orange-200" />
                        <span className="text-orange-100">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-4">
                    <Clock className="h-12 w-12 text-white" />
                  </div>
                  <p className="text-orange-200 text-sm">
                    Take your time to ensure the perfect sleep experience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How Returns Work</h2>
            <p className="text-xl text-gray-600">Simple 4-step process for hassle-free returns</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnProcess.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                    {step.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Badge className="bg-orange-600 text-white">Step {step.step}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    <p className="text-gray-500 text-xs">{step.details}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">15-Year Warranty</h2>
                <p className="text-lg text-gray-600">
                  Our comprehensive warranty covers manufacturing defects and ensures your investment is protected.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">What's Covered</h3>
                <div className="space-y-2">
                  {warrantyInfo.coverage.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">What's Not Covered</h3>
                <div className="space-y-2">
                  {warrantyInfo.exclusions.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="border-0 shadow-lg bg-orange-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="h-8 w-8 text-orange-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Warranty Claims</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    For warranty claims, contact our customer service team. We'll assess the issue and provide
                    appropriate solutions including repair, replacement, or refund.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Return Conditions</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Eligible for Return</h3>
                <div className="space-y-2">
                  {returnConditions.eligible.map((condition, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Not Eligible for Return</h3>
              <div className="space-y-2">
                {returnConditions.notEligible.map((condition, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-gray-700">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Refund Timeline</h2>
            <p className="text-xl text-gray-600">What to expect during the return process</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundTimeline.map((stage, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{stage.stage}</h3>
                  <div className="text-2xl font-bold text-orange-600">{stage.timeline}</div>
                  <p className="text-gray-600 text-sm">{stage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about returns and warranty</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faq.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Need Help with Returns?</h2>
            <p className="text-lg text-gray-600">
              Our customer service team is here to help with any questions about returns, warranty, or refunds.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                <p className="text-gray-600">{contactInfo.phone}</p>
                <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 7 PM</p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                <p className="text-gray-600">{contactInfo.email}</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                <p className="text-gray-600">{contactInfo.address}</p>
                <p className="text-sm text-gray-500">Showroom available</p>
              </div>
            </div>
            <div className="pt-8">
              <Link href="/contact">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white h-12 px-8">
                  Contact Customer Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-orange-500">NH360 FASTag</div>
              </div>
              <p className="text-gray-400">FASTag Sales & Services Across India</p>
              <p className="text-gray-400">Buy FASTag, recharge, and get 24×7 support for all issuers.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Services</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/#buy" className="block hover:text-orange-500 transition-colors">Buy FASTag</Link>
                <Link href="/#recharge" className="block hover:text-orange-500 transition-colors">Recharge</Link>
                <Link href="/#services" className="block hover:text-orange-500 transition-colors">KYC Update</Link>
                <Link href="/#services" className="block hover:text-orange-500 transition-colors">Blacklist Removal</Link>
                <Link href="/#services" className="block hover:text-orange-500 transition-colors">Fleet Solutions</Link>
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
            <p>&copy; 2025 NH360 FASTag. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
