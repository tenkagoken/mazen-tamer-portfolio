import { describe, expect, it } from 'vitest'
import { siteConfig } from './site'

describe('known GitHub Pages target', () => {
  it('keeps repository base and canonical URL aligned', () => {
    expect(Object.isFrozen(siteConfig)).toBe(true)
    expect(siteConfig.base).toBe(`/${siteConfig.repository}/`)
    expect(siteConfig.canonicalUrl).toBe(`https://${siteConfig.owner}.github.io${siteConfig.base}`)
  })
})
