// Updated email service that works with Vercel Edge Runtime
export interface OrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  phone?: string
  totalAmount: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  address: string
  city: string
  state: string
  pincode: string
  orderDate: string
}

export interface CourierDetails {
  courierCompany: string
  trackingNumber: string
  estimatedDelivery: string
  courierContact: string
}

export interface StatusUpdateEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  newStatus: string
  courierDetails?: CourierDetails
}

export const emailService = {
  // Send order notification to sales team
  sendOrderNotification: async (orderData: OrderEmailData): Promise<boolean> => {
    try {
      console.log("Sending order notification email via Edge-compatible API...")

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "order-notification",
          data: orderData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("Order notification email sent successfully:", result.messageId)

        // If it's a fallback method, open mailto link
        if (result.fallback && result.mailtoLink) {
          console.log("Opening email client for manual sending...")
          window.open(result.mailtoLink, "_blank")
        }

        return true
      } else {
        console.error("Failed to send order notification email:", result.message)
        return false
      }
    } catch (error) {
      console.error("Error sending order notification email:", error)
      return false
    }
  },

  // Send status update email to customer
  sendStatusUpdateEmail: async (updateData: StatusUpdateEmailData): Promise<boolean> => {
    try {
      console.log("Sending status update email via Edge-compatible API...")

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "status-update",
          data: updateData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("Status update email sent successfully:", result.messageId)
        return true
      } else {
        console.error("Failed to send status update email:", result.message)
        return false
      }
    } catch (error) {
      console.error("Error sending status update email:", error)
      return false
    }
  },
}
