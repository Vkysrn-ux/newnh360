"use client"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [mode, setMode] = useState<"password" | "otp">("otp")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const requestOtp = async () => {
    setLoading(true)
    setMsg(null)
    try {
      const r = await fetch("/api/auth/request-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) })
      const j = await r.json()
      setMsg(j.message || (r.ok ? "OTP sent" : "Failed"))
    } finally { setLoading(false) }
  }

  const verifyOtp = async () => {
    setLoading(true)
    setMsg(null)
    try {
      const r = await fetch("/api/auth/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, code }) })
      const j = await r.json()
      setMsg(j.message || (r.ok ? "Logged in" : "Failed"))
      if (r.ok) window.location.href = j.role === "admin" ? "/admin" : "/account"
    } finally { setLoading(false) }
  }

  const loginPassword = async () => {
    setLoading(true)
    setMsg(null)
    try {
      const r = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
      const j = await r.json()
      setMsg(j.message || (r.ok ? "Logged in" : "Failed"))
      if (r.ok) window.location.href = j.role === "admin" ? "/admin" : "/account"
    } finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-black text-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-orange-900 bg-neutral-950 p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
        <div className="flex gap-2 mb-4 text-sm">
          <button onClick={() => setMode("otp")} className={`px-3 py-1 rounded-md border ${mode === "otp" ? "border-orange-600 text-orange-400" : "border-transparent bg-neutral-900"}`}>OTP</button>
          <button onClick={() => setMode("password")} className={`px-3 py-1 rounded-md border ${mode === "password" ? "border-orange-600 text-orange-400" : "border-transparent bg-neutral-900"}`}>Password</button>
          <div className="ml-auto text-xs text-gray-400">No account? <Link href="/register" className="text-orange-400">Register</Link></div>
        </div>

        <label className="block text-sm mb-1">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 rounded-md bg-neutral-900 border border-orange-900 px-3 py-2" placeholder="you@example.com" />

        {mode === "password" ? (
          <>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-3 rounded-md bg-neutral-900 border border-orange-900 px-3 py-2" />
            <button disabled={loading} onClick={loginPassword} className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-md py-2">
              {loading ? "…" : "Login"}
            </button>
          </>
        ) : (
          <>
            <div className="flex gap-2 mb-3">
              <button disabled={loading || !email} onClick={requestOtp} className="flex-1 border border-orange-700 text-orange-400 rounded-md py-2">Send OTP</button>
              <input value={code} onChange={(e) => setCode(e.target.value)} className="w-24 rounded-md bg-neutral-900 border border-orange-900 px-3 py-2" placeholder="123456" />
            </div>
            <button disabled={loading || !code} onClick={verifyOtp} className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-md py-2">
              {loading ? "…" : "Verify & Login"}
            </button>
          </>
        )}

        {msg && <div className="mt-3 text-sm text-gray-300">{msg}</div>}
      </div>
    </main>
  )
}
