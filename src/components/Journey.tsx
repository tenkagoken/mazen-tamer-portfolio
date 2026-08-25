import { useState } from 'react'
import { motion } from 'framer-motion'
import { journey } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function Journey() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="journey" className="section-shell content-section journey-section" aria-labelledby="journey-heading">
      <SectionHeading
        id="journey-heading"
        eyebrow="04 / Engineering journey"
        title="One layer deeper with every build."
        copy="A degree in progress, connected by projects that move from interfaces toward the systems underneath."
      />

      <div className="timeline">
        <motion.div
          className="timeline-progress"
          initial={false}
          animate={{ scaleY: (activeIndex + 1) / journey.length }}
          transition={{ duration: .5, ease: 'easeOut' }}
        />
        {journey.map((item, index) => (
          <motion.article
            key={item.title}
            className={`timeline-item ${index === activeIndex ? 'is-active' : ''} ${index < activeIndex ? 'is-past' : ''}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ delay: index * 0.08 }}
            onViewportEnter={() => setActiveIndex(index)}
          >
            <div className="timeline-node"><span>{String(index + 1).padStart(2, '0')}</span></div>
            <div className="timeline-card">
              <small>{item.label}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
