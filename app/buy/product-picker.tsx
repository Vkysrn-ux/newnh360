"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LeadForm from "./lead-form"

type Issuer = "SBI" | "IDFC" | "BAJAJ" | "AIRTEL"

const ISSUERS: Issuer[] = ["SBI", "IDFC", "BAJAJ", "AIRTEL"]
const VEHICLE_CLASSES = [4, 5, 6, 7, 8, 9, 10, 12]

export default function FastagProductPicker() {
  const [issuer, setIssuer] = useState<Issuer | null>(null)
  const [vehicleClass, setVehicleClass] = useState<number | null>(null)

  const resetClass = (i: Issuer) => {
    setIssuer(i)
    setVehicleClass(null)
  }

  const selectedProduct = issuer && vehicleClass ? `${issuer} FASTag (Class ${vehicleClass})` : null

  return (
    <div className="space-y-6">
      <Card className="border-orange-900 bg-neutral-900">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Choose Issuer</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ISSUERS.map((i) => (
                <button
                  key={i}
                  onClick={() => resetClass(i)}
                  className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    issuer === i
                      ? "border-orange-700 bg-black text-white"
                      : "border-orange-900 bg-neutral-950 text-gray-300 hover:bg-neutral-900"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-400">Vehicle Class</div>
            <div className="flex flex-wrap gap-2">
              {VEHICLE_CLASSES.map((c) => (
                <button
                  key={c}
                  disabled={!issuer}
                  onClick={() => setVehicleClass(c)}
                  className={`rounded-full px-3 py-1.5 text-xs border transition-colors disabled:opacity-50 ${
                    vehicleClass === c
                      ? "border-orange-700 bg-orange-600/10 text-orange-300"
                      : "border-orange-900 bg-neutral-950 text-gray-300 hover:bg-neutral-900"
                  }`}
                >
                  Class {c}
                </button>
              ))}
            </div>
          </div>

          {!selectedProduct && (
            <div className="text-xs text-gray-400">Select issuer and class to proceed.</div>
          )}
        </CardContent>
      </Card>

      {selectedProduct && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300">Selected Product</div>
            <Button variant="outline" className="border-orange-700 text-orange-400 hover:bg-orange-900/30" onClick={() => setVehicleClass(null)}>
              Change
            </Button>
          </div>
          <Card className="border-orange-900 bg-neutral-900">
            <CardContent className="p-4 text-white font-semibold">{selectedProduct}</CardContent>
          </Card>

          {/* Lead capture with selected product */}
          <LeadForm product={selectedProduct} />
        </div>
      )}
    </div>
  )
}

