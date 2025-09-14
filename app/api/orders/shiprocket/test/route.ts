import { NextResponse } from "next/server"

export const runtime = "nodejs"

// POST /api/shiprocket/test
export async function POST() {
  try {
    // ⚠️ Replace with ENV vars (don’t hardcode passwords in code)
    const email = process.env.SHIPROCKET_EMAIL
    const password = process.env.SHIPROCKET_PASSWORD

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing Shiprocket credentials in env" },
        { status: 400 }
      )
    }

    const res = await fetch("https://apiv1.shiprocket.in/v1/external/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: "Shiprocket auth failed", details: data },
        { status: res.status }
      )
    }

    // ✅ success → return token
    return NextResponse.json({
      success: true,
      token: data.token,
      expires_in: data.expires_in,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: "Request error", details: err.message },
      { status: 500 }
    )
  }
}
