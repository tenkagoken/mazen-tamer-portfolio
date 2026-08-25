import { describe, expect, it } from 'vitest'
import { featuredProjects, profile } from '../data/portfolio'
import {
  encodeRepositoryPath,
  normalizeRepositoryPath,
  resolveBlobUrl,
  resolveEvidenceUrl,
  resolveGitHubProfileUrl,
  resolveRepositoryUrl,
} from './github'

describe('GitHub URL resolvers', () => {
  it('derives profile and repository URLs from canonical identity fields', () => {
    expect(resolveGitHubProfileUrl(profile.githubUsername)).toBe('https://github.com/tenkagoken')
    expect(resolveRepositoryUrl(profile.githubUsername, 'Library-Management-System')).toBe(
      'https://github.com/tenkagoken/Library-Management-System',
    )
  })

  it('normalizes separators and encodes every repository path segment', () => {
    expect(normalizeRepositoryPath('Trial\\gen hufff.cpp')).toBe('Trial/gen hufff.cpp')
    expect(encodeRepositoryPath('Trial/gen hufff.cpp')).toBe('Trial/gen%20hufff.cpp')
    expect(resolveBlobUrl('tenkagoken', 'repo', 'a'.repeat(40), 'Folder/A & 1.cs')).toBe(
      `https://github.com/tenkagoken/repo/blob/${'a'.repeat(40)}/Folder/A%20%26%201.cs`,
    )
  })

  it.each(['', '../README.md', 'src//file.ts', './README.md', 'README.md?raw=1', 'README.md#L1'])(
    'rejects unsafe repository paths: %s',
    (path) => expect(() => normalizeRepositoryPath(path)).toThrow(),
  )

  it('pins evidence links to the reviewed commit', () => {
    const project = featuredProjects[0]
    const evidence = project.evidence[0]
    const url = resolveEvidenceUrl(profile.githubUsername, project, evidence)

    expect(url).toContain(`/blob/${project.verifiedCommit}/`)
    expect(url.endsWith('/README.md')).toBe(true)
  })
})
