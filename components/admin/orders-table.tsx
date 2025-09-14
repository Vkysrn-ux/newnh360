"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Order = {
  id: number
  orderId: string
  customerName: string
  customerEmail: string
  phone?: string
  totalAmount: number
  status: string
  shipping_provider?: string
  orderDate?: string
}

export default function AdminOrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter()
  const [busyId, setBusyId] = useState<number | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [data, setData] = useState<any[]>(orders || [])
  const [selectedId, setSelectedId] = useState<number | null>(data[0]?.id ?? null)
  const [detail, setDetail] = useState<any | null>(null)

  // Load full orders with items for richer columns
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/orders', { cache: 'no-store' })
        if (!res.ok) return
        const json = await res.json()
        if (mounted) setData(Array.isArray(json) ? json : [])
      } catch {}
    })()
    return () => {
      mounted = false
    }
  }, [])

  // Load detail when selection changes
  useEffect(() => {
    if (!selectedId) return setDetail(null)
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/orders/${selectedId}`, { cache: 'no-store' })
        const json = await res.json()
        if (mounted) setDetail(res.ok ? json : null)
      } catch {
        if (mounted) setDetail(null)
      }
    })()
    return () => {
      mounted = false
    }
  }, [selectedId])

  const update = async (id: number, newStatus?: string, provider?: string) => {
    setBusyId(id)
    setErr(null)
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newStatus, provider }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Failed to update')
      router.refresh()
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="overflow-hidden rounded-lg border border-orange-900/60">
        {err && <div className="p-2 text-sm text-red-400">{err}</div>}
        <Table className="text-gray-200">
          <TableHeader>
            <TableRow className="bg-black/40">
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Order ID</TableHead>
              <TableHead className="text-gray-400">Customer</TableHead>
              <TableHead className="text-gray-400">Phone</TableHead>
              <TableHead className="text-gray-400">Qty</TableHead>
              <TableHead className="text-gray-400">Products</TableHead>
              <TableHead className="text-gray-400">Total</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Shipping</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell className="text-gray-400" colSpan={8}>No orders yet.</TableCell>
            </TableRow>
          ) : (
            data.map((o) => {
              const items = (o as any).items || []
              const qty = items.reduce((n: number, it: any) => n + (Number(it.quantity) || 0), 0)
              const names = items.map((it: any) => it.name).filter(Boolean).slice(0, 3).join(', ')
              return (
              <TableRow key={o.id} className={selectedId === o.id ? 'bg-black/30' : ''} onClick={() => setSelectedId(o.id)}>
                <TableCell className="text-gray-300">{o.orderDate ? new Date(o.orderDate).toLocaleString() : '—'}</TableCell>
                <TableCell className="text-gray-300 font-mono">{o.orderId}</TableCell>
                <TableCell className="text-gray-300">{o.customerName}</TableCell>
                <TableCell className="text-gray-300">{o.phone || '—'}</TableCell>
                <TableCell className="text-gray-300">{qty || '—'}</TableCell>
                <TableCell className="text-gray-300 truncate max-w-[200px]" title={names}>{names || '—'}</TableCell>
                <TableCell className="text-gray-300">₹{(o.totalAmount || 0).toLocaleString()}</TableCell>
                <TableCell>
                  <select
                    defaultValue={o.status || 'new'}
                    className="bg-neutral-950 border border-orange-900 rounded px-2 py-1 text-sm"
                    onChange={(e) => update(o.id, e.target.value, undefined)}
                    disabled={busyId === o.id}
                  >
                    <option value="new">New</option>
                    <option value="processing">Processing</option>
                    <option value="packed">Packed</option>
                    <option value="transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </TableCell>
                <TableCell>
                  <select
                    defaultValue={o.shipping_provider || 'unassigned'}
                    className="bg-neutral-950 border border-orange-900 rounded px-2 py-1 text-sm"
                    onChange={(e) => update(o.id, undefined, e.target.value)}
                    disabled={busyId === o.id}
                  >
                    <option value="unassigned">Unassigned</option>
                    <option value="shiprocket">Shiprocket</option>
                    <option value="delhivery">Delhivery</option>
                    <option value="self">Self</option>
                  </select>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-orange-700 text-orange-400 hover:bg-orange-900/30"
                    onClick={() => update(o.id, 'processing', o.shipping_provider)}
                    disabled={busyId === o.id}
                  >
                    {busyId === o.id ? 'Saving…' : 'Save'}
                  </Button>
                </TableCell>
              </TableRow>)
            })
          )}
          </TableBody>
        </Table>
      </div>

      {/* Detail side panel */}
      <div className="rounded-lg border border-orange-900 bg-neutral-900 p-4 text-gray-200">
        {!detail ? (
          <div className="text-gray-400">Select an order to view details.</div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold">Order #{detail.orderId}</div>
              <div className="text-sm text-gray-400">{detail.orderDate ? new Date(detail.orderDate).toLocaleString() : '—'}</div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-gray-400">Customer</div>
                <div className="text-white">{detail.customerName}</div>
                <div className="text-gray-400">Email</div>
                <div className="text-white">{detail.customerEmail}</div>
                <div className="text-gray-400">Phone</div>
                <div className="text-white">{detail.phone || '—'}</div>
              </div>
              <div>
                <div className="text-gray-400">Payment</div>
                <div className="text-white">{detail.payment_method === 'COD' ? 'COD' : 'Paid'}</div>
                <div className="text-gray-400">Status</div>
                <div className="text-white capitalize">{detail.status}</div>
                <div className="text-gray-400">Shipping</div>
                <div className="text-white capitalize">{detail.shipping_provider || 'unassigned'}</div>
                <div className="text-gray-400">Total</div>
                <div className="text-white">₹{(detail.totalAmount || 0).toLocaleString()}</div>
              </div>
            </div>
            <div>
              <div className="text-gray-400">Address</div>
              <div className="text-white text-sm">{detail.address}, {detail.city}, {detail.state} - {detail.pincode}</div>
            </div>
            <div>
              <div className="text-white font-semibold">Items</div>
              <div className="divide-y divide-orange-900/60 mt-1">
                {(detail.items || []).map((it: any) => (
                  <div key={it.id} className="py-2 flex items-center justify-between text-sm">
                    <div className="text-white">{it.name}</div>
                    <div className="text-gray-400">Qty: {it.quantity}</div>
                    <div className="text-white">₹{(it.price || 0).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
            {detail.shipping_provider === 'shiprocket' && (
              <div className="pt-2 border-t border-orange-900/60">
                <div className="text-white font-semibold mb-2">Shiprocket</div>
                {detail.shipping_shipment_id ? (
                  <div className="text-sm space-y-1">
                    <div className="text-gray-400">Shipment ID</div>
                    <div className="text-white">{detail.shipping_shipment_id}</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center px-3 py-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm"
                      onClick={async () => {
                        try {
                          const res = await fetch('/api/orders/shiprocket', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: detail.id }) })
                          const j = await res.json()
                          if (res.ok) {
                            const url = `/api/orders/${detail.id}`
                            const r2 = await fetch(url, { cache: 'no-store' })
                            const d2 = await r2.json()
                            setDetail(r2.ok ? d2 : detail)
                          } else {
                            alert(j?.error || 'Failed to create on Shiprocket')
                          }
                        } catch (e: any) {
                          alert(e.message || 'Failed')
                        }
                      }}
                    >
                      Create Shipment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
