// Edge-safe token verify using Web Crypto API
const AUTH_SECRET = (process.env.AUTH_SECRET || "dev-secret-change-me").trim()

const textEncoder = new TextEncoder()

function b64urlToUint8(b64url: string): Uint8Array {
  const pad = "=".repeat((4 - (b64url.length % 4 || 4)) % 4)
  const base64 = b64url.replace(/-/g, "+").replace(/_/g, "/") + pad
  const raw = atob(base64)
  const out = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i)
  return out
}

export async function verifyTokenEdge(token: string): Promise<any | null> {
  try {
    const [h, p, s] = token.split(".")
    if (!h || !p || !s) return null
    const key = await crypto.subtle.importKey(
      "raw",
      textEncoder.encode(AUTH_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    )
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlToUint8(s),
      textEncoder.encode(`${h}.${p}`)
    )
    if (!ok) return null
    const payload = JSON.parse(new TextDecoder().decode(b64urlToUint8(p)))
    if (payload.exp && Date.now() / 1000 > payload.exp) return null
    return payload
  } catch {
    return null
  }
}

