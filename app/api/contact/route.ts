import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

type ContactPayload = {
  name: string
  email: string
  subject?: string
  message: string
  // Anti-spam fields
  _hp?: string      // Honeypot - should be empty
  _ts?: number      // Timestamp when form was rendered
}

// Simple in-memory rate limiting (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000  // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3       // Max 3 requests per minute per IP

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  rateLimitMap.forEach((timestamps, ip) => {
    const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
    if (valid.length === 0) {
      rateLimitMap.delete(ip)
    } else {
      rateLimitMap.set(ip, valid)
    }
  })
}, 5 * 60 * 1000)

function getClientIP(req: Request): string {
  // Check common headers for real IP (behind proxies/CDN)
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIP = req.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }
  return 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  
  // Filter to only recent timestamps
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  
  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false // Rate limited
  }
  
  // Add current request timestamp
  recentTimestamps.push(now)
  rateLimitMap.set(ip, recentTimestamps)
  return true
}

function getRequiredEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing environment variable: ${name}`)
  return v
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

// Spam content detection
function detectSpam(payload: ContactPayload): { isSpam: boolean; reason?: string } {
  const { name, email, message, subject } = payload
  const fullText = `${name} ${email} ${subject || ''} ${message}`.toLowerCase()
  
  // 1. Count URLs in message (more than 3 is suspicious)
  const urlPattern = /https?:\/\/|www\./gi
  const urlCount = (message.match(urlPattern) || []).length
  if (urlCount > 3) {
    return { isSpam: true, reason: 'too_many_urls' }
  }
  
  // 2. Check for common spam keywords (case insensitive)
  const spamKeywords = [
    'cryptocurrency', 'crypto trading', 'bitcoin investment',
    'casino', 'gambling', 'poker online',
    'viagra', 'cialis', 'pharmacy',
    'seo service', 'backlink', 'link building',
    'make money fast', 'earn money online', 'get rich',
    'nigerian prince', 'inheritance', 'lottery winner',
    'click here now', 'act now', 'limited time offer',
    'weight loss', 'diet pill',
    'adult content', 'xxx', 'dating site',
  ]
  
  const spamKeywordFound = spamKeywords.some(keyword => fullText.includes(keyword))
  if (spamKeywordFound) {
    return { isSpam: true, reason: 'spam_keywords' }
  }
  
  // 3. Check for excessive capitalization (shouting)
  const upperCount = (message.match(/[A-Z]/g) || []).length
  const letterCount = (message.match(/[a-zA-Z]/g) || []).length
  if (letterCount > 20 && upperCount / letterCount > 0.7) {
    return { isSpam: true, reason: 'excessive_caps' }
  }
  
  // 4. Check for repeated characters (e.g., "aaaaaaa")
  if (/(.)\1{6,}/.test(message)) {
    return { isSpam: true, reason: 'repeated_chars' }
  }
  
  // 5. Check email domain for known spam domains
  const emailDomain = email.split('@')[1]?.toLowerCase()
  const suspiciousDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com']
  if (emailDomain && suspiciousDomains.some(d => emailDomain.includes(d))) {
    return { isSpam: true, reason: 'suspicious_email_domain' }
  }
  
  return { isSpam: false }
}

function validatePayload(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string; isSpam?: boolean } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Невалидни данни.' }
  const b = body as Record<string, unknown>

  const name = typeof b.name === 'string' ? b.name.trim() : ''
  const email = typeof b.email === 'string' ? b.email.trim() : ''
  const subject = typeof b.subject === 'string' ? b.subject.trim() : ''
  const message = typeof b.message === 'string' ? b.message.trim() : ''
  
  // Anti-spam fields
  const honeypot = typeof b._hp === 'string' ? b._hp : ''
  const timestamp = typeof b._ts === 'number' ? b._ts : 0
  
  // 1. Honeypot check - if filled, it's a bot
  if (honeypot) {
    console.log('[contact] Honeypot triggered')
    return { ok: false, error: 'Невалидна заявка.', isSpam: true }
  }
  
  // 2. Timing check - form submitted too fast (< 3 seconds)
  const MIN_SUBMIT_TIME_MS = 3000
  const submitTime = Date.now() - timestamp
  if (timestamp > 0 && submitTime < MIN_SUBMIT_TIME_MS) {
    console.log(`[contact] Form submitted too fast: ${submitTime}ms`)
    return { ok: false, error: 'Моля, изчакайте преди да изпратите формата.', isSpam: true }
  }
  
  // 3. Timing check - timestamp too old (> 1 hour = likely replay attack)
  const MAX_FORM_AGE_MS = 60 * 60 * 1000 // 1 hour
  if (timestamp > 0 && submitTime > MAX_FORM_AGE_MS) {
    console.log('[contact] Form timestamp too old')
    return { ok: false, error: 'Сесията е изтекла. Моля, презаредете страницата.' }
  }

  // Standard validation
  if (!name || name.length < 2) return { ok: false, error: 'Моля, въведете име.' }
  if (name.length > 100) return { ok: false, error: 'Името е твърде дълго.' }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Моля, въведете валиден имейл.' }
  if (email.length > 254) return { ok: false, error: 'Имейлът е твърде дълъг.' }
  
  if (subject && subject.length > 200) return { ok: false, error: 'Темата е твърде дълга.' }
  
  if (!message || message.length < 10) return { ok: false, error: 'Моля, въведете съобщение (минимум 10 символа).' }
  if (message.length > 5000) return { ok: false, error: 'Съобщението е твърде дълго (максимум 5000 символа).' }

  const payload: ContactPayload = { name, email, subject, message }
  
  // 4. Spam content detection
  const spamCheck = detectSpam(payload)
  if (spamCheck.isSpam) {
    console.log(`[contact] Spam detected: ${spamCheck.reason}`)
    return { ok: false, error: 'Съобщението е маркирано като спам.', isSpam: true }
  }

  return { ok: true, data: payload }
}

export async function POST(req: Request) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(req)
    if (!checkRateLimit(clientIP)) {
      console.log(`[contact] Rate limited: ${clientIP}`)
      return Response.json(
        { ok: false, error: 'Твърде много заявки. Моля, изчакайте минута.' },
        { status: 429 }
      )
    }
    
    const json = await req.json().catch(() => null)
    const validated = validatePayload(json)
    if (!validated.ok) {
      // For spam requests, still return 200 to not reveal detection
      if (validated.isSpam) {
        console.log('[contact] Spam request blocked')
        // Silently "succeed" to not alert bots
        return Response.json({ ok: true })
      }
      return Response.json({ ok: false, error: validated.error }, { status: 400 })
    }

    const SMTP_HOST = getRequiredEnv('SMTP_HOST')
    const SMTP_PORT = Number(getRequiredEnv('SMTP_PORT'))
    const SMTP_SECURE = (process.env.SMTP_SECURE ?? 'true').toLowerCase() === 'true'
    const SMTP_USER = getRequiredEnv('SMTP_USER')
    const SMTP_PASS = getRequiredEnv('SMTP_PASS')

    const CONTACT_TO = getRequiredEnv('CONTACT_TO')
    const CONTACT_FROM = process.env.CONTACT_FROM || SMTP_USER

    const { name, email, subject, message } = validated.data

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const safeSubject = subject ? `${subject} (Контакт форма)` : 'Ново съобщение от контакт форма'
    const text = [
      `Име: ${name}`,
      `Имейл: ${email}`,
      subject ? `Тема: ${subject}` : null,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
        <h2>Ново съобщение от контакт форма</h2>
        <p><strong>Име:</strong> ${escapeHtml(name)}</p>
        <p><strong>Имейл:</strong> ${escapeHtml(email)}</p>
        ${subject ? `<p><strong>Тема:</strong> ${escapeHtml(subject)}</p>` : ''}
        <hr />
        <pre style="white-space:pre-wrap;line-height:1.4">${escapeHtml(message)}</pre>
      </div>
    `

    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: safeSubject,
      text,
      html,
    })

    return Response.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[contact] send failed:', message)
    return Response.json(
      { ok: false, error: 'Не успяхме да изпратим съобщението. Моля, опитайте отново.' },
      { status: 500 },
    )
  }
}
