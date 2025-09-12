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

  const submit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, place, vehicleRegNo: regNo, product }),
      })
      if (!res.ok) throw new Error("Failed")
      setDone(true)
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
              <Input placeholder="Mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Input placeholder="Vehicle registration number" value={regNo} onChange={(e) => setRegNo(e.target.value.toUpperCase())} />
              <Input placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} />
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full" onClick={submit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
