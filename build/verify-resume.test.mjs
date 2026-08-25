import { createHash } from 'node:crypto'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { verifyResume } from './verify-resume.mjs'

const temporaryRoots = []

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true })
})

function fixture(overrides = {}) {
  const root = mkdtempSync(join(tmpdir(), 'resume-verifier-'))
  temporaryRoots.push(root)
  mkdirSync(join(root, 'public'), { recursive: true })
  mkdirSync(join(root, 'artifacts', 'qa'), { recursive: true })
  const bytes = Buffer.from('approved resume bytes')
  writeFileSync(join(root, 'public', 'Mazen-Eladawy-Resume.pdf'), bytes)
  const record = {
    path: 'public/Mazen-Eladawy-Resume.pdf',
    sha256: createHash('sha256').update(bytes).digest('hex'),
    reviewedAt: '2026-08-25T20:58:18+03:00',
    structuralPassed: true,
    visualPassed: true,
    ...overrides,
  }
  writeFileSync(join(root, 'artifacts', 'qa', 'resume-verification.json'), JSON.stringify(record))
  return root
}

describe('resume hash gate', () => {
  it('accepts approved bytes and a complete audit record', () => {
    expect(verifyResume({ root: fixture() }).path).toBe('public/Mazen-Eladawy-Resume.pdf')
  })

  it('rejects a missing record', () => {
    const root = fixture()
    rmSync(join(root, 'artifacts', 'qa', 'resume-verification.json'))
    expect(() => verifyResume({ root })).toThrow(/missing approval record/)
  })

  it.each([
    [{ structuralPassed: false }, /structuralPassed/],
    [{ visualPassed: false }, /visualPassed/],
    [{ sha256: 'invalid' }, /lowercase SHA-256/],
    [{ reviewedAt: 'not-a-date' }, /ISO date/],
  ])('rejects malformed or unapproved records', (overrides, expected) => {
    expect(() => verifyResume({ root: fixture(overrides) })).toThrow(expected)
  })

  it('rejects changed PDF bytes', () => {
    const root = fixture()
    writeFileSync(join(root, 'public', 'Mazen-Eladawy-Resume.pdf'), 'changed bytes')
    expect(() => verifyResume({ root })).toThrow(/hash mismatch/)
  })
})
