import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Briefcase, Check, Copy, EnvelopeSimple, FilePdf } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'
import { writeEmailToClipboard } from '../lib/clipboard'

const resumeUrl = `${import.meta.env.BASE_URL}Mazen-Eladawy-Resume.pdf`

export function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle')
  const manualInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (copyState !== 'manual') return
    manualInputRef.current?.focus()
    manualInputRef.current?.select()
  }, [copyState])

  const copyEmail = async () => {
    const copied = await writeEmailToClipboard(profile.email, navigator.clipboard)
    if (!copied) {
      setCopyState('manual')
      return
    }
    setCopyState('copied')
    window.setTimeout(() => setCopyState('idle'), 1800)
  }

  return (
    <section id="contact" className="section-shell content-section contact-section" aria-labelledby="contact-heading">
      <motion.div className="contact-shell" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
        <div className="contact-copy">
          <p className="eyebrow"><span aria-hidden="true">//</span> 05 / Contact</p>
          <h2 id="contact-heading">Have a problem worth building for?</h2>
          <p>
            I’m looking for internships, technical projects, and engineering challenges where I can
            contribute, learn fast, and ship useful work.
          </p>
        </div>

        <div className="contact-actions" aria-label="Contact and résumé links">
          <a href={`mailto:${profile.email}`}>
            <span><EnvelopeSimple size={20} weight="bold" /></span>
            <span><small>Email</small>{profile.email}</span>
            <ArrowUpRight size={17} weight="bold" />
          </a>
          <button type="button" onClick={copyEmail}>
            <span>{copyState === 'copied' ? <Check size={20} weight="bold" /> : <Copy size={20} weight="bold" />}</span>
            <span><small>Copy email</small><span aria-live="polite">{copyState === 'copied' ? 'Copied to clipboard' : copyState === 'manual' ? 'Select and copy the address below' : 'Ready for your address book'}</span></span>
            <span aria-hidden="true">{copyState === 'copied' ? 'Done' : 'Copy'}</span>
          </button>
          {copyState === 'manual' && (
            <label className="manual-copy">
              <span>Copy manually</span>
              <input ref={manualInputRef} readOnly value={profile.email} onFocus={(event) => event.currentTarget.select()} />
            </label>
          )}
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            <span><Briefcase size={20} weight="bold" /></span>
            <span><small>LinkedIn</small>View professional profile</span>
            <ArrowUpRight size={17} weight="bold" />
          </a>
          <a href={resumeUrl} target="_blank" rel="noreferrer">
            <span><FilePdf size={20} weight="bold" /></span>
            <span><small>Résumé</small>Open verified PDF</span>
            <ArrowUpRight size={17} weight="bold" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
