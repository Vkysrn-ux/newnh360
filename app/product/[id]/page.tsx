"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Truck, Award, Plus, Minus, ArrowLeft, Heart, CheckCircle, Leaf } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-context"
import { ProductCarousel } from "@/components/product-carousel"

interface Product {
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
    dimensions: string
    weight: string
  }
  detailedDescription: string
  benefits: string[]
  inStock: boolean
  technology: string[]
  certifications: string[]
  suitableFor: string[]
  careInstructions: string[]
  whyChoose: string[]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState("description")
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const { dispatch } = useCart()

  // Enhanced product data with comprehensive details
  const allProducts = [
    {
      id: 1,
      name: "Natural Latex Mattress 78x72x6",
      price: 46000,
      originalPrice: 55000,
      image: "/images/memory-foam-mattress.jpg",
      description: "7-zone comfort latex imported from Thailand with 15-year warranty",
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
        care: "Spot clean with mild detergent, air dry",
        dimensions: "78 x 72 x 6 inches (King Size)",
        weight: "45 kg approximately",
      },
      detailedDescription:
        "Experience the ultimate in sleep comfort with our premium Natural Latex Mattress. Crafted from 100% natural latex imported directly from Thailand's finest rubber plantations, this mattress represents the pinnacle of sleep technology and comfort. Our revolutionary 7-zone construction provides targeted support for different areas of your body, ensuring optimal spinal alignment and pressure relief throughout the night. The natural latex material offers exceptional durability, breathability, and temperature regulation, keeping you cool and comfortable in India's diverse climate conditions. Each mattress undergoes rigorous quality testing and comes with comprehensive certifications ensuring you receive a product that meets international standards while being perfectly suited for Indian homes and preferences. The advanced manufacturing process combines traditional craftsmanship with modern technology to create a sleep surface that adapts to your body's unique contours while maintaining consistent support. This mattress is designed to last for decades, making it not just a purchase but an investment in your long-term health and well-being.",
      benefits: [
        "Superior spinal alignment with 7-zone support technology that targets different body areas",
        "Natural temperature regulation for cool, comfortable sleep in all seasons",
        "Hypoallergenic and dust mite resistant properties for sensitive sleepers",
        "Eco-friendly and sustainable materials sourced responsibly from certified plantations",
        "Long-lasting durability with 15-year comprehensive warranty coverage",
        "Motion isolation technology for undisturbed partner sleep throughout the night",
        "Edge support system for maximum sleeping surface and easy entry/exit",
        "Breathable design prevents heat buildup and moisture retention for optimal comfort",
      ],
      technology: [
        "7-Zone Latex Construction: Different firmness zones for head, shoulders, waist, hips, and legs providing targeted support",
        "Natural Latex Processing: Dunlop method for consistent density and superior support characteristics",
        "Breathable Cell Structure: Open-cell design for optimal airflow and temperature regulation",
        "Edge Support Technology: Reinforced perimeter for edge-to-edge support and durability",
        "Anti-Microbial Treatment: Natural resistance to bacteria, fungi, and allergens",
        "Temperature Regulation: Natural latex properties maintain optimal sleep temperature year-round",
      ],
      certifications: [
        "ECO INSTITUT Certified - Environmental safety and sustainability standards",
        "SGS Certified - International quality verification and testing standards",
        "GOLS Certified - Global Organic Latex Standard for organic integrity",
        "OEKO-TEX Standard 100 - Textile safety certification for human health",
        "CertiPUR-US - Foam safety and environmental responsibility standards",
      ],
      suitableFor: [
        "Back and side sleepers seeking medium-firm support with pressure relief",
        "Couples needing motion isolation and undisturbed sleep",
        "Hot sleepers requiring superior temperature regulation and breathability",
        "People with allergies or respiratory sensitivities needing hypoallergenic materials",
        "Those seeking eco-friendly and sustainable sleep solutions",
        "Individuals with back pain or joint issues requiring proper spinal alignment",
      ],
      careInstructions: [
        "Rotate mattress 180 degrees every 3 months for even wear and extended lifespan",
        "Use a breathable mattress protector to prevent stains while maintaining airflow",
        "Spot clean spills immediately with mild detergent and water, avoid soaking",
        "Allow mattress to air dry completely before making bed to prevent moisture buildup",
        "Vacuum surface monthly to remove dust, allergens, and maintain hygiene",
        "Avoid jumping or standing on the mattress to prevent structural damage",
        "Keep away from direct sunlight and heat sources to preserve latex integrity",
      ],
      whyChoose: [
        "Premium Quality: Made from the finest natural latex imported from Thailand's best plantations",
        "Advanced Technology: Revolutionary 7-zone construction for targeted body support and comfort",
        "Health Benefits: Hypoallergenic, anti-microbial, and dust mite resistant for healthier sleep",
        "Exceptional Durability: 15-year warranty backed by rigorous quality testing and certification",
        "Superior Comfort: Perfect balance of support and pressure relief for all sleep positions",
        "Eco-Friendly Choice: Sustainable materials and responsible manufacturing processes",
        "Climate Optimized: Specially designed for India's diverse weather conditions and humidity",
        "Certified Excellence: Multiple international certifications for safety, quality, and environmental standards",
      ],
      inStock: true,
    },
    {
      id: 2,
      name: "Cervical Latex Shredded Pillow",
      price: 1950,
      originalPrice: 2500,
      image: "/images/cervical-pillow.jpg",
      description: "Ergonomic cervical support with shredded latex filling",
      rating: 4.8,
      reviews: 723,
      category: "pillows",
      size: "27.5x15x5 inches",
      features: [
        "Cervical Support",
        "Shredded Latex",
        "Breathable Cover",
        "Adjustable Height",
        "Anti-Allergic",
        "Machine Washable",
      ],
      warranty: "5 Years",
      specifications: {
        material: "Shredded natural latex with bamboo fiber cover",
        thickness: "5 inches adjustable height",
        firmness: "Medium support with customizable feel",
        care: "Machine washable cover, spot clean filling",
        dimensions: "27.5 x 15 x 5 inches (Standard Size)",
        weight: "1.2 kg approximately",
      },
      detailedDescription:
        "Designed specifically for cervical support and neck pain relief, this ergonomic pillow features premium shredded natural latex filling that conforms perfectly to your neck's natural curve. The innovative shredded latex construction allows for superior airflow while maintaining the supportive properties of natural latex. The adjustable height design lets you customize the support level by adding or removing filling, making it perfect for all sleep positions. The luxurious bamboo fiber cover is naturally antibacterial, moisture-wicking, and incredibly soft against your skin. This pillow is ideal for those suffering from neck pain, cervical issues, or anyone seeking the perfect balance of support and comfort for restorative sleep. The ergonomic contour design follows the natural curvature of your neck and shoulders, providing targeted support where you need it most. Whether you're a side sleeper, back sleeper, or combination sleeper, this pillow adapts to your preferred sleeping position while maintaining proper cervical alignment throughout the night.",
      benefits: [
        "Reduces neck pain and morning stiffness effectively through proper cervical alignment",
        "Maintains proper cervical spine alignment during sleep for long-term neck health",
        "Adjustable height for personalized comfort preferences and different sleep positions",
        "Breathable design prevents overheating and night sweats for comfortable sleep",
        "Hypoallergenic properties ideal for sensitive sleepers and allergy sufferers",
        "Durable construction with 5-year warranty coverage for long-lasting performance",
        "Natural latex provides consistent support without flattening or losing shape",
        "Bamboo cover offers natural antimicrobial protection and moisture management",
      ],
      technology: [
        "Shredded Latex Technology: Maintains support while allowing superior airflow and breathability",
        "Ergonomic Contour Design: Follows natural neck curvature for optimal cervical support",
        "Adjustable Fill System: Customize height and firmness by adding or removing latex",
        "Bamboo Fiber Cover: Natural moisture-wicking and antibacterial properties",
        "Ventilation Channels: Enhanced airflow design for temperature regulation",
        "Memory Support: Returns to original shape after use while conforming to your neck",
      ],
      certifications: [
        "GOLS Certified - Global Organic Latex Standard for organic latex integrity",
        "OEKO-TEX Standard 100 - Safe textile certification for human health",
        "CertiPUR-US - Foam safety standards and environmental responsibility",
        "Bamboo Certification - Sustainable bamboo sourcing and processing",
      ],
      suitableFor: [
        "Side sleepers needing proper neck support and spinal alignment",
        "Back sleepers with cervical issues requiring targeted neck support",
        "People with chronic neck pain seeking therapeutic sleep solutions",
        "Hot sleepers requiring breathable and temperature-regulating pillows",
        "Allergy sufferers needing hypoallergenic and antimicrobial materials",
        "Those seeking adjustable comfort levels and customizable support",
      ],
      careInstructions: [
        "Remove and machine wash bamboo cover weekly in cold water on gentle cycle",
        "Air dry cover completely before reassembling to prevent moisture buildup",
        "Fluff shredded latex filling monthly for optimal loft and support maintenance",
        "Spot clean latex filling if necessary with mild soap and water only",
        "Allow pillow to air in indirect sunlight occasionally for freshness",
        "Replace pillow every 3-5 years for optimal support and hygiene",
        "Store in breathable pillow protector when not in use to maintain cleanliness",
      ],
      whyChoose: [
        "Cervical Support: Specifically designed for neck pain relief and proper spinal alignment",
        "Natural Materials: 100% natural latex and sustainable bamboo fiber construction",
        "Customizable Comfort: Adjustable height and firmness for personalized sleep experience",
        "Breathable Design: Superior airflow prevents overheating and promotes comfortable sleep",
        "Hypoallergenic Safety: Safe for sensitive sleepers and allergy sufferers",
        "Durable Quality: 5-year warranty with premium construction and materials",
        "Easy Maintenance: Machine washable cover for convenient and hygienic care",
        "Therapeutic Benefits: Recommended by sleep specialists and healthcare professionals",
      ],
      inStock: true,
    },
    {
      id: 5,
      name: "Natural Latex Standard Pillows",
      price: 1850,
      originalPrice: 2300,
      image: "/images/luxury-pillows.jpg",
      description: "100% natural latex pillows for optimal head and neck support",
      rating: 4.7,
      reviews: 892,
      category: "pillows",
      size: "25x16.5x3.5 inches",
      features: ["100% Natural Latex", "Anti-Allergic", "Breathable", "Durable", "Supportive", "Eco-Friendly"],
      warranty: "5 Years",
      specifications: {
        material: "100% Natural Latex with organic cotton cover",
        thickness: "3.5 inches standard height",
        firmness: "Medium support for all sleep positions",
        care: "Spot clean only, air dry",
        dimensions: "25 x 16.5 x 3.5 inches (Standard Size)",
        weight: "1.5 kg approximately",
      },
      detailedDescription:
        "Experience the pure comfort of 100% natural latex with our Standard Pillows, crafted from premium latex sourced from sustainable rubber plantations. These pillows offer the perfect balance of support and comfort, adapting to your head and neck contours while maintaining consistent support throughout the night. The natural latex construction provides excellent breathability, keeping you cool and comfortable while offering natural resistance to dust mites, bacteria, and allergens. The organic cotton cover adds an extra layer of softness and breathability, making these pillows ideal for all sleep positions and preferences. Unlike synthetic alternatives, our natural latex pillows maintain their shape and support for years without flattening or developing uncomfortable indentations. The responsive nature of natural latex provides immediate pressure relief while ensuring your head and neck remain properly aligned throughout your sleep cycle. These pillows are perfect for those who appreciate the benefits of natural materials and want a sleep accessory that contributes to both personal health and environmental sustainability.",
      benefits: [
        "100% natural latex provides consistent, long-lasting support without synthetic chemicals",
        "Excellent breathability prevents heat buildup during sleep for comfortable temperature regulation",
        "Natural resistance to dust mites, bacteria, and allergens for healthier sleep environment",
        "Maintains shape and support for years without flattening or losing structural integrity",
        "Eco-friendly and sustainable material sourcing supports environmental conservation",
        "Suitable for all sleep positions and preferences with adaptive support characteristics",
        "Organic cotton cover for added comfort, breathability, and natural softness",
        "Chemical-free construction for safe, healthy sleep without harmful off-gassing",
      ],
      technology: [
        "Dunlop Latex Process: Consistent density and support through traditional manufacturing methods",
        "Open Cell Structure: Enhanced airflow and breathability for temperature regulation",
        "Natural Elasticity: Returns to original shape after use while conforming to head and neck",
        "Organic Cotton Cover: Breathable and soft natural fiber for enhanced comfort",
        "Anti-Microbial Properties: Natural resistance to bacteria, fungi, and allergens",
        "Temperature Neutral: Maintains comfortable sleep temperature without heat retention",
      ],
      certifications: [
        "GOLS Certified - Global Organic Latex Standard for organic latex integrity",
        "GOTS Certified - Global Organic Textile Standard for organic cotton cover",
        "ECO INSTITUT Certified - Environmental safety and sustainability standards",
        "OEKO-TEX Standard 100 - Textile safety certification for human health",
      ],
      suitableFor: [
        "All sleep positions - back, side, and stomach sleepers seeking versatile support",
        "People seeking natural, chemical-free sleep products for healthier rest",
        "Hot sleepers needing breathable pillow options with temperature regulation",
        "Allergy sufferers requiring hypoallergenic and antimicrobial materials",
        "Eco-conscious consumers preferring sustainable and environmentally responsible products",
        "Those wanting long-lasting, durable pillows with consistent support over time",
      ],
      careInstructions: [
        "Use breathable pillow protector to extend pillow life and maintain hygiene",
        "Spot clean stains immediately with mild soap and water, avoid soaking",
        "Air dry completely before use to prevent moisture buildup and odors",
        "Fluff pillow daily to maintain loft, shape, and optimal support characteristics",
        "Rotate pillow weekly for even wear and extended lifespan",
        "Keep away from direct heat sources and sunlight to preserve latex integrity",
        "Replace every 5-7 years for optimal support, hygiene, and sleep quality",
      ],
      whyChoose: [
        "Pure Natural Latex: 100% natural material without synthetic additives or chemicals",
        "Superior Support: Consistent support that doesn't flatten or lose shape over time",
        "Breathable Comfort: Natural airflow keeps you cool and comfortable all night",
        "Hypoallergenic Safety: Safe for sensitive sleepers and allergy sufferers",
        "Eco-Friendly Choice: Sustainable and environmentally responsible material selection",
        "Long-Lasting Value: 5-year warranty with exceptional durability and performance",
        "Versatile Design: Perfect for all sleep positions and personal preferences",
        "Certified Quality: Multiple international certifications for safety and environmental standards",
      ],
      inStock: true,
    },
    {
      id: 10,
      name: "Natural Latex Topper 78x72x2",
      price: 19500,
      originalPrice: 24000,
      image: "/images/mattress-topper.jpg",
      description: "2-inch natural latex topper for enhanced comfort",
      rating: 4.7,
      reviews: 456,
      category: "toppers",
      size: "78x72x2 inches",
      features: ["100% Natural Latex", "Pressure Relief", "Breathable", "Durable", "Easy Installation", "Eco-Friendly"],
      warranty: "10 Years",
      specifications: {
        material: "100% Natural Latex with organic cotton cover",
        thickness: "2 inches premium latex layer",
        firmness: "Medium-soft for enhanced comfort",
        care: "Spot clean, air dry, rotate regularly",
        dimensions: "78 x 72 x 2 inches (King Size)",
        weight: "12 kg approximately",
      },
      detailedDescription:
        "Transform your existing mattress into a luxury sleep experience with our 2-inch Natural Latex Topper. Made from 100% natural latex, this topper adds a layer of plush comfort while maintaining the supportive properties your body needs. The 2-inch thickness provides the perfect balance of softness and support, relieving pressure points while enhancing the overall comfort of your current mattress. Whether your mattress is too firm or showing signs of wear, this topper breathes new life into your sleep surface. The natural latex construction offers excellent breathability, temperature regulation, and durability, making it an investment in better sleep for years to come. The topper features an innovative design that conforms to your body's contours while providing responsive support that adjusts to your movements throughout the night. This makes it an ideal solution for couples with different comfort preferences, as it can soften a firm mattress for one partner while still providing adequate support. The organic cotton cover adds an extra layer of softness and breathability, ensuring that your sleep surface remains comfortable and hygienic.",
      benefits: [
        "Instantly transforms firm mattresses into comfortable sleep surfaces without replacement costs",
        "Provides targeted pressure point relief for hips, shoulders, and joints",
        "Extends the life of your existing mattress significantly, saving money long-term",
        "Natural temperature regulation prevents overheating and promotes comfortable sleep",
        "Hypoallergenic properties ideal for sensitive sleepers and allergy sufferers",
        "Easy installation with secure elastic corner straps for stable positioning",
        "Durable construction with 10-year warranty coverage for long-lasting performance",
        "Eco-friendly alternative to replacing entire mattress, reducing environmental impact",
      ],
      technology: [
        "Natural Latex Layer: 2-inch premium latex for comfort enhancement and pressure relief",
        "Pressure Relief Technology: Conforms to body contours for targeted support",
        "Breathable Construction: Open-cell structure for optimal airflow and temperature regulation",
        "Elastic Corner System: Secure attachment to mattress prevents shifting during sleep",
        "Temperature Regulation: Natural cooling properties maintain optimal sleep temperature",
        "Motion Isolation: Reduces partner movement transfer for undisturbed sleep",
      ],
      certifications: [
        "GOLS Certified - Global Organic Latex Standard for organic latex integrity",
        "ECO INSTITUT Certified - Environmental safety and sustainability standards",
        "OEKO-TEX Standard 100 - Textile safety certification for human health",
        "CertiPUR-US - Foam safety and environmental responsibility standards",
      ],
      suitableFor: [
        "People with firm mattresses seeking added comfort and pressure relief",
        "Those experiencing pressure point discomfort in hips, shoulders, or joints",
        "Couples needing motion isolation improvement for better sleep quality",
        "Hot sleepers requiring better temperature regulation and breathability",
        "Budget-conscious consumers avoiding expensive mattress replacement",
        "Anyone wanting to extend current mattress life and improve sleep comfort",
      ],
      careInstructions: [
        "Use breathable mattress protector over topper to maintain hygiene and extend life",
        "Rotate topper 180 degrees monthly for even wear and optimal performance",
        "Spot clean spills immediately with mild detergent and water, avoid soaking",
        "Air dry completely before making bed to prevent moisture buildup",
        "Allow topper to breathe by removing bedding weekly for air circulation",
        "Vacuum surface monthly to remove dust, allergens, and maintain cleanliness",
        "Store flat when not in use to maintain shape and structural integrity",
      ],
      whyChoose: [
        "Cost-Effective Solution: Upgrade comfort without buying expensive new mattress",
        "Natural Materials: 100% natural latex without harmful chemicals or synthetic additives",
        "Instant Comfort: Immediate improvement in sleep quality and pressure relief",
        "Targeted Pressure Relief: Specialized support for pressure points and joint comfort",
        "Temperature Control: Natural cooling properties for comfortable sleep temperature",
        "Easy Installation: Simple setup with secure corner straps for stable positioning",
        "Long-Lasting Investment: 10-year warranty with durable construction and materials",
        "Eco-Friendly Choice: Sustainable alternative to mattress replacement with environmental benefits",
      ],
      inStock: true,
    },
    {
      id: 16,
      name: "Baby Bed",
      price: 6999,
      originalPrice: 9499,
      image: "/images/baby-bed.jpg",
      description: "Safe and comfortable bed designed specifically for babies",
      rating: 4.8,
      reviews: 345,
      category: "mattresses",
      size: "48x24x4 inches",
      features: ["Baby Safe Materials", "Hypoallergenic", "Soft Support", "Non-Toxic", "Breathable", "Easy Clean"],
      warranty: "3 Years",
      specifications: {
        material: "Certified baby-safe foam with organic cotton cover",
        thickness: "4 inches with gentle support layers",
        firmness: "Soft yet supportive for infant development",
        care: "Machine washable cover, spot clean mattress",
        dimensions: "48 x 24 x 4 inches (Crib Size)",
        weight: "3 kg approximately",
      },
      detailedDescription:
        "Designed with your baby's safety and comfort as the top priority, our Baby Bed features certified baby-safe materials that meet the highest safety standards for infant sleep products. The carefully engineered 4-inch thickness provides the perfect balance of softness and support needed for healthy infant development. The hypoallergenic construction ensures a safe sleep environment free from harmful chemicals, allergens, and irritants. The breathable design promotes healthy airflow, reducing the risk of overheating while maintaining optimal comfort. Every component has been rigorously tested and certified to ensure your precious little one gets the safest, most comfortable sleep possible during these crucial early years. The mattress features a dual-layer construction with a soft comfort layer for gentle support and a firmer foundation layer for proper spinal development. The organic cotton cover is naturally soft, breathable, and free from harmful chemicals, providing a safe sleeping surface for your baby's delicate skin. This baby bed is designed to grow with your child, providing consistent support from newborn through toddler years while maintaining the highest safety standards throughout.",
      benefits: [
        "Certified safe materials meet strict infant safety standards and regulations",
        "Hypoallergenic construction protects sensitive baby skin from allergens and irritants",
        "Optimal firmness supports healthy spine development during crucial growth periods",
        "Breathable design prevents overheating and promotes healthy airflow circulation",
        "Easy-clean cover simplifies maintenance for busy parents with machine washable design",
        "Non-toxic materials ensure completely safe sleep environment for infants",
        "Durable construction grows with your baby from newborn through toddler years",
        "Pediatrician-recommended design for infant sleep safety and developmental support",
      ],
      technology: [
        "Baby-Safe Foam: Certified non-toxic, chemical-free materials specifically designed for infants",
        "Dual-Layer Support: Soft comfort layer with firm foundation for optimal development",
        "Breathable Core: Enhanced airflow design for temperature regulation and safety",
        "Organic Cotton Cover: Natural, soft, and hypoallergenic surface for baby's skin",
        "Anti-Microbial Treatment: Natural resistance to bacteria and harmful microorganisms",
        "Edge Safety Design: Rounded edges and safe construction for infant protection",
      ],
      certifications: [
        "GREENGUARD Gold Certified - Low chemical emissions for indoor air quality",
        "CertiPUR-US - Safe foam certification without harmful chemicals",
        "OEKO-TEX Standard 100 - Textile safety certification specifically for babies",
        "CPSC Compliant - Consumer Product Safety Commission standards for infant products",
        "JPMA Certified - Juvenile Products Manufacturers Association safety standards",
      ],
      suitableFor: [
        "Newborns to toddlers (0-3 years) requiring safe and supportive sleep surfaces",
        "Parents prioritizing chemical-free and non-toxic sleep products for their children",
        "Babies with sensitive skin or allergies needing hypoallergenic materials",
        "Families seeking pediatrician-recommended products for infant sleep safety",
        "Parents wanting easy-maintenance baby products with convenient care features",
        "Those requiring certified safe infant sleep solutions with rigorous testing",
      ],
      careInstructions: [
        "Machine wash cover in gentle cycle with baby-safe, fragrance-free detergent",
        "Air dry cover completely before reassembling to prevent moisture buildup",
        "Spot clean mattress with mild soap and water only, avoid harsh chemicals",
        "Ensure mattress is completely dry before use to prevent mold or mildew",
        "Use breathable crib sheets for added protection and comfort",
        "Inspect regularly for wear, damage, or signs of deterioration",
        "Replace immediately if any signs of wear or damage appear for safety",
      ],
      whyChoose: [
        "Safety First: Meets and exceeds all infant safety standards and certifications",
        "Healthy Development: Optimal support designed for growing babies and proper spinal alignment",
        "Chemical-Free: Non-toxic materials create completely safe sleep environment",
        "Easy Maintenance: Machine washable cover designed for busy parents",
        "Breathable Design: Prevents overheating and promotes healthy airflow for safety",
        "Pediatrician Approved: Recommended by child sleep specialists and healthcare professionals",
        "Quality Assurance: 3-year warranty with rigorous testing and quality control",
        "Peace of Mind: Certified safe materials and construction for your precious baby",
      ],
      inStock: true,
    },
  ]

  useEffect(() => {
    const productId = Number.parseInt(params.id)
    const foundProduct = allProducts.find((p) => p.id === productId)
    setProduct(foundProduct || null)

    // Get related products from same category
    if (foundProduct) {
      const related = allProducts
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 6)
        .map((p) => ({
          ...p,
          price: `₹${p.price.toLocaleString()}`,
          originalPrice: `₹${p.originalPrice.toLocaleString()}`,
        }))
      setRelatedProducts(related)
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  const savings = product.originalPrice - product.price
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100)

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          size: product.size,
        },
      })
    }
    dispatch({ type: "OPEN_CART" })
  }

  const buyNow = () => {
    addToCart()
    // In a real app, this would redirect to checkout
    console.log("Redirecting to checkout...")
  }

  const productImages = [product.image, product.image, product.image] // In real app, multiple images

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "benefits", label: "Benefits" },
    { id: "care", label: "Care Instructions" },
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
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">Contact Us</Button>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="text-gray-600 hover:text-orange-600">
              Shop
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="text-gray-600 hover:text-orange-600 capitalize"
            >
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={productImages[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={500}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <Badge className="absolute top-4 left-4 bg-orange-600 text-white text-lg px-3 py-1">
                  {savingsPercentage}% OFF
                </Badge>
                {product.warranty && (
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">{product.warranty} Warranty</Badge>
                )}
                <Button variant="outline" size="icon" className="absolute top-4 right-16 bg-white/80 hover:bg-white">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-orange-600" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700 capitalize">
                    {product.category}
                  </Badge>
                  {product.inStock ? (
                    <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-lg text-gray-600">{product.description}</p>
                <p className="text-sm text-orange-600 font-medium">Size: {product.size}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  <span className="text-2xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                </div>
                <p className="text-green-600 font-medium text-lg">
                  You save {formatPrice(savings)} ({savingsPercentage}% off)
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.slice(0, 3).map((cert, index) => (
                    <Badge key={index} variant="outline" className="border-green-600 text-green-700">
                      <Award className="h-3 w-3 mr-1" />
                      {cert.split(" - ")[0]}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                <div className="text-center space-y-2">
                  <Truck className="h-8 w-8 text-orange-600 mx-auto" />
                  <div className="text-xs text-gray-600">Free Shipping</div>
                </div>
                <div className="text-center space-y-2">
                  <Shield className="h-8 w-8 text-orange-600 mx-auto" />
                  <div className="text-xs text-gray-600">100-Night Trial</div>
                </div>
                <div className="text-center space-y-2">
                  <Award className="h-8 w-8 text-orange-600 mx-auto" />
                  <div className="text-xs text-gray-600">{product.warranty}</div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={!product.inStock}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!product.inStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-14 text-lg font-semibold"
                    onClick={addToCart}
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 h-14 text-lg font-semibold"
                    onClick={buyNow}
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{product.detailedDescription}</p>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900">Why Choose This Product?</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.whyChoose.map((reason, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900">Advanced Technology</h4>
                    <div className="space-y-3">
                      {product.technology.map((tech, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Leaf className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="border-b border-gray-200 pb-3">
                          <span className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="text-gray-600 ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Certifications</h4>
                      <div className="space-y-2">
                        {product.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-orange-600" />
                            <span className="text-gray-700 text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Product Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Health & Comfort Benefits</h4>
                      <div className="space-y-3">
                        {product.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Suitable For</h4>
                      <div className="space-y-3">
                        {product.suitableFor.map((suitable, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Star className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{suitable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "care" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Care Instructions</h3>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Maintenance Guidelines</h4>
                    <div className="space-y-3">
                      {product.careInstructions.map((instruction, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-orange-900 mb-3">Important Notes</h4>
                    <p className="text-orange-800">
                      Following these care instructions will help maintain the quality and extend the life of your
                      product. For any specific questions about care or maintenance, please contact our customer support
                      team.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ProductCarousel
              products={relatedProducts}
              title="Related Products"
              subtitle="You might also like these products from the same category"
            />
          </div>
        </section>
      )}

      {/* Back to Shop */}
      <section className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link href="/shop">
              <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
