import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Cube, GameController, Globe, TerminalWindow } from '@phosphor-icons/react'
import { projects, skillGroups, type SkillCategory } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const groupIcons: Record<SkillCategory, typeof Cube> = { Programming: TerminalWindow, Web: Globe, 'Game Dev': GameController, Engineering: Cube, Tools: Cube }

export function Skills() {
  const categories = Object.keys(skillGroups) as SkillCategory[]
  const [category, setCategory] = useState(categories[0])
  const [selectedSkill, setSelectedSkill] = useState(skillGroups[categories[0]][0].name)
  const skills = skillGroups[category]
  const selected = useMemo(() => skills.find((skill) => skill.name === selectedSkill) ?? skills[0], [selectedSkill, skills])
  const related = projects.filter((project) => selected.projects.includes(project.id))

  const chooseCategory = (next: SkillCategory) => {
    setCategory(next)
    setSelectedSkill(skillGroups[next][0].name)
  }

  return (
    <section id="skills" className="section-shell content-section" aria-labelledby="skills-heading">
      <SectionHeading
        id="skills-heading"
        eyebrow="03 / Capabilities"
        title="A growing technical toolkit."
        copy="No arbitrary scores—just the technologies I use and the work they connect to."
      />

      <div className="skills-console">
        <div className="skill-categories" role="group" aria-label="Skill categories">
          {categories.map((item) => {
            const Icon = groupIcons[item]
            return (
              <button key={item} aria-pressed={category === item} onClick={() => chooseCategory(item)}>
                <Icon size={17} weight="bold" /> {item}
              </button>
            )
          })}
        </div>

        <motion.div
          className="skill-browser"
          key={category}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
            <div className="skill-grid" aria-label={`${category} skills`}>
              {skills.map((skill, index) => (
                <button
                  type="button"
                  key={skill.name}
                  className={selected.name === skill.name ? 'active' : ''}
                  onClick={() => setSelectedSkill(skill.name)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{skill.name}</strong>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="skill-context" aria-live="polite">
              <p className="context-label">Selected technology</p>
              <h3>{selected.name}</h3>
              {selected.note && <p className="skill-note">{selected.note}</p>}
              <div className="context-line" />
              <p className="context-label">Connected work</p>
              {related.length ? (
                <div className="related-projects">
                  {related.map((project) => (
                    <a key={project.id} href="#projects">
                      <span>{project.number}</span>{project.title}<ArrowRight size={14} weight="bold" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="learning-label">Part of the wider learning toolkit.</p>
              )}
            </div>
        </motion.div>
      </div>
    </section>
  )
}
