import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, EnvelopeSimple, GithubLogo } from '@phosphor-icons/react'
import { profile, projects } from '../data/portfolio'

const terminalScenes = [
  { command: 'whoami', lines: ['Mazen Eladawy', 'CS student · software builder'] },
  { command: 'repos --public', lines: [`${projects.length} selected repositories`, 'algorithms / C# / web / game-dev'] },
  { command: 'focus --show', lines: ['algorithms / web / games / systems'] },
]

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [scene, setScene] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => setScene((value) => (value + 1) % terminalScenes.length), 3200)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const active = terminalScenes[scene]

  return (
    <section id="home" className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <motion.div className="availability" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="pulse-dot" aria-hidden="true" />
          Open to internships & engineering challenges
        </motion.div>

        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          Computer science × thoughtful engineering
        </motion.p>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65 }}
        >
          I turn ideas into<br />
          <span>working systems.</span>
        </motion.h1>

        <motion.p
          className="hero-summary"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          I’m {profile.displayName} — a CS undergraduate exploring the space between algorithms,
          full-stack software, low-level systems, and game development.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <a className="button button-primary" href="#projects">Explore my work <ArrowDown size={17} weight="bold" /></a>
          <a className="button button-quiet" href={profile.githubUrl} target="_blank" rel="noreferrer">
            <GithubLogo size={17} weight="bold" /> GitHub <ArrowUpRight size={14} weight="bold" />
          </a>
          <a className="icon-link" href={`mailto:${profile.email}`} aria-label="Email Mazen"><EnvelopeSimple size={19} weight="bold" /></a>
        </motion.div>
      </div>

      <motion.div
        className="terminal-stage"
        aria-hidden="true"
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <div className="terminal-window">
          <div className="terminal-bar">
            <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
            <span>mazen@dev: ~/portfolio</span>
            <span className="terminal-status">● live</span>
          </div>
          <div className="terminal-body">
            <p className="terminal-path">~/workspace <span>main*</span></p>
            <p className="command"><span>❯</span> {active.command}<i aria-hidden="true" /></p>
            <motion.div
              key={active.command}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="terminal-output"
            >
              {active.lines.map((line) => <p key={line}>{line}</p>)}
            </motion.div>
            <div className="terminal-code" aria-hidden="true">
              <div><em>01</em><span className="code-blue">const</span> builder = &#123;</div>
              <div><em>02</em>&nbsp;&nbsp;curiosity: <span className="code-green">true</span>,</div>
              <div><em>03</em>&nbsp;&nbsp;status: <span className="code-violet">'shipping'</span></div>
              <div><em>04</em>&#125;;</div>
            </div>
          </div>
          <div className="terminal-tabs" aria-hidden="true">
            {terminalScenes.map((item, index) => (
              <span key={item.command} className={scene === index ? 'active' : ''} />
            ))}
          </div>
        </div>
      </motion.div>

      <a className="scroll-cue" href="#about">
        <span>Scroll to inspect</span><i aria-hidden="true" />
      </a>
    </section>
  )
}
