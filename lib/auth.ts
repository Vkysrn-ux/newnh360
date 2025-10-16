import crypto from "node:crypto"

// Simple base64url helpers
const b64url = (buf: Buffer) => buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
const b64urlStr = (s: string) => b64url(Buffer.from(s))

const AUTH_SECRET = (process.env.AUTH_SECRET || "dev-secret-change-me").trim()

// Password hashing with scrypt (no external deps)
export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16)
  const hash = crypto.scryptSync(password, salt, 64)
  return `scrypt$1$${b64url(salt)}$${b64url(hash)}`
}

export function verifyPassword(password: string, stored: string) {
  try {
    const [alg, v, saltB64, hashB64] = stored.split("$")
    if (alg !== "scrypt") return false
    const salt = Buffer.from(saltB64.replace(/-/g, "+").replace(/_/g, "/"), "base64")
    const expected = Buffer.from(hashB64.replace(/-/g, "+").replace(/_/g, "/"), "base64")
    const actual = crypto.scryptSync(password, salt, expected.length)
    return crypto.timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

// OTP helpers (store hash, not raw code)
export function generateOtp() {
  const code = String(Math.floor(100000 + Math.random() * 900000)) // 6 digits
  const salt = crypto.randomBytes(16)
  const hash = crypto.createHmac("sha256", salt).update(code).digest()
  return { code, salt: b64url(salt), hash: b64url(hash) }
}

export function verifyOtp(code: string, saltB64: string, hashB64: string) {
  try {
    const salt = Buffer.from(saltB64.replace(/-/g, "+").replace(/_/g, "/"), "base64")
    const expected = Buffer.from(hashB64.replace(/-/g, "+").replace(/_/g, "/"), "base64")
    const actual = crypto.createHmac("sha256", salt).update(code).digest()
    return crypto.timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

// Minimal JWT (HMAC-SHA256) without external deps
export function signToken(payload: Record<string, any>, expiresInSec = 60 * 60 * 24 * 7) {
  const header = { alg: "HS256", typ: "JWT" }
  const exp = Math.floor(Date.now() / 1000) + expiresInSec
  const body = { ...payload, exp }
  const h = b64urlStr(JSON.stringify(header))
  const p = b64urlStr(JSON.stringify(body))
  const sig = crypto.createHmac("sha256", AUTH_SECRET).update(`${h}.${p}`).digest()
  return `${h}.${p}.${b64url(sig)}`
}

export function verifyToken(token: string): null | any {
  try {
    const [h, p, s] = token.split(".")
    if (!h || !p || !s) return null
    const sig = crypto.createHmac("sha256", AUTH_SECRET).update(`${h}.${p}`).digest()
    const good = b64url(sig) === s
    if (!good) return null
    const payload = JSON.parse(Buffer.from(p, "base64").toString("utf8"))
    if (payload.exp && Date.now() / 1000 > payload.exp) return null
    return payload
  } catch {
    return null
  }
}

export function normalizePhone(input?: string) {
  const digits = String(input || "").replace(/\D/g, "")
  if (!digits) return null
  const last10 = digits.slice(-10)
  if (!/^[6-9][0-9]{9}$/.test(last10)) return null
  return last10
}

