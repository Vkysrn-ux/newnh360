"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Star, Shield, Truck, Award, Plus, Minus } from "lucide-react"
import Image from "next/image"
import { useCart } from "./cart-context"
import Link from "next/link"

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
  size?: string
  features: string[]
  warranty?: string
  specifications?: {
    material: string
    thickness: string
    firmness: string
    care: string
  }
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  if (!isOpen || !product) return null

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
    onClose() // Close the modal after adding to cart
  }

  const buyNow = () => {
    addToCart()
    // In a real app, this would redirect to checkout
    console.log("Redirecting to checkout...")
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={400}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <Badge className="absolute top-4 left-4 bg-orange-600 text-white">{savingsPercentage}% OFF</Badge>
                {product.warranty && (
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">{product.warranty} Warranty</Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-lg text-gray-600">{product.description}</p>
                {product.size && <p className="text-sm text-orange-600 font-medium">Size: {product.size}</p>}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
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
                <p className="text-green-600 font-medium">
                  You save {formatPrice(savings)} ({savingsPercentage}% off)
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Material:</span>
                      <span className="text-gray-600 ml-2">{product.specifications.material}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Thickness:</span>
                      <span className="text-gray-600 ml-2">{product.specifications.thickness}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Firmness:</span>
                      <span className="text-gray-600 ml-2">{product.specifications.firmness}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Care:</span>
                      <span className="text-gray-600 ml-2">{product.specifications.care}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
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
                  <div className="text-xs text-gray-600">{product.warranty || "Warranty"}</div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg font-semibold"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 h-12 text-lg font-semibold"
                    onClick={buyNow}
                  >
                    Buy Now
                  </Button>
                </div>
                <div className="mt-3">
                  <Link href={`/product/${product.id}`}>
                    <Button variant="ghost" className="w-full text-orange-600 hover:bg-orange-50" onClick={onClose}>
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
