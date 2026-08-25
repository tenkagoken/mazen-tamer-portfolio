import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, GithubLogo } from '@phosphor-icons/react'
import { profile } from '../data/portfolio'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => setVisible(latest > 700))
  return (
    <motion.a
      href="#home"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="back-to-top"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, pointerEvents: visible ? 'auto' : 'none' }}
    ><ArrowUp size={18} weight="bold" /></motion.a>
  )
}

export function Footer() {
  return (
    <footer className="footer section-shell">
      <div><span className="brand-mark">ME</span><p>Designed & built by {profile.displayName}.</p></div>
      <p>© {new Date().getFullYear()} · Cairo, Egypt</p>
      <a href={profile.githubUrl} target="_blank" rel="noreferrer"><GithubLogo size={17} weight="bold" /> @{profile.githubUsername}</a>
    </footer>
  )
}
