import type { EvidenceRecord, FeaturedProject, Project } from '../data/portfolio.ts'

const SEGMENT_PATTERN = /^[A-Za-z0-9._-]+$/
const COMMIT_PATTERN = /^[0-9a-f]{40}$/

export function validateGitHubSegment(value: string, label: 'owner' | 'repository') {
  if (!value || value === '.' || value === '..' || !SEGMENT_PATTERN.test(value)) {
    throw new Error(`${label} must contain only GitHub-safe segment characters`)
  }
  return value
}

export function validateVerifiedCommit(value: string) {
  if (!COMMIT_PATTERN.test(value)) {
    throw new Error('verified commit must be a lowercase 40-character SHA')
  }
  return value
}

export function normalizeRepositoryPath(value: string) {
  if (!value || value.includes('?') || value.includes('#')) {
    throw new Error('repository path must be non-empty and cannot contain a query or fragment')
  }

  const segments = value.replaceAll('\\', '/').split('/')
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new Error('repository path cannot contain empty or dot segments')
  }

  return segments.map((segment) => segment.normalize('NFC')).join('/')
}

export function encodeRepositoryPath(value: string) {
  return normalizeRepositoryPath(value)
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export function resolveGitHubProfileUrl(owner: string) {
  return `https://github.com/${validateGitHubSegment(owner, 'owner')}`
}

export function resolveRepositoryUrl(owner: string, repoName: string) {
  return `${resolveGitHubProfileUrl(owner)}/${validateGitHubSegment(repoName, 'repository')}`
}

export function resolveBlobUrl(owner: string, repoName: string, verifiedCommit: string, path: string) {
  return `${resolveRepositoryUrl(owner, repoName)}/blob/${validateVerifiedCommit(verifiedCommit)}/${encodeRepositoryPath(path)}`
}

export function resolveEvidenceUrl(owner: string, project: FeaturedProject, evidence: EvidenceRecord) {
  if (evidence.kind === 'repository') {
    return resolveRepositoryUrl(owner, project.repoName)
  }
  return resolveBlobUrl(owner, project.repoName, project.verifiedCommit, evidence.path)
}

export function resolveProjectRepositoryUrl(owner: string, project: Project) {
  return resolveRepositoryUrl(owner, project.repoName)
}
