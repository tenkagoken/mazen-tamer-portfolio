import { useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, GithubLogo, MagnifyingGlass } from '@phosphor-icons/react'
import { featuredProjects, profile, projectFilters, projects, type Project } from '../data/portfolio'
import { ProjectModal } from './ProjectModal'
import { ProjectVisual } from './ProjectVisual'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>('All')
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])
  const project = featuredProjects[selectedIndex]

  const filteredProjects = useMemo(
    () => filter === 'All' ? projects : projects.filter((item) => item.categories.includes(filter)),
    [filter],
  )

  const closeModal = useCallback(() => setModalProject(null), [])

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight'
    const next = forward ? (index + 1) % featuredProjects.length : (index - 1 + featuredProjects.length) % featuredProjects.length
    setSelectedIndex(next)
    tabsRef.current[next]?.focus()
  }

  return (
    <section id="projects" className="section-shell content-section projects-section" aria-labelledby="projects-heading">
      <SectionHeading
        id="projects-heading"
        eyebrow="02 / GitHub work"
        title="A repository is where the thinking becomes visible."
        copy={`${projects.length} selected public repositories spanning algorithms, C# software design, low-level systems, web applications, and game development—presented from the code outward.`}
      />

      <div className="project-subhead">
        <p>Featured projects</p><span>{String(featuredProjects.length).padStart(2, '0')} deep dives</span>
      </div>

      <div className={`project-workbench accent-${project.accent}`}>
        <div className="project-index" role="tablist" aria-label="Featured projects" aria-orientation="vertical">
          <p>Featured index <span>{String(selectedIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}</span></p>
          {featuredProjects.map((item, index) => (
            <button
              key={item.id}
              id={`featured-project-tab-${item.id}`}
              ref={(element) => { tabsRef.current[index] = element }}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-controls="featured-project-panel"
              tabIndex={index === selectedIndex ? 0 : -1}
              className={index === selectedIndex ? 'active' : ''}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              <span>{item.number}</span>
              <span><strong>{item.shortTitle}</strong><small>{item.primaryLanguage}</small></span>
              {item.status && <i>WIP</i>}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            id="featured-project-panel"
            role="tabpanel"
            aria-labelledby={`featured-project-tab-${project.id}`}
            key={project.id}
            className="project-panel"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14, pointerEvents: 'none' }}
            transition={{ duration: .28 }}
          >
            <ProjectVisual id={project.id} />
            <div className="project-info">
              <div className="project-meta">
                <span>{project.categories.join(' · ')}</span>
                {project.status && <span className="status-chip"><i /> {project.status}</span>}
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="concept-list">{project.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>
              <div className="project-actions featured-actions">
                <button type="button" onClick={() => setModalProject(project)}><MagnifyingGlass size={17} weight="bold" /> Inspect project</button>
                <a href={project.repository} target="_blank" rel="noreferrer"><GithubLogo size={17} weight="bold" /> View repository <ArrowUpRight size={14} weight="bold" /></a>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="archive-header">
        <div><p className="eyebrow"><span>//</span> Project archive</p><h3>All public repositories</h3></div>
        <span>Showing {filteredProjects.length} of {projects.length}</span>
      </div>

      <div className="project-filters" aria-label="Filter project archive">
        {projectFilters.map((item) => (
          <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>

      <motion.div className="project-archive" layout aria-live="polite">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item) => (
            <motion.button
              layout
              key={item.id}
              type="button"
              className={`archive-row accent-${item.accent}`}
              onClick={() => setModalProject(item)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, pointerEvents: 'none' }}
              aria-label={`Open details for ${item.title}`}
            >
              <span className="archive-number">{item.number}</span>
              <span className="archive-title"><strong>{item.title}</strong><small>{item.repoName}</small></span>
              <span className="archive-category">{item.categories[0]}</span>
              <span className="archive-language"><i />{item.primaryLanguage ?? 'No code'}</span>
              <span className="archive-open">Details <ArrowRight size={15} weight="bold" /></span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="github-project-cta">
        <div><GithubLogo size={22} weight="bold" /><span><small>Continue exploring</small>See the source, file history, and latest updates on GitHub.</span></div>
        <a className="button button-quiet" href={profile.githubUrl} target="_blank" rel="noreferrer">Explore more on GitHub <ArrowUpRight size={15} weight="bold" /></a>
      </div>

      <ProjectModal project={modalProject} onClose={closeModal} />
    </section>
  )
}
