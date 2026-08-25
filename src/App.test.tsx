import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('candidate portfolio', () => {
  it('renders the recruiter flow with the engineering path merged into About', () => {
    const { container } = render(<App />)
    const sectionIds = Array.from(container.querySelectorAll('main > section')).map((section) => section.id)
    expect(sectionIds).toEqual(['home', 'projects', 'about', 'skills', 'contact'])

    const copy = container.textContent?.toLowerCase() ?? ''
    expect(copy).not.toContain('knights')
    expect(copy).toContain('lebaladna survey helper')
    expect(copy).toContain('survey workflows & analytics')
    expect(container.querySelector('#journey')).toBeNull()
  })
})
