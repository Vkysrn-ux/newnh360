"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type LeadPayload = {
  name: string
  phone: string
  city?: string
  vehicleType?: string
  product?: string
  notes?: string
}

export function FastagLeadModal({
  open,
  onClose,
  product,
}: {
  open: boolean
  onClose: () => void
  product?: { id: number; name: string }
}) {
  const [form, setForm] = useState<LeadPayload>({
    name: "",
    phone: "",
    city: "",
    vehicleType: "",
    product: product?.name || "",
    notes: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const update = (k: keyof LeadPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product: form.product || product?.name }),
      })
      if (!res.ok) throw new Error("Failed to submit lead")
      setSubmitted(true)
    } catch (e: any) {
      setError(e.message || "Submission failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Enquire about FASTag</h3>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>

          {submitted ? (
            <div className="space-y-3">
              <p className="text-green-700">Thanks! Our team will contact you shortly.</p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={onClose}>
                Done
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">City</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="City" value={form.city} onChange={update("city")} />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Vehicle Type</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="Car / LCV / Truck / Bus"
                    value={form.vehicleType}
                    onChange={update("vehicleType")}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Product</label>
                <input className="w-full border rounded px-3 py-2" placeholder="FASTag type" value={form.product} onChange={update("product")} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Notes</label>
                <textarea className="w-full border rounded px-3 py-2" placeholder="Any details" value={form.notes} onChange={update("notes")} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={onClose} disabled={submitting}>
                  Cancel
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={submit} disabled={submitting}>
                  {submitting ? "Sending..." : "Submit"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

