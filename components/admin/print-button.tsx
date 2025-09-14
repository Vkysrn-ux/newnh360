"use client"

import { Button } from "@/components/ui/button"

export default function PrintButton() {
  return (
    <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={() => window.print()}>
      Print
    </Button>
  )
}

