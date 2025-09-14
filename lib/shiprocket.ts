// lib/shiprocket.ts
export type ShiprocketAuth = { token: string }

const BASE = process.env.SHIPROCKET_BASE_URL || "https://apiv2.shiprocket.in/v1/external"

async function login(): Promise<ShiprocketAuth> {
  const email = process.env.SHIPROCKET_EMAIL
  const password = process.env.SHIPROCKET_PASSWORD
  if (!email || !password) throw new Error("SHIPROCKET_EMAIL or SHIPROCKET_PASSWORD not set")
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  })
  const data = await res.json()
  if (!res.ok || !data?.token) {
    throw new Error(data?.message || "Shiprocket login failed")
  }
  return { token: data.token as string }
}

export type CreateOrderParams = {
  order_id: string
  order_date: string
  billing_customer_name: string
  billing_last_name?: string
  billing_address: string
  billing_city: string
  billing_pincode: string
  billing_state: string
  billing_country?: string
  billing_email: string
  billing_phone: string
  order_items: Array<{ name: string; sku?: string; units: number; selling_price: number }>
  payment_method: "Prepaid" | "COD"
  sub_total: number
  length?: number
  breadth?: number
  height?: number
  weight?: number
  pickup_location?: string
}

async function createOrder(params: CreateOrderParams) {
  const { token } = await login()
  const payload = {
    ...params,
    shipping_is_billing: true,
    billing_country: params.billing_country || "India",
    pickup_location: params.pickup_location || process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",
  }
  const res = await fetch(`${BASE}/orders/create/adhoc`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
    cache: "no-store",
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.message || "Shiprocket order create failed")
  }
  return data
}

export const Shiprocket = { login, createOrder }

