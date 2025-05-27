import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type OrderItem = { name: string; quantity: number; price: number; };
type OrderEmailData = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone?: string;
  totalAmount: number;
  items: OrderItem[];
  address: string;
  city: string;
  state: string;
  pincode: string;
  orderDate: string;
};

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { type, data } = await req.json() as { type: string; data: OrderEmailData };

    if (type !== "order-notification") {
      return NextResponse.json({ success: false, message: "Unsupported email type" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vkysrn3@gmail.com",          // Your Gmail address
        pass: "kmasydxlgwcaelap",     // Your Gmail app password
      },
    });

    // Optional: check login
    await transporter.verify();

    // -- 1. Send to sales team --
    const salesTo = "sales@britexcbe.com";
    const salesCc = ["sudha@britexcbe.com", "karan@britexcbe.com"];
    const salesSubject = `New Order from ${data.customerName} - Order #${data.orderId}`;
    const salesHtml = `
      <h2>New Order Received</h2>
      <p><b>Order ID:</b> ${data.orderId}</p>
      <p><b>Customer:</b> ${data.customerName} (${data.customerEmail})</p>
      <p><b>Phone:</b> ${data.phone || "N/A"}</p>
      <p><b>Address:</b> ${data.address}, ${data.city}, ${data.state}, ${data.pincode}</p>
      <p><b>Date:</b> ${data.orderDate}</p>
      <p><b>Total:</b> ₹${data.totalAmount}</p>
      <ul>
        ${data.items.map(item => `<li>${item.name} x ${item.quantity} @ ₹${item.price}</li>`).join("")}
      </ul>
    `;
    await transporter.sendMail({
      from: `"Cortez by BRITEX" <vkysrn3@gmail.com>`,
      to: salesTo,
      cc: salesCc,
      subject: salesSubject,
      html: salesHtml,
    });

    // -- 2. Send confirmation to customer --
    const customerSubject = `Your Order with Cortez by BRITEX is Confirmed! (Order #${data.orderId})`;
    const customerHtml = `
      <h2>Thank you for your order!</h2>
      <p>Dear ${data.customerName},</p>
      <p>We have received your order <b>#${data.orderId}</b>. Below are your order details:</p>
      <ul>
        ${data.items.map(item => `<li>${item.name} x ${item.quantity} @ ₹${item.price}</li>`).join("")}
      </ul>
      <p><b>Total Paid:</b> ₹${data.totalAmount}</p>
      <p><b>Shipping Address:</b> ${data.address}, ${data.city}, ${data.state}, ${data.pincode}</p>
      <p>We will process your order and update you with tracking info soon.</p>
      <p>For any queries, call +91-9894517926 or email support@britexcbe.com</p>
      <br/>
      <p>Thank you for shopping with Cortez by BRITEX!</p>
    `;
    await transporter.sendMail({
      from: `"Cortez by BRITEX" <yourgmail@gmail.com>`,
      to: data.customerEmail,         // <--- Customer's email
      subject: customerSubject,
      html: customerHtml,
    });

    return NextResponse.json({ success: true, message: "Both emails sent" });
  } catch (error: any) {
    console.error("❌ Error in send-email:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
