import { FormEvent, useState } from 'react'
import { ArrowUpRight, Briefcase, Check, EnvelopeSimple, GithubLogo, PaperPlaneTilt } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'
import { buildMailtoUrl } from '../lib/contact'

export function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    setSent(true)
    window.location.href = buildMailtoUrl(name, email, message)
    window.setTimeout(() => setSent(false), 1500)
  }

  return (
    <section id="contact" className="section-shell content-section contact-section" aria-labelledby="contact-heading">
      <motion.div
        className="contact-shell"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="contact-copy">
          <p className="eyebrow"><span aria-hidden="true">//</span> 05 / Contact</p>
          <h2 id="contact-heading">Have a problem worth building for?</h2>
          <p>
            I’m looking for internships, technical projects, and engineering challenges where I can
            contribute, learn fast, and ship useful work.
          </p>
          <a className="email-link" href={`mailto:${profile.email}`}>
            <span><EnvelopeSimple size={19} weight="bold" /></span>
            <span><small>Email me directly</small>{profile.email}</span>
            <ArrowUpRight size={18} weight="bold" />
          </a>
          <div className="social-row">
            <a href={profile.githubUrl} target="_blank" rel="noreferrer"><GithubLogo size={17} weight="bold" /> GitHub</a>
            {profile.linkedinUrl ? (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><Briefcase size={17} weight="bold" /> LinkedIn</a>
            ) : (
              <span title="Add a verified URL in src/data/portfolio.ts"><Briefcase size={17} weight="bold" /> LinkedIn · URL pending</span>
            )}
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="form-heading"><span>New message</span><i>mailto fallback</i></div>
          <label>
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" maxLength={80} placeholder="How should I address you?" required />
          </label>
          <label>
            <span>Your email</span>
            <input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@company.com" required />
          </label>
          <label>
            <span>What are you building?</span>
            <textarea name="message" rows={5} maxLength={2000} placeholder="Tell me about the project, role, or challenge…" required />
          </label>
          <button type="submit" className="button button-primary" disabled={sent}>
            {sent ? <><Check size={17} weight="bold" /> Opening email app…</> : <>Compose message <PaperPlaneTilt size={16} weight="bold" /></>}
          </button>
          <p className="form-note">Submitting opens your email app. No data is stored by this website.</p>
        </form>
      </motion.div>
    </section>
  )
}
