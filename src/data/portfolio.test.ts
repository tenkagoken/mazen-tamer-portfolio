import { describe, expect, it } from 'vitest'
import {
  archiveProjects,
  assertPortfolioIntegrity,
  EvidenceValidationError,
  featuredProjects,
  journey,
  profile,
  projectFilters,
  projects,
  skillGroups,
  validatePortfolioData,
  type PortfolioDataInput,
} from './portfolio'

function mutablePortfolio(): PortfolioDataInput {
  return structuredClone({ profile, projects, skillGroups, journey }) as PortfolioDataInput
}

describe('portfolio evidence contracts', () => {
  it('accepts and deeply freezes the canonical data set', () => {
    expect(validatePortfolioData({ profile, projects, skillGroups, journey })).toEqual([])
    expect(assertPortfolioIntegrity()).toBeDefined()
    expect(Object.isFrozen(projects)).toBe(true)
    expect(Object.isFrozen(featuredProjects[0].claims)).toBe(true)
    expect(Object.isFrozen(featuredProjects[0].evidence[0].supports)).toBe(true)
  })

  it('exposes exactly five featured projects and one archive project', () => {
    expect(projects).toHaveLength(6)
    expect(featuredProjects.map((project) => project.id)).toEqual([
      'huffman', 'cipher', 'exam-management', 'library-management', 'windows-game',
    ])
    expect(archiveProjects.map((project) => project.id)).toEqual(['cpu-scheduler'])
    expect(featuredProjects.every((project) => /^[0-9a-f]{40}$/.test(project.verifiedCommit))).toBe(true)
    for (const project of featuredProjects) {
      expect(Object.keys(project.claims)).toEqual(['contribution', 'decision', 'result', 'limitation'])
      expect(project.evidence.length).toBeGreaterThanOrEqual(2)
      expect(new Set(project.evidence.map((evidence) => evidence.id)).size).toBe(project.evidence.length)
    }
  })

  it('contains the requested repositories and excludes removed work everywhere', () => {
    expect(projects.map((project) => project.repoName)).toEqual(expect.arrayContaining([
      'Examination-Management-System',
      'Library-Management-System',
      'C-windowsformapp-game',
    ]))
    const searchable = JSON.stringify({ projects, skillGroups, journey }).toLowerCase()
    expect(searchable).not.toContain('knights')
    expect(searchable).not.toContain('lebaladna')
    expect(searchable).not.toContain('survey helper')
  })

  it('derives filters and resolves every skill and journey reference', () => {
    const categories = new Set(projects.flatMap((project) => project.categories))
    categories.forEach((category) => expect(projectFilters).toContain(category))

    const projectIds = new Set(projects.map((project) => project.id))
    Object.values(skillGroups).flat().forEach((skill) => {
      skill.projects.forEach((projectId) => expect(projectIds.has(projectId)).toBe(true))
    })
    journey.flatMap((entry) => entry.projects ?? []).forEach((projectId) => expect(projectIds.has(projectId)).toBe(true))
  })

  it('groups commit, evidence, reference, and exclusion failures in one custom error', () => {
    const invalid = mutablePortfolio()
    const mutableProjects = invalid.projects as Array<(typeof invalid.projects)[number]>
    const huffman = mutableProjects[0]
    if (!huffman.featured) throw new Error('test fixture expected a featured project')
    huffman.verifiedCommit = 'BAD-SHA'
    huffman.evidence = [{ id: 'only', kind: 'source', label: 'Unsafe', path: '../README.md', supports: ['missing-claim'] }]
    mutableProjects[5].repoName = 'lebaladnas-survey-helper'
    ;(invalid.skillGroups.Programming[0].projects as string[]).push('missing-project')

    const run = () => assertPortfolioIntegrity(invalid)
    expect(run).toThrow(EvidenceValidationError)
    try {
      run()
    } catch (error) {
      const validationError = error as EvidenceValidationError
      expect(validationError).toBeInstanceOf(EvidenceValidationError)
      const categories = validationError.findings.map((finding) => finding.category)
      expect(categories).toEqual(expect.arrayContaining(['commit', 'destination', 'evidence', 'reference', 'exclusion']))
      expect(validationError.message).toContain('project=huffman')
      expect(validationError.message).toContain('record=only')
    }
  })
})
