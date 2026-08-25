import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Cube, GameController, Globe, TerminalWindow } from '@phosphor-icons/react'
import { getProjectDisplayNumber, projects, skillGroups, type SkillCategory } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const groupIcons: Record<SkillCategory, typeof Cube> = {
  Programming: TerminalWindow,
  Web: Globe,
  'Game Development': GameController,
  Engineering: Cube,
  Tools: Cube,
}

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
        title="Tools connected to shipped work."
        copy="No arbitrary proficiency scores—each capability points back to the repositories where it appears."
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

        <motion.div className="skill-browser" key={category} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="skill-grid" aria-label={`${category} skills`}>
            {skills.map((skill, index) => (
              <button type="button" key={skill.name} className={selected.name === skill.name ? 'active' : ''} onClick={() => setSelectedSkill(skill.name)}>
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
              <>
                <div className="related-projects" aria-label={`Projects using ${selected.name}`}>
                  {related.map((project) => (
                    <span key={project.id}><b>{getProjectDisplayNumber(project)}</b>{project.title}</span>
                  ))}
                </div>
                <a className="skill-project-link" href="#projects">View projects <ArrowRight size={14} weight="bold" /></a>
              </>
            ) : (
              <p className="learning-label">Part of the wider learning toolkit.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
