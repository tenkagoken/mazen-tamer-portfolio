import { describe, expect, it } from 'vitest'
import { buildMailtoUrl } from '../lib/contact'
import { profile } from '../data/portfolio'

describe('buildMailtoUrl', () => {
  it('round-trips Unicode and reserved characters without breaking query parameters', () => {
    const name = 'Mazen & أحمد'
    const email = 'user+portfolio@example.com'
    const message = 'Line 1?\nLine 2 & more'
    const url = buildMailtoUrl(name, email, message)
    const query = new URL(url).searchParams

    expect(url.startsWith(`mailto:${profile.email}?`)).toBe(true)
    expect(query.get('subject')).toBe(`Portfolio enquiry from ${name}`)
    expect(query.get('body')).toBe(`${message}\n\nFrom: ${name} (${email})`)
  })
})
