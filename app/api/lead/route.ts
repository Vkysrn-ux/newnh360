import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { db } from "@/lib/db"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, place, vehicleRegNo, product, notes } = body || {}

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      )
    }

    // 1) Save lead locally (non-fatal if fails)
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(64) NOT NULL,
          city VARCHAR(128),
          vehicle_reg_no VARCHAR(64),
          product VARCHAR(128),
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `)

      // Ensure new column exists if table was created earlier without it
      try { await db.query(`ALTER TABLE leads ADD COLUMN vehicle_reg_no VARCHAR(64) NULL`) } catch {}

      await db.query(
        `INSERT INTO leads (name, phone, city, vehicle_reg_no, product, notes) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, phone, place ?? null, vehicleRegNo ?? null, product ?? null, notes ?? null]
      )
    } catch (e) {
      console.warn("lead: local save failed", e)
    }

    // 2) Forward to Tickets API
    let ticketResponse: any = null
    try {
      const TICKETS_API_URL = (process.env.TICKETS_API_URL || "https://nh360-self.vercel.app/api/tickets").replace(/\/+$/, "")
      const TICKETS_API_KEY = process.env.TICKETS_API_KEY

      const payload = {
        subject: product || "New FASTag",
        phone,
        customer_name: name,
        details: `Lead from website${place ? `, Place: ${place}` : ""}${vehicleRegNo ? `, Vehicle Reg No: ${vehicleRegNo}` : ""}${notes ? `, Notes: ${notes}` : ""}`,
        lead_received_from: "website",
        status: "waiting",
        kyv_status: "kyv_pending_approval",
        vehicle_reg_no: vehicleRegNo || "",
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }
      if (TICKETS_API_KEY) {
        headers["x-api-key"] = TICKETS_API_KEY
      }

      const res = await fetch(TICKETS_API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        ticketResponse = await res.json()
      } else {
        const errTxt = await res.text().catch(() => "")
        console.warn("lead: tickets api non-200", res.status, errTxt.slice(0, 200))
        ticketResponse = {
          error: true,
          status: res.status,
          location: res.headers.get("location"),
          message: errTxt.slice(0, 200),
        }
      }
    } catch (e) {
      console.warn("lead: tickets api failed", e)
    }

    // 3) Email notification (optional)
    try {
      const {
        SMTP_HOST,
        SMTP_PORT = "587",
        SMTP_SECURE = "false",
        SMTP_USER,
        SMTP_PASS,
        SMTP_FROM = "NH360 FASTag <no-reply@nh360fastag.com>",
        SALES_EMAIL = "sales@nh360fastag.com",
      } = process.env as Record<string, string | undefined>

      if (SMTP_USER && SMTP_PASS) {
        const transporter = nodemailer.createTransport(
          SMTP_HOST
            ? {
                host: SMTP_HOST,
                port: Number(SMTP_PORT),
                secure: SMTP_SECURE === "true",
                auth: { user: SMTP_USER, pass: SMTP_PASS },
              }
            : {
                service: "gmail",
                auth: { user: SMTP_USER, pass: SMTP_PASS },
              }
        )

        try { await transporter.verify() } catch {}

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
          from: SMTP_FROM,
          to: SALES_EMAIL || "sales@nh360fastag.com",
          subject: `New FASTag Lead - ${name}`,
          html,
        })
      } else {
        console.info("lead: SMTP credentials missing; email notification skipped")
      }
    } catch (mailErr) {
      console.warn("lead: email send failed", mailErr)
    }

    return NextResponse.json({
      success: true,
      forwardedToTickets: ticketResponse && ticketResponse.error !== true,
      ticket: ticketResponse && ticketResponse.error !== true ? ticketResponse : null,
      ticketsDebug: ticketResponse && ticketResponse.error === true
        ? {
            url: (process.env.TICKETS_API_URL || "https://nh360-self.vercel.app/api/tickets").replace(/\/+$/, ""),
            auth: "x-api-key",
            remoteStatus: ticketResponse.status ?? null,
            remoteLocation: ticketResponse.location ?? null,
            message: ticketResponse.message ?? undefined,
          }
        : {
            url: (process.env.TICKETS_API_URL || "https://nh360-self.vercel.app/api/tickets").replace(/\/+$/, ""),
            auth: "x-api-key",
          },
    })
  } catch (e: any) {
    console.error("lead error", e)
    return NextResponse.json({ success: false, message: e.message }, { status: 500 })
  }
}
