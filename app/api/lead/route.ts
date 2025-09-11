import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, city, vehicleType, product, notes } = body || {}

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: "Name and phone are required" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vkysrn3@gmail.com",
        pass: "kmasydxlgwcaelap",
      },
    })

    await transporter.verify()

    const html = `
      <h2>New FASTag Lead</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      ${city ? `<p><b>City:</b> ${city}</p>` : ""}
      ${vehicleType ? `<p><b>Vehicle Type:</b> ${vehicleType}</p>` : ""}
      ${product ? `<p><b>Product:</b> ${product}</p>` : ""}
      ${notes ? `<p><b>Notes:</b> ${notes}</p>` : ""}
      <p>— NH360 FASTag website</p>
    `

    await transporter.sendMail({
      from: '"NH360 FASTag" <vkysrn3@gmail.com>',
      to: "sales@nh360fastag.com",
      subject: `New FASTag Lead - ${name}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    console.error("lead error", e)
    return NextResponse.json({ success: false, message: e.message }, { status: 500 })
  }
}

