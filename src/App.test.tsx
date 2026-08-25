import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('candidate portfolio', () => {
  it('renders the recruiter flow in the approved order without excluded work', () => {
    const { container } = render(<App />)
    const sectionIds = Array.from(container.querySelectorAll('main > section')).map((section) => section.id)
    expect(sectionIds).toEqual(['home', 'projects', 'about', 'skills', 'journey', 'contact'])

    const copy = container.textContent?.toLowerCase() ?? ''
    expect(copy).not.toContain('knights')
    expect(copy).not.toContain('lebaladna')
    expect(copy).not.toContain('survey helper')
  })
})
