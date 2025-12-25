import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

type ContactPayload = {
  name: string
  email: string
  subject?: string
  message: string
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

function validatePayload(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Невалидни данни.' }
  const b = body as Record<string, unknown>

  const name = typeof b.name === 'string' ? b.name.trim() : ''
  const email = typeof b.email === 'string' ? b.email.trim() : ''
  const subject = typeof b.subject === 'string' ? b.subject.trim() : ''
  const message = typeof b.message === 'string' ? b.message.trim() : ''

  if (!name || name.length < 2) return { ok: false, error: 'Моля, въведете име.' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Моля, въведете валиден имейл.' }
  if (!message || message.length < 10) return { ok: false, error: 'Моля, въведете съобщение (минимум 10 символа).' }

  return { ok: true, data: { name, email, subject, message } }
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    const validated = validatePayload(json)
    if (!validated.ok) {
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


