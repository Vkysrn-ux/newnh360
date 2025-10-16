"use client"
import { useState } from "react"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const register = async () => {
    setLoading(true)
    setMsg(null)
    try {
      const r = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, password: password || undefined }) })
      const j = await r.json()
      setMsg(j.message || (r.ok ? "Registered" : "Failed"))
      if (r.ok) window.location.href = "/login"
    } finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-black text-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-orange-900 bg-neutral-950 p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Create account</h1>
        <div className="text-xs text-gray-400 mb-4">You can set a password now, or leave it empty and login with OTP later.</div>
        <label className="block text-sm mb-1">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-3 rounded-md bg-neutral-900 border border-orange-900 px-3 py-2" placeholder="Your name" />
        <label className="block text-sm mb-1">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 rounded-md bg-neutral-900 border border-orange-900 px-3 py-2" placeholder="you@example.com" />
        <label className="block text-sm mb-1">Phone (optional)</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mb-3 rounded-md bg-neutral-900 border border-orange-900 px-3 py-2" placeholder="10-digit" />
        <label className="block text-sm mb-1">Password (optional)</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 rounded-md bg-neutral-900 border border-orange-900 px-3 py-2" placeholder="Set a password or leave blank" />
        <button disabled={loading} onClick={register} className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-md py-2">{loading ? "…" : "Register"}</button>
        <div className="mt-3 text-xs text-gray-400">Already have an account? <Link href="/login" className="text-orange-400">Login</Link></div>
        {msg && <div className="mt-3 text-sm text-gray-300">{msg}</div>}
      </div>
    </main>
  )
}

