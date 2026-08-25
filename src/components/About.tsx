import { motion } from 'framer-motion'
import { BracketsCurly, Code, GraduationCap, Sparkle } from '@phosphor-icons/react'
import { languages, profile } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const facts = [
  { icon: GraduationCap, label: 'Current path', value: 'CS Student', sub: 'MSA University' },
  { icon: BracketsCurly, label: 'Academic signal', value: profile.gpa, sub: 'Current GPA' },
  { icon: Code, label: 'Next milestone', value: profile.graduation, sub: 'Expected graduation' },
  { icon: Sparkle, label: 'Working mode', value: 'Builder', sub: 'Learn by shipping' },
]

export function About() {
  return (
    <section id="about" className="section-shell content-section" aria-labelledby="about-heading">
      <SectionHeading
        id="about-heading"
        eyebrow="01 / Profile"
        title="Curious by default. Practical by choice."
        copy="I’m building a broad engineering foundation—then testing it by making real things work."
      />

      <div className="about-layout">
        <motion.div
          className="about-story"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="story-lead">My work sits where <span>logic meets interaction.</span></p>
          <p>
            At {profile.university}, I’m studying the fundamentals behind software while exploring
            full-stack development, compression, encryption, and game systems through projects.
          </p>
          <p>
            I’m looking for opportunities to turn that academic foundation into thoughtful,
            real-world engineering experience.
          </p>

          <div className="languages-card">
            <p>Languages</p>
            <div>
              {languages.map((language) => (
                <span key={language.name}><strong>{language.name}</strong>{language.level}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="fact-grid">
          {facts.map((fact, index) => (
            <motion.article
              className="fact-card"
              key={fact.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="fact-icon"><fact.icon size={20} weight="bold" /></div>
              <small>{fact.label}</small>
              <strong>{fact.value}</strong>
              <span>{fact.sub}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
