import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const workflow = readFileSync(resolve(process.cwd(), '.github/workflows/deploy.yml'), 'utf8')

describe('GitHub Pages deployment contract', () => {
  it('is manual-only and uploads only the verified dist directory', () => {
    expect(workflow).toMatch(/on:\s*\n\s+workflow_dispatch:/)
    expect(workflow).not.toMatch(/\bpush:/)
    expect(workflow).not.toMatch(/\bpull_request:/)
    expect(workflow).toMatch(/path: dist/)
    expect(workflow).toMatch(/npm run lint/)
    expect(workflow).toMatch(/npm test/)
    expect(workflow).toMatch(/npm run build/)
    expect(workflow).toMatch(/npm run test:e2e/)
  })

  it('pins every GitHub Action to a full commit SHA', () => {
    const uses = [...workflow.matchAll(/^\s*uses:\s*([^\s#]+)/gm)].map((match) => match[1])
    expect(uses.length).toBeGreaterThanOrEqual(5)
    for (const action of uses) expect(action).toMatch(/^[^@]+@[0-9a-f]{40}$/)
  })
})
