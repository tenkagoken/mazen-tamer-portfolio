import { describe, expect, it } from 'vitest'
import { featuredProjects, projectFilters, projects, skillGroups } from './portfolio'

describe('portfolio data contracts', () => {
  it('keeps repository identity and source links unique', () => {
    expect(projects).toHaveLength(7)

    for (const key of ['id', 'number', 'repoName', 'repository'] as const) {
      expect(new Set(projects.map((project) => project[key])).size).toBe(projects.length)
    }

    projects.forEach((project) => {
      expect(project.repository).toBe(`https://github.com/tenkagoken/${project.repoName}`)
    })
  })

  it('derives featured projects and covers every project category', () => {
    expect(featuredProjects).toHaveLength(5)
    expect(featuredProjects.every((project) => project.featured)).toBe(true)

    const categories = new Set(projects.flatMap((project) => project.categories))
    categories.forEach((category) => expect(projectFilters).toContain(category))
  })

  it('resolves every skill reference to a public project', () => {
    const projectIds = new Set(projects.map((project) => project.id))

    Object.values(skillGroups).flat().forEach((skill) => {
      skill.projects.forEach((projectId) => expect(projectIds.has(projectId)).toBe(true))
    })
  })
})
