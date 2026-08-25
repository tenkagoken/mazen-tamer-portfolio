import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { navigation, profile } from '../data/portfolio'

interface NavbarProps {
  activeSection: string
}

export function Navbar({ activeSection }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      window.requestAnimationFrame(() => toggleRef.current?.focus())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 861px)')
    const onChange = (event: MediaQueryListEvent) => event.matches && setOpen(false)
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={`navbar-wrap ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label={`${profile.displayName}, home`}>
          <span className="brand-mark">ME</span>
          <span className="brand-name">Mazen<span>.</span></span>
        </a>

        <div className="nav-links" aria-label="Page sections">
          {navigation.map(({ id, label }, index) => {
            return (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>
                <span>{String(index + 1).padStart(2, '0')}</span>{label}
              </a>
            )
          })}
        </div>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
          >
            {navigation.map(({ id, label }, index) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2, '0')}</span>{label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
