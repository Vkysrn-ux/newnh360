"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Truck, Calendar, Phone, Package } from "lucide-react"

interface CourierDetails {
  courierCompany: string
  trackingNumber: string
  estimatedDelivery: string
  courierContact: string
}

interface CourierDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (details: CourierDetails) => void
  orderInfo: {
    orderId: string
    customerName: string
  }
}

export function CourierDetailsModal({ isOpen, onClose, onSubmit, orderInfo }: CourierDetailsModalProps) {
  const [courierDetails, setCourierDetails] = useState<CourierDetails>({
    courierCompany: "",
    trackingNumber: "",
    estimatedDelivery: "",
    courierContact: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    if (!courierDetails.courierCompany || !courierDetails.trackingNumber || !courierDetails.estimatedDelivery) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    await onSubmit(courierDetails)

    // Reset form
    setCourierDetails({
      courierCompany: "",
      trackingNumber: "",
      estimatedDelivery: "",
      courierContact: "",
    })
    setIsSubmitting(false)
    onClose()
  }

  const handleChange = (field: keyof CourierDetails, value: string) => {
    setCourierDetails((prev) => ({ ...prev, [field]: value }))
  }

  // Get tomorrow's date as minimum delivery date
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900">Add Courier Details</h2>
              <p className="text-sm text-gray-600">Order: {orderInfo.orderId}</p>
              <p className="text-sm text-gray-600">Customer: {orderInfo.customerName}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courierCompany" className="flex items-center text-sm font-medium text-gray-700">
                <Truck className="h-4 w-4 mr-2" />
                Courier Company *
              </Label>
              <Input
                id="courierCompany"
                type="text"
                placeholder="e.g., Blue Dart, DTDC, FedEx, Delhivery"
                value={courierDetails.courierCompany}
                onChange={(e) => handleChange("courierCompany", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trackingNumber" className="flex items-center text-sm font-medium text-gray-700">
                <Package className="h-4 w-4 mr-2" />
                Tracking Number *
              </Label>
              <Input
                id="trackingNumber"
                type="text"
                placeholder="Enter tracking/AWB number"
                value={courierDetails.trackingNumber}
                onChange={(e) => handleChange("trackingNumber", e.target.value.toUpperCase())}
                required
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDelivery" className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 mr-2" />
                Estimated Delivery Date *
              </Label>
              <Input
                id="estimatedDelivery"
                type="date"
                value={courierDetails.estimatedDelivery}
                onChange={(e) => handleChange("estimatedDelivery", e.target.value)}
                min={getTomorrowDate()}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courierContact" className="flex items-center text-sm font-medium text-gray-700">
                <Phone className="h-4 w-4 mr-2" />
                Courier Contact Number
              </Label>
              <Input
                id="courierContact"
                type="tel"
                placeholder="Courier company contact number"
                value={courierDetails.courierContact}
                onChange={(e) => handleChange("courierContact", e.target.value)}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Order status will be updated to "In Transit"</li>
                <li>• Customer will receive email with tracking details</li>
                <li>• Courier information will be saved to order</li>
              </ul>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Ship Order"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
