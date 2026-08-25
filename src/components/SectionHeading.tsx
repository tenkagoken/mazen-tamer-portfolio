import { motion } from 'framer-motion'

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: string
  copy?: string
}

export function SectionHeading({ id, eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <motion.header
      className="section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55 }}
    >
      <p className="eyebrow"><span aria-hidden="true">//</span> {eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </motion.header>
  )
}
