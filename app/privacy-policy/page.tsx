import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Users,
  Database,
  Cookie,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - NH360 FASTag | Data Protection & Privacy",
  description:
    "Learn how NH360 FASTag collects, uses, and protects your personal information. Read about your privacy rights and our data practices.",
  openGraph: {
    title: "Privacy Policy - NH360 FASTag",
    description: "Your privacy matters. Learn how we protect your information.",
    images: ["/placeholder.jpg"],
  },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025"
  const companyInfo = {
    name: "NH360 FASTag",
    address: "India (PAN‑India Service)",
    email: "support@nh360fastag.com",
    phone: "+91-0000000000",
  }

  const dataCategories = [
    {
      title: "Personal Information",
      icon: <Users className="h-6 w-6" />,
      description: "Name, email, phone number, shipping address",
      examples: ["Full name", "Email address", "Phone number", "Delivery address"],
    },
    {
      title: "Order Information",
      icon: <FileText className="h-6 w-6" />,
      description: "Purchase history, order details, payment information",
      examples: ["Order numbers", "Product preferences", "Payment method", "Delivery status"],
    },
    {
      title: "Technical Data",
      icon: <Database className="h-6 w-6" />,
      description: "Device information, browsing behavior, cookies",
      examples: ["IP address", "Browser type", "Pages visited", "Session duration"],
    },
    {
      title: "Communication Data",
      icon: <Mail className="h-6 w-6" />,
      description: "Customer service interactions, feedback",
      examples: ["Support tickets", "Product reviews", "Survey responses", "Chat transcripts"],
    },
  ]

  const dataUsage = [
    {
      purpose: "Order Processing",
      description: "To process and fulfill your orders, including payment processing and delivery coordination.",
      examples: ["Payment verification", "Shipping coordination", "Order tracking"],
    },
    {
      purpose: "Customer Support",
      description: "To provide personalized customer service and technical support.",
      examples: ["Issue resolution", "Product guidance", "Warranty claims"],
    },
    {
      purpose: "Product Improvement",
      description: "To analyze usage patterns and improve our products and services.",
      examples: ["Feature development", "Quality improvements", "User experience optimization"],
    },
    {
      purpose: "Marketing Communications",
      description: "To send relevant product updates, offers, and newsletters (with your consent).",
      examples: ["New product announcements", "Special offers", "Sleep tips and advice"],
    },
    {
      purpose: "Legal Compliance",
      description: "To comply with applicable laws, regulations, and legal processes.",
      examples: ["Tax reporting", "Regulatory requirements", "Legal proceedings"],
    },
  ]

  const userRights = [
    {
      right: "Access Your Data",
      description: "Request a copy of all personal information we hold about you.",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      right: "Correct Your Data",
      description: "Request correction of inaccurate or incomplete personal information.",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      right: "Delete Your Data",
      description: "Request deletion of your personal information (subject to legal requirements).",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      right: "Data Portability",
      description: "Request transfer of your data to another service provider.",
      icon: <Database className="h-5 w-5" />,
    },
    {
      right: "Withdraw Consent",
      description: "Withdraw consent for marketing communications at any time.",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      right: "Lodge Complaints",
      description: "File complaints with relevant data protection authorities.",
      icon: <Shield className="h-5 w-5" />,
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
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">About {companyInfo.name}</h2>
                  <p className="text-gray-600">
                    We are committed to protecting your privacy and ensuring the security of your personal information.
                    This policy explains how we collect, use, and safeguard your data.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-700">{companyInfo.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-700">{companyInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-700">{companyInfo.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Contact</h3>
                  <p className="text-gray-600">
                    If you have any questions about this privacy policy or our data practices, please contact us:
                  </p>
                  <Link href="/contact">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
            <p className="text-xl text-gray-600">We collect various types of information to provide you with better service</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                  <div className="space-y-1">
                    {category.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                        <span className="text-xs text-gray-600">{example}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Use Your Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
            <p className="text-xl text-gray-600">We use your information for specific, legitimate purposes</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {dataUsage.map((usage, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">{usage.purpose}</h3>
                  <p className="text-gray-600">{usage.description}</p>
                  <div className="space-y-2">
                    {usage.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>
              <p className="text-xl text-gray-600">We implement robust security measures to protect your information</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Encryption</h3>
                <p className="text-gray-600">
                  All data is encrypted using industry-standard SSL/TLS protocols during transmission and storage.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Access Control</h3>
                <p className="text-gray-600">
                  Strict access controls ensure only authorized personnel can access your personal information.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Secure Storage</h3>
                <p className="text-gray-600">
                  Your data is stored on secure servers with regular backups and monitoring systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Your Rights</h2>
            <p className="text-xl text-gray-600">You have certain rights regarding your personal information</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                    {right.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{right.right}</h3>
                  <p className="text-gray-600 text-sm">{right.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Cookies and Tracking</h2>
              <p className="text-xl text-gray-600">How we use cookies and tracking technologies</p>
            </div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                    <p className="text-gray-600">
                      These cookies are necessary for the website to function properly. They enable basic functions like
                      page navigation and access to secure areas.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                    <p className="text-gray-600">
                      We use analytics cookies to understand how visitors interact with our website, helping us improve
                      our services.
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-600">
                    You can control cookie settings through your browser preferences. However, disabling certain cookies
                    may affect website functionality.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Questions About Privacy?</h2>
            <p className="text-lg text-gray-600">
              If you have any questions about this privacy policy or our data practices, we're here to help.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                <p className="text-gray-600">{companyInfo.email}</p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                <p className="text-gray-600">{companyInfo.phone}</p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                <p className="text-gray-600">{companyInfo.address}</p>
              </div>
            </div>
            <div className="pt-8">
              <Link href="/contact">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white h-12 px-8">
                  Contact Privacy Team
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
