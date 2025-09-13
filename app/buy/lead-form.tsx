"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LeadForm({ product }: { product: string }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [regNo, setRegNo] = useState("")
  const [place, setPlace] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const normalizePhone = (v: string) => v.replace(/\D/g, "").slice(0, 10)
  const isValidPhone = (v: string) => /^([6-9][0-9]{9})$/.test(v)

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, place, vehicleRegNo: regNo, product }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || "Failed")
      }
      setDone(true)
    } catch (e: any) {
      setError(e.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="border-orange-900 bg-neutral-900">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Get Started</h2>
        {done ? (
          <div className="text-green-400">Thank you! Our team will contact you shortly.</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-3">
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(normalizePhone(e.target.value))}
                aria-invalid={phone.length > 0 && !isValidPhone(phone)}
              />
            </div>
            {phone.length > 0 && !isValidPhone(phone) && (
              <div className="text-xs text-red-400">Enter a valid 10-digit mobile number starting with 6–9.</div>
            )}
            <div className="grid md:grid-cols-2 gap-3">
              <Input placeholder="Vehicle registration number" value={regNo} onChange={(e) => setRegNo(e.target.value.toUpperCase())} />
              <Input placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} />
            </div>
            {error && <div className="text-sm text-red-400">{error}</div>}
            <Button
              className="bg-orange-600 hover:bg-orange-700 text-white w-full"
              onClick={submit}
              disabled={submitting || !name || !isValidPhone(phone)}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
