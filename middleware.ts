import { NextRequest, NextResponse } from "next/server"
import { verifyTokenEdge } from "@/lib/auth-edge"

const cookieName = "nh360_auth"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminPath = pathname.startsWith("/admin")

  if (!isAdminPath) return NextResponse.next()

  const token = req.cookies.get(cookieName)?.value
  if (!token) return NextResponse.redirect(new URL("/login", req.url))
  // Edge-safe verification
  const payload = await verifyTokenEdge(token)
  if (!payload) return NextResponse.redirect(new URL("/login", req.url))
  if (payload.role !== "admin") return NextResponse.redirect(new URL("/", req.url))
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
