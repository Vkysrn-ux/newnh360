import { NextResponse } from "next/server"
import { Shiprocket } from "@/lib/shiprocket"

export const runtime = "nodejs"

export async function GET() {
  const env = process.env as Record<string, string | undefined>
  const info: any = {
    base: env.SHIPROCKET_BASE_URL || "https://apiv2.shiprocket.in/v1/external",
    emailPresent: Boolean(env.SHIPROCKET_EMAIL),
    passwordPresent: Boolean(env.SHIPROCKET_PASSWORD),
    pickupLocation: env.SHIPROCKET_PICKUP_LOCATION || null,
  }
  try {
    // Attempt a login to validate credentials (will use cached token on subsequent calls)
    const login = await Shiprocket.login()
    info.login = { ok: true, hasToken: Boolean(login?.token) }
  } catch (e: any) {
    info.login = { ok: false, error: e?.message || String(e) }
  }
  return NextResponse.json(info)
}

