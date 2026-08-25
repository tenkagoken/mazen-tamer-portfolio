import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { profile } from '../data/portfolio'
import { Contact } from './Contact'

describe('Contact', () => {
  it('offers direct email, LinkedIn, résumé, and copy actions', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText')

    render(<Contact />)

    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', `mailto:${profile.email}`)
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', profile.linkedinUrl)
    expect(screen.getByRole('link', { name: /résumé/i })).toHaveAttribute('href', '/Mazen-Eladawy-Resume.pdf')

    await user.click(screen.getByRole('button', { name: /copy email/i }))
    expect(writeText).toHaveBeenCalledWith(profile.email)
    expect(screen.getByText('Copied to clipboard')).toBeInTheDocument()
  })

  it('reveals and selects the email when clipboard access is unavailable', async () => {
    const user = userEvent.setup()
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined })
    render(<Contact />)

    await user.click(screen.getByRole('button', { name: /copy email/i }))
    const input = screen.getByRole('textbox', { name: /copy manually/i }) as HTMLInputElement
    expect(input).toHaveFocus()
    expect(input).toHaveValue(profile.email)
    expect(input.selectionStart).toBe(0)
    expect(input.selectionEnd).toBe(profile.email.length)
  })
})
