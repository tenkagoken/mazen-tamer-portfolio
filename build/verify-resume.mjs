import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const APPROVED_PATH = 'public/Mazen-Eladawy-Resume.pdf'

function fail(message) {
  throw new Error(`Resume verification failed: ${message}`)
}

export function verifyResume({
  root = process.cwd(),
  pdfPath = resolve(root, APPROVED_PATH),
  recordPath = resolve(root, 'artifacts/qa/resume-verification.json'),
} = {}) {
  if (!existsSync(pdfPath)) fail(`missing PDF at ${pdfPath}`)
  if (!existsSync(recordPath)) fail(`missing approval record at ${recordPath}`)

  let record
  try {
    record = JSON.parse(readFileSync(recordPath, 'utf8'))
  } catch (error) {
    fail(`approval record is not valid JSON (${error instanceof Error ? error.message : String(error)})`)
  }

  if (!record || typeof record !== 'object') fail('approval record must be a JSON object')
  if (record.path !== APPROVED_PATH) fail(`record.path must equal ${APPROVED_PATH}`)
  if (!/^[0-9a-f]{64}$/.test(record.sha256 ?? '')) fail('record.sha256 must be a lowercase SHA-256')
  if (typeof record.reviewedAt !== 'string' || Number.isNaN(Date.parse(record.reviewedAt))) fail('record.reviewedAt must be an ISO date')
  if (record.structuralPassed !== true) fail('structuralPassed must be true')
  if (record.visualPassed !== true) fail('visualPassed must be true')

  const actualSha256 = createHash('sha256').update(readFileSync(pdfPath)).digest('hex')
  if (actualSha256 !== record.sha256) {
    fail(`PDF hash mismatch (expected ${record.sha256}, received ${actualSha256}); repeat the full PDF audit before approval`)
  }

  return { path: APPROVED_PATH, sha256: actualSha256 }
}

const entryPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : ''
if (import.meta.url === entryPath) {
  const result = verifyResume()
  console.log(`Resume verified: ${result.path} (${result.sha256})`)
}
