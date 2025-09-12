import { NextResponse } from "next/server"

export async function GET() {
  const { TICKETS_API_URL, TICKETS_API_KEY } = process.env as Record<string, string | undefined>

  const redact = (s?: string) =>
    s ? `${s.slice(0, 6)}...${s.slice(-6)} (len:${s.length})` : null

  return NextResponse.json({
    url: TICKETS_API_URL || null,
    authMode: TICKETS_API_KEY ? "x-api-key" : "none",
    apiKey: TICKETS_API_KEY ? redact(TICKETS_API_KEY) : null,
  })
}
