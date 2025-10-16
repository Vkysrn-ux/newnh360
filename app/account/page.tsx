"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

type Me = {
  authenticated: boolean
  user?: {
    id: number
    name: string | null
    email: string
    phone: string | null
    role: string
    email_verified_at: string | null
    created_at: string
    last_login_at: string | null
  }
  orders?: Array<{ id: number; orderId: string; totalAmount: number; status: string; orderDate: string }>
}

export default function AccountPage() {
  const [data, setData] = useState<Me | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch("/api/auth/me").then(async (r) => {
      if (!active) return
      if (!r.ok) {
        window.location.href = "/login"
        return
      }
      const j = (await r.json()) as Me
      if (!j.authenticated) {
        window.location.href = "/login"
        return
      }
      setData(j)
      setLoading(false)
    })
    return () => { active = false }
  }, [])

  if (loading) {
    return <main className="min-h-screen bg-black text-gray-200 flex items-center justify-center">Loading…</main>
  }

  const u = data?.user!

  return (
    <main className="min-h-screen bg-black text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-white mb-6">My Account</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-orange-900 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Profile</h2>
            <div className="text-sm text-gray-300 space-y-1">
              <div><span className="text-gray-400">Name:</span> {u.name || "—"}</div>
              <div><span className="text-gray-400">Email:</span> {u.email}</div>
              <div><span className="text-gray-400">Phone:</span> {u.phone || "—"}</div>
              <div><span className="text-gray-400">Role:</span> {u.role}</div>
              <div><span className="text-gray-400">Email verified:</span> {u.email_verified_at ? new Date(u.email_verified_at).toLocaleString() : "No"}</div>
            </div>
            {!u.email_verified_at && (
              <button
                className="mt-3 text-sm text-orange-400 underline"
                onClick={async () => {
                  await fetch("/api/auth/send-verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: u.email }) })
                  alert("Verification email sent")
                }}
              >
                Send verification email
              </button>
            )}
            <div className="mt-4 flex gap-3">
              <Link href="/#buy" className="px-3 py-2 rounded-md border border-orange-800 text-orange-300">Buy FASTag</Link>
              <Link href="/#recharge" className="px-3 py-2 rounded-md border border-orange-800 text-orange-300">Recharge</Link>
            </div>
          </div>

          <div className="md:col-span-2 rounded-xl border border-orange-900 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Orders</h2>
            {data?.orders && data.orders.length > 0 ? (
              <div className="divide-y divide-orange-900/50">
                {data.orders.map((o) => (
                  <div key={o.id} className="py-3 flex items-center justify-between text-sm">
                    <div>
                      <div className="text-white">{o.orderId}</div>
                      <div className="text-gray-400">{new Date(o.orderDate).toLocaleString()} • {o.status}</div>
                    </div>
                    <div className="text-orange-400 font-semibold">₹{o.totalAmount}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400">No orders yet.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

