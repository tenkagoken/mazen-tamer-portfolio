import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Code, GithubLogo, Stack, X } from '@phosphor-icons/react'
import type { Project } from '../data/portfolio'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            className={`project-modal accent-${project.accent}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
            initial={{ opacity: 0, y: 24, scale: .975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: .24 }}
          >
            <div className="modal-topbar">
              <span>{project.number} / repository detail</span>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details"><X size={19} weight="bold" /></button>
            </div>

            <div className="modal-scroll">
              <header className="modal-heading">
                <div>
                  <p>{project.repoName}</p>
                  <h3 id={`modal-title-${project.id}`}>{project.title}</h3>
                </div>
                {project.status && <span className="modal-status"><i />{project.status}</span>}
              </header>

              <p className="modal-overview">{project.overview}</p>

              <div className="modal-facts">
                <div><Code size={17} weight="bold" /><span><small>Primary language</small>{project.primaryLanguage ?? 'Not detected'}</span></div>
                <div><Stack size={17} weight="bold" /><span><small>Categories</small>{project.categories.join(' · ')}</span></div>
              </div>

              {project.media && (
                <figure className="repository-media">
                  <img src={project.media.src} alt={project.media.alt} loading="lazy" decoding="async" />
                  <figcaption>Actual sprite sheet from the project repository</figcaption>
                </figure>
              )}

              {!!project.whatItDoes.length && (
                <section className="modal-section">
                  <p className="modal-label">What it does</p>
                  <ul>{project.whatItDoes.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              )}

              {!!project.highlights.length && (
                <section className="modal-section">
                  <p className="modal-label">Technical highlights</p>
                  <div className="highlight-grid">{project.highlights.map((item) => <span key={item}>{item}</span>)}</div>
                </section>
              )}

              {!!project.technologies.length && (
                <section className="modal-section">
                  <p className="modal-label">Technology</p>
                  <div className="modal-tech">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
                </section>
              )}

              {project.evidenceNote && <p className="evidence-note">{project.evidenceNote}</p>}

              <a className="button button-primary modal-repo-link" href={project.repository} target="_blank" rel="noreferrer">
                <GithubLogo size={17} weight="bold" /> View repository <ArrowUpRight size={15} weight="bold" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
