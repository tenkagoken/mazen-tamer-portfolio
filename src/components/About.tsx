import { motion, type Variants } from 'framer-motion'
import { featuredProjects, languages, profile, profileTimeline } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const proofItems = [
  { label: 'Education', value: 'BSc Computer Science', note: 'MSA University, Egypt' },
  { label: 'GPA', value: profile.gpa, note: 'Current academic record' },
  { label: 'Graduation', value: profile.graduation, note: 'Expected' },
  { label: 'Featured work', value: `${featuredProjects.length} verified projects`, note: 'Each tied to commit-pinned evidence' },
  { label: 'Current focus', value: 'Software engineering internships', note: 'Algorithms, systems, and product-minded development' },
]

const timelineItems: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.18, staggerChildren: 0.14 } },
}

const timelineItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

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

      <div className="profile-timeline" aria-labelledby="profile-timeline-heading">
        <motion.header
          className="profile-timeline-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow"><span aria-hidden="true">//</span> Profile timeline</p>
          <h3 id="profile-timeline-heading">Built one layer at a time.</h3>
          <p>Study, teaching, and source-visible projects arranged as one gradual progression.</p>
        </motion.header>

        <div className="profile-timeline-viewport">
          <motion.div
            className="profile-timeline-track"
            variants={timelineItems}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="profile-timeline-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            />
            {profileTimeline.map((item, index) => (
              <motion.article key={item.title} className="profile-timeline-item" variants={timelineItem}>
                <div className="profile-timeline-node"><span>{String(index + 1).padStart(2, '0')}</span></div>
                <div className="profile-timeline-card">
                  <small>{item.label}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
