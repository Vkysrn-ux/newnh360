import { NextRequest, NextResponse } from "next/server"

const cookieName = "nh360_auth"

export async function POST(_req: NextRequest) {
  const res = NextResponse.json({ success: true })
  res.cookies.set(cookieName, "", { httpOnly: true, path: "/", maxAge: 0 })
  return res
}

