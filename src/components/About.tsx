import { motion } from 'framer-motion'
import { featuredProjects, languages, profile } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const proofItems = [
  { label: 'Education', value: 'BSc Computer Science', note: 'MSA University, Egypt' },
  { label: 'GPA', value: profile.gpa, note: 'Current academic record' },
  { label: 'Graduation', value: profile.graduation, note: 'Expected' },
  { label: 'Featured work', value: `${featuredProjects.length} verified projects`, note: 'Each tied to commit-pinned evidence' },
  { label: 'Current focus', value: 'Software engineering internships', note: 'Algorithms, systems, and product-minded development' },
]

export function About() {
  return (
    <section id="about" className="section-shell content-section" aria-labelledby="about-heading">
      <SectionHeading
        id="about-heading"
        eyebrow="02 / Profile"
        title="Curious by default. Practical by choice."
        copy="I’m building a broad engineering foundation, then testing it through source-visible projects."
      />

      <div className="about-layout">
        <motion.div className="about-story" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
          <p className="story-lead">My work sits where <span>logic meets interaction.</span></p>
          <p>
            At {profile.university}, I’m studying the fundamentals behind software while exploring
            compression, encryption, domain modeling, browser interfaces, and game systems through projects.
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

        <motion.dl className="proof-ledger" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
          {proofItems.map((item, index) => (
            <div key={item.label}>
              <dt><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</dt>
              <dd><strong>{item.value}</strong><small>{item.note}</small></dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
