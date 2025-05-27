// Zoho Mail Email configuration using environment variables
export const emailConfig = {
  // Zoho SMTP settings from environment variables
  zoho: {
    host: "smtp.zoho.com",
    port: 587,
    secure: false, // false for STARTTLS
    auth: {
      user: process.env.ZOHO_EMAIL || "sales@britexcbe.com",
      pass: process.env.ZOHO_PASSWORD || "",
    },
  },

  // Email addresses
  from: process.env.ZOHO_EMAIL || "sales@britexcbe.com",
  salesTeam: {
    to: "sales@britexcbe.com",
    cc: ["sudha@britexcbe.com", "karan@britexcbe.com"],
  },
}

// Email templates optimized for Zoho Mail
export const emailTemplates = {
  orderNotification: (data: any) => ({
    subject: `🛒 New Order Received - ${data.orderId} | Cortez by BRITEX`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Notification - Cortez</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 650px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ea580c, #dc2626); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🛒 New Order Alert!</h1>
            <p style="margin: 15px 0 0 0; font-size: 20px; opacity: 0.95;">Order ID: <strong>${data.orderId}</strong></p>
            <div style="margin-top: 20px; padding: 10px 20px; background-color: rgba(255,255,255,0.2); border-radius: 25px; display: inline-block;">
              <span style="font-size: 16px;">📅 ${new Date(data.orderDate).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</span>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            
            <!-- Customer Details -->
            <div style="margin-bottom: 35px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; border-bottom: 3px solid #ea580c; padding-bottom: 8px; display: inline-block;">👤 Customer Information</h2>
              <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; border-left: 5px solid #ea580c;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #6b7280; width: 35%; font-size: 16px;">📝 Name:</td>
                    <td style="padding: 12px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${data.customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #6b7280; font-size: 16px;">📧 Email:</td>
                    <td style="padding: 12px 0; color: #1f2937; font-size: 16px;"><a href="mailto:${data.customerEmail}" style="color: #ea580c; text-decoration: none;">${data.customerEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #6b7280; font-size: 16px;">📱 Phone:</td>
                    <td style="padding: 12px 0; color: #1f2937; font-size: 16px;"><a href="tel:${data.phone || ""}" style="color: #ea580c; text-decoration: none;">${data.phone || "Not provided"}</a></td>
                  </tr>
                </table>
              </div>
            </div>
            
            <!-- Delivery Address -->
            <div style="margin-bottom: 35px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; border-bottom: 3px solid #ea580c; padding-bottom: 8px; display: inline-block;">🏠 Delivery Address</h2>
              <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 25px; border-radius: 12px; border: 2px solid #0ea5e9;">
                <p style="margin: 0; line-height: 1.8; color: #0c4a6e; font-size: 16px; font-weight: 500;">
                  📍 ${data.address}<br>
                  🏙️ ${data.city}, ${data.state}<br>
                  📮 PIN: ${data.pincode}
                </p>
              </div>
            </div>
            
            <!-- Order Items -->
            <div style="margin-bottom: 35px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; border-bottom: 3px solid #ea580c; padding-bottom: 8px; display: inline-block;">🛏️ Order Items</h2>
              <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: linear-gradient(135deg, #ea580c, #dc2626); color: white;">
                      <th style="padding: 18px 15px; text-align: left; font-weight: bold; font-size: 16px;">Product</th>
                      <th style="padding: 18px 15px; text-align: center; font-weight: bold; font-size: 16px;">Qty</th>
                      <th style="padding: 18px 15px; text-align: right; font-weight: bold; font-size: 16px;">Unit Price</th>
                      <th style="padding: 18px 15px; text-align: right; font-weight: bold; font-size: 16px;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.items
                      .map(
                        (item: any, index: number) => `
                      <tr style="background-color: ${index % 2 === 0 ? "#f8fafc" : "white"}; border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 18px 15px; color: #1f2937; font-weight: 500; font-size: 15px;">${item.name}</td>
                        <td style="padding: 18px 15px; text-align: center; color: #1f2937; font-weight: bold; font-size: 15px; background-color: #fef3c7; border-radius: 6px;">${item.quantity}</td>
                        <td style="padding: 18px 15px; text-align: right; color: #1f2937; font-size: 15px;">₹${item.price.toLocaleString()}</td>
                        <td style="padding: 18px 15px; text-align: right; color: #1f2937; font-weight: bold; font-size: 15px;">₹${(item.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    `,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Total Amount -->
            <div style="text-align: right; margin-bottom: 35px;">
              <div style="background: linear-gradient(135deg, #ea580c, #dc2626); color: white; padding: 25px 30px; border-radius: 15px; display: inline-block; min-width: 280px; box-shadow: 0 8px 16px rgba(234, 88, 12, 0.3);">
                <h3 style="margin: 0 0 8px 0; font-size: 18px; opacity: 0.9;">💰 Total Order Value</h3>
                <p style="margin: 0; font-size: 36px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">₹${data.totalAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <!-- Action Required -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 20px;">⚡ Immediate Action Required</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 25px; line-height: 1.8; font-size: 15px;">
                <li><strong>Process this order immediately</strong></li>
                <li><strong>Update status in admin panel</strong></li>
                <li><strong>Arrange product preparation</strong></li>
                <li><strong>Coordinate delivery logistics</strong></li>
                <li><strong>Send customer confirmation</strong></li>
              </ul>
            </div>
            
            <!-- Quick Actions -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px;">
              <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">🚀 Quick Access Links</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                <a href="https://your-domain.com/admin" style="background-color: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">📊 Admin Panel</a>
                <a href="mailto:${data.customerEmail}" style="background-color: #10b981; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">📧 Email Customer</a>
                <a href="tel:${data.phone || ""}" style="background-color: #f59e0b; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">📞 Call Customer</a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #1f2937; color: white; padding: 30px; text-align: center;">
            <h3 style="color: #ea580c; margin: 0 0 15px 0; font-size: 24px; font-weight: bold;">Cortez by BRITEX</h3>
            <p style="margin: 0 0 15px 0; opacity: 0.9; font-size: 16px;">Premium Sleep Solutions</p>
            <div style="border-top: 1px solid #374151; padding-top: 15px; margin-top: 15px;">
              <p style="margin: 0; font-size: 13px; opacity: 0.7;">
                📧 Sent via Zoho Mail | 🤖 Automated Order Notification<br>
                Generated on ${new Date().toLocaleString("en-IN")} | Order Management System
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🛒 NEW ORDER NOTIFICATION - ${data.orderId}

📅 Order Date: ${new Date(data.orderDate).toLocaleString("en-IN")}

👤 CUSTOMER DETAILS:
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.phone || "Not provided"}

🏠 DELIVERY ADDRESS:
${data.address}
${data.city}, ${data.state} - ${data.pincode}

🛏️ ORDER ITEMS:
${data.items.map((item: any) => `• ${item.name} - Qty: ${item.quantity} - ₹${item.price.toLocaleString()} (Total: ₹${(item.price * item.quantity).toLocaleString()})`).join("\n")}

💰 TOTAL ORDER VALUE: ₹${data.totalAmount.toLocaleString()}

⚡ ACTION REQUIRED:
- Process this order immediately
- Update status in admin panel
- Arrange product preparation
- Coordinate delivery logistics
- Send customer confirmation

---
Cortez by BRITEX - Premium Sleep Solutions
📧 Sent via Zoho Mail | Automated Order Notification
Generated on ${new Date().toLocaleString("en-IN")}
    `,
  }),

  statusUpdate: (data: any) => {
    const getStatusInfo = (status: string) => {
      switch (status) {
        case "in-progress":
          return {
            title: "Order is Being Processed",
            message: "Great news! Your order is now being processed and will be shipped soon.",
            color: "#3b82f6",
            emoji: "⚡",
            bgColor: "#eff6ff",
          }
        case "transit":
          return {
            title: "Order Shipped - On the Way!",
            message: "Exciting news! Your order has been shipped and is on its way to you.",
            color: "#10b981",
            emoji: "🚚",
            bgColor: "#f0fdf4",
          }
        case "completed":
          return {
            title: "Order Delivered Successfully",
            message: "Your order has been delivered successfully. We hope you enjoy your new Cortez products!",
            color: "#059669",
            emoji: "✅",
            bgColor: "#ecfdf5",
          }
        default:
          return {
            title: "Order Status Updated",
            message: "Your order status has been updated.",
            color: "#6b7280",
            emoji: "📋",
            bgColor: "#f9fafb",
          }
      }
    }

    const statusInfo = getStatusInfo(data.newStatus)

    return {
      subject: `${statusInfo.emoji} Order Update - ${data.orderId} | ${statusInfo.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Status Update - Cortez</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: ${statusInfo.bgColor};">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background-color: ${statusInfo.color}; color: white; padding: 35px 25px; text-align: center;">
              <h1 style="margin: 0; font-size: 30px; font-weight: bold;">${statusInfo.emoji} ${statusInfo.title}</h1>
              <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.95;">Order ID: <strong>${data.orderId}</strong></p>
            </div>
            
            <!-- Content -->
            <div style="padding: 35px 25px;">
              <h2 style="color: #1f2937; margin: 0 0 25px 0; font-size: 26px;">Hello ${data.customerName},</h2>
              <p style="font-size: 17px; line-height: 1.7; color: #374151; margin-bottom: 35px;">${statusInfo.message}</p>
              
              ${
                data.courierDetails
                  ? `
                <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 30px; border-radius: 15px; margin: 35px 0; border-left: 5px solid #3b82f6;">
                  <h3 style="color: #1e40af; margin: 0 0 25px 0; font-size: 22px;">🚚 Shipping & Tracking Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 45%; font-size: 16px;">📦 Courier Company:</td>
                      <td style="padding: 12px 0; color: #1e40af; font-weight: bold; font-size: 16px;">${data.courierDetails.courierCompany}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; font-weight: bold; color: #374151; font-size: 16px;">🔢 Tracking Number:</td>
                      <td style="padding: 12px 0;">
                        <span style="font-family: 'Courier New', monospace; background-color: #1f2937; color: white; padding: 8px 15px; border-radius: 8px; font-weight: bold; font-size: 15px; letter-spacing: 1px;">${data.courierDetails.trackingNumber}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; font-weight: bold; color: #374151; font-size: 16px;">📅 Estimated Delivery:</td>
                      <td style="padding: 12px 0; color: #059669; font-weight: bold; font-size: 16px;">${data.courierDetails.estimatedDelivery}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; font-weight: bold; color: #374151; font-size: 16px;">📞 Courier Contact:</td>
                      <td style="padding: 12px 0; color: #374151; font-size: 16px;"><a href="tel:${data.courierDetails.courierContact}" style="color: #ea580c; text-decoration: none;">${data.courierDetails.courierContact}</a></td>
                    </tr>
                  </table>
                  
                  <div style="margin-top: 25px; padding: 20px; background-color: #dbeafe; border-radius: 10px;">
                    <p style="margin: 0; font-size: 15px; color: #1e40af;"><strong>📱 Track Your Package:</strong> Use the tracking number above to monitor your shipment's progress on the courier company's website or mobile app. You'll receive real-time updates on your package location.</p>
                  </div>
                </div>
              `
                  : ""
              }
              
              <!-- Support Section -->
              <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 30px; border-radius: 15px; margin: 35px 0; border-left: 5px solid #f59e0b;">
                <h4 style="color: #92400e; margin: 0 0 20px 0; font-size: 20px;">🤝 Need Help? We're Here for You!</h4>
                <p style="margin: 0 0 20px 0; color: #92400e; font-size: 15px;">If you have any questions about your order, please don't hesitate to contact us:</p>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0; color: #92400e; font-size: 15px;"><strong>📞 Phone:</strong></td>
                    <td style="padding: 8px 0;"><a href="tel:+919894517926" style="color: #ea580c; text-decoration: none; font-weight: bold;">+91-9894517926</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #92400e; font-size: 15px;"><strong>📧 Email:</strong></td>
                    <td style="padding: 8px 0;"><a href="mailto:sales@britexcbe.com" style="color: #ea580c; text-decoration: none; font-weight: bold;">sales@britexcbe.com</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #92400e; font-size: 15px;"><strong>🕒 Support Hours:</strong></td>
                    <td style="padding: 8px 0; color: #92400e; font-weight: bold;">Monday - Saturday, 9 AM - 7 PM</td>
                  </tr>
                </table>
              </div>
              
              <!-- Review Request -->
              <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0;">
                <h4 style="color: #7c3aed; margin: 0 0 15px 0; font-size: 18px;">⭐ Love Your Cortez Products?</h4>
                <p style="margin: 0 0 20px 0; color: #7c3aed; font-size: 14px;">Share your experience and help others discover the comfort of premium sleep!</p>
                <a href="#" style="background-color: #7c3aed; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Write a Review</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1f2937; color: white; padding: 30px 25px; text-align: center;">
              <h3 style="color: #ea580c; margin: 0 0 15px 0; font-size: 22px; font-weight: bold;">Thank you for choosing Cortez!</h3>
              <p style="margin: 0 0 20px 0; opacity: 0.9; font-size: 16px;">Experience better sleep with our premium mattresses and sleep accessories.</p>
              <div style="border-top: 1px solid #374151; padding-top: 20px; margin-top: 20px;">
                <p style="margin: 0; font-size: 13px; opacity: 0.7;">
                  📧 This email was sent from sales@britexcbe.com via Zoho Mail<br>
                  🤖 Automated status update | Generated on ${new Date().toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
${statusInfo.emoji} ${statusInfo.title} - Order ${data.orderId}

Hello ${data.customerName},

${statusInfo.message}

${
  data.courierDetails
    ? `
🚚 SHIPPING DETAILS:
Courier Company: ${data.courierDetails.courierCompany}
Tracking Number: ${data.courierDetails.trackingNumber}
Estimated Delivery: ${data.courierDetails.estimatedDelivery}
Courier Contact: ${data.courierDetails.courierContact}

📱 Track Your Package: Use the tracking number above to monitor your shipment's progress.
`
    : ""
}

🤝 NEED HELP?
If you have any questions about your order, please contact us:
📞 Phone: +91-9894517926
📧 Email: sales@britexcbe.com
🕒 Support Hours: Mon-Sat, 9 AM - 7 PM

Thank you for choosing Cortez!
Experience better sleep with our premium mattresses and sleep accessories.

---
📧 This email was sent from sales@britexcbe.com via Zoho Mail
Generated on ${new Date().toLocaleString("en-IN")}
      `,
    }
  },
}
