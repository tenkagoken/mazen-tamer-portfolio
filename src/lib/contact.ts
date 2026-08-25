import { profile } from '../data/portfolio'

export function buildMailtoUrl(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)
  return `mailto:${profile.email}?subject=${subject}&body=${body}`
}
