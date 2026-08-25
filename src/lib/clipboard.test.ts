import { describe, expect, it, vi } from 'vitest'
import { writeEmailToClipboard } from './clipboard'

describe('writeEmailToClipboard', () => {
  it('reports success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    await expect(writeEmailToClipboard('hello@example.com', { writeText })).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('hello@example.com')
  })

  it('recovers from unsupported and browser-denied clipboard access', async () => {
    await expect(writeEmailToClipboard('hello@example.com', undefined)).resolves.toBe(false)
    const writeText = vi.fn().mockRejectedValue(new DOMException('Denied', 'NotAllowedError'))
    await expect(writeEmailToClipboard('hello@example.com', { writeText })).resolves.toBe(false)
  })

  it('keeps unexpected failures loud', async () => {
    const failure = new Error('unexpected')
    const writeText = vi.fn().mockRejectedValue(failure)
    await expect(writeEmailToClipboard('hello@example.com', { writeText })).rejects.toBe(failure)
  })
})
