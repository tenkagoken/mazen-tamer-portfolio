import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Code, GithubLogo, LinkSimple, SealCheck, Stack, X } from '@phosphor-icons/react'
import {
  getProjectDisplayNumber,
  isFeaturedProject,
  profile,
  type ClaimKind,
  type Project,
} from '../data/portfolio'
import { resolveEvidenceUrl, resolveProjectRepositoryUrl } from '../lib/github'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const claimLabels: Record<ClaimKind, string> = {
  contribution: 'Contribution',
  decision: 'Technical decision',
  result: 'Verified result',
  limitation: 'Known limitation',
}

const claimOrder: readonly ClaimKind[] = ['contribution', 'decision', 'result', 'limitation']

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
              <span>{getProjectDisplayNumber(project)} / repository detail</span>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details"><X size={19} weight="bold" /></button>
            </div>

            <div className="modal-scroll">
              <header className="modal-heading">
                <div>
                  <p>{project.repoName}</p>
                  <h3 id={`modal-title-${project.id}`}>{project.title}</h3>
                </div>
                <span className={project.featured ? 'modal-status' : 'modal-status archive-status'}>
                  {project.featured ? <><SealCheck size={14} weight="fill" />verified</> : 'archive'}
                </span>
              </header>

              <p className="modal-overview">{project.summary}</p>

              <div className="modal-facts">
                <div><Code size={17} weight="bold" /><span><small>Primary language</small>{project.primaryLanguage}</span></div>
                <div><Stack size={17} weight="bold" /><span><small>Categories</small>{project.categories.join(' · ')}</span></div>
              </div>

              {isFeaturedProject(project) ? (
                <>
                  <section className="modal-section">
                    <p className="modal-label">Claim ledger</p>
                    <dl className="claim-ledger">
                      {claimOrder.map((kind) => (
                        <div key={kind}>
                          <dt>{claimLabels[kind]}</dt>
                          <dd>{project.claims[kind].text}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>

                  <section className="modal-section">
                    <p className="modal-label">Commit-pinned evidence</p>
                    <p className="verified-commit">Verified at <code>{project.verifiedCommit.slice(0, 12)}</code></p>
                    <div className="evidence-links">
                      {project.evidence.map((evidence) => (
                        <a key={evidence.id} href={resolveEvidenceUrl(profile.githubUsername, project, evidence)} target="_blank" rel="noreferrer">
                          <LinkSimple size={15} weight="bold" /><span><strong>{evidence.label}</strong><small>{evidence.kind}</small></span><ArrowUpRight size={13} weight="bold" />
                        </a>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                <p className="archive-note">This project remains in the public archive. Featured proof briefs are reserved for repositories reviewed at a pinned commit.</p>
              )}

              <section className="modal-section">
                <p className="modal-label">Technology</p>
                <div className="modal-tech">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
              </section>

              <a className="button button-primary modal-repo-link" href={resolveProjectRepositoryUrl(profile.githubUsername, project)} target="_blank" rel="noreferrer">
                <GithubLogo size={17} weight="bold" /> View repository <ArrowUpRight size={15} weight="bold" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
