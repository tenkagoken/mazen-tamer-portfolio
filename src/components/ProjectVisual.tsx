import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ProjectId } from '../data/portfolio'
import { shouldRunProjectAnimation } from '../lib/motion'

export function ProjectVisual({ id, documentVisible }: { id: ProjectId; documentVisible: boolean }) {
  const visualRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(visualRef, { amount: 0.15 })
  const reduceMotion = useReducedMotion()
  const shouldAnimate = shouldRunProjectAnimation({ documentVisible, inView: isInView, reduceMotion: Boolean(reduceMotion) })

  if (id === 'huffman') {
    return (
      <div ref={visualRef} className="project-visual huffman-visual" aria-hidden="true">
        <div className="visual-toolbar"><span>data → tree → encoded output</span><span>binary I/O</span></div>
        <svg viewBox="0 0 480 260" role="presentation">
          <g className="tree-lines">
            <path d="M240 44 145 104M240 44l95 60M145 104l-55 74M145 104l55 74M335 104l-55 74M335 104l55 74" />
          </g>
          {[[240,44,'Σ'],[145,104,'0'],[335,104,'1'],[90,178,'A'],[200,178,'B'],[280,178,'C'],[390,178,'D']].map(([x,y,label], index) => (
            <motion.g key={String(label)} initial={{ opacity: 0, scale: .7 }} animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }} transition={shouldAnimate ? { delay: index * .08 } : { duration: 0 }}>
              <circle cx={Number(x)} cy={Number(y)} r={index < 3 ? 22 : 18} />
              <text x={Number(x)} y={Number(y) + 5}>{label}</text>
            </motion.g>
          ))}
        </svg>
        <div className="binary-stream"><span>source bytes</span><i>→</i><span>01101001 110 0010 101</span><i>→</i><span>packed file</span></div>
      </div>
    )
  }

  if (id === 'cipher') {
    return (
      <div ref={visualRef} className="project-visual cipher-visual" aria-hidden="true">
        <div className="visual-toolbar"><span>mono_cipher.asm</span><span className="success">key validated</span></div>
        <div className="cipher-flow">
          <div><small>PLAIN</small><strong>HELLO</strong></div>
          <span>↓</span>
          <motion.div animate={shouldAnimate ? { opacity: [0.45, 1, 0.45] } : { opacity: 1 }} transition={shouldAnimate ? { repeat: Infinity, duration: 2 } : { duration: 0 }}>
            <small>SUBSTITUTE</small><strong>QXJJD</strong>
          </motion.div>
          <span>↓</span>
          <div><small>REVERSE</small><strong>HELLO</strong></div>
        </div>
        <div className="assembly-lines">
          <p><em>01</em><span>jal</span> make_key</p>
          <p><em>02</em><span>jal</span> encrypt_msg</p>
          <p><em>03</em><span>jal</span> decrypt_msg</p>
          <p><em>04</em><span>syscall</span> <i># continue</i></p>
        </div>
      </div>
    )
  }

  if (id === 'exam-management') {
    return (
      <div ref={visualRef} className="project-visual exam-visual" aria-hidden="true">
        <div className="visual-toolbar"><span>Examination_Management_System</span><span>.NET 10 · console</span></div>
        <div className="exam-flow">
          <div className="exam-node"><small>ROLE</small><strong>Instructor</strong></div>
          <i>→</i>
          <div className="question-stack"><span>T / F</span><span>Choose one</span><span>Choose all</span></div>
          <i>→</i>
          <div className="exam-node"><small>ROLE</small><strong>Student</strong></div>
        </div>
        <div className="exam-state-strip">
          <span><small>EVENT</small> ExamStarted</span>
          <span><small>STATE</small> Queued → Starting → Finished</span>
          <span><small>OUTPUT</small> Score / total marks</span>
        </div>
      </div>
    )
  }

  if (id === 'library-management') {
    return (
      <div ref={visualRef} className="project-visual library-visual" aria-hidden="true">
        <div className="visual-toolbar"><span>LibraryManager.cs</span><span>.NET 10 · OOP</span></div>
        <div className="library-workspace">
          <div className="book-shelf">
            <motion.span animate={shouldAnimate ? { y: [0, -3, 0] } : { y: 0 }} transition={shouldAnimate ? { repeat: Infinity, duration: 2.4 } : { duration: 0 }} />
            <span /><span /><span /><span /><span />
            <i />
          </div>
          <div className="circulation-panel">
            <small>CIRCULATION</small>
            <p><span>Book</span><b>→</b><span>Member</span></p>
            <p><span>Available</span><b>→</b><span>Borrowed</span></p>
            <div><i /> find by ID <i /> find by title</div>
          </div>
        </div>
        <div className="library-entities"><span>BOOK</span><span>MEMBER</span><span>LIBRARIAN</span><span>MANAGER</span></div>
      </div>
    )
  }

  if (id === 'windows-game') {
    return (
      <div ref={visualRef} className="project-visual windows-game-visual" aria-hidden="true">
        <div className="visual-toolbar"><span>Form1.cs · custom render loop</span><span>Windows Forms · GDI+</span></div>
        <div className="windows-game-scene">
          <div className="game-hud"><span>♥ ♥ ♥</span><span>BOSS <i /><i /><i /><i /><i /></span></div>
          <motion.div className="code-player" animate={shouldAnimate ? { y: [0, -8, 0] } : { y: 0 }} transition={shouldAnimate ? { repeat: Infinity, duration: 1.8 } : { duration: 0 }}><i /><b /><span /></motion.div>
          <motion.div className="code-projectile" animate={shouldAnimate ? { x: [0, 95], opacity: [0, 1, 0] } : { x: 48, opacity: 1 }} transition={shouldAnimate ? { repeat: Infinity, duration: 1.7 } : { duration: 0 }} />
          <div className="code-boss"><i /><b /></div>
          <div className="code-platform platform-a" /><div className="code-platform platform-b" />
          <div className="game-grid" />
        </div>
        <div className="game-status"><span>STATE <b>IDLE · RUN · JUMP · ATTACK · FALL</b></span><span>concept visualization</span></div>
      </div>
    )
  }

  if (id === 'lebaladna-survey') {
    return (
      <div ref={visualRef} className="project-visual survey-visual" aria-hidden="true">
        <div className="visual-toolbar"><span>survey analytics · role workspace</span><span>PHP · MySQL · Chart.js</span></div>
        <div className="survey-dashboard">
          <div className="survey-role-rail"><small>ROLES</small><span>Admin</span><span>Analyst</span><span>Member</span></div>
          <div className="survey-report">
            <div className="survey-stat-row"><span><small>RESPONSES</small><strong>148</strong></span><span><small>COMPLETION</small><strong>84%</strong></span><span><small>QUESTIONS</small><strong>07</strong></span></div>
            <div className="survey-chart">
              {[42, 68, 51, 82, 63, 74].map((height, index) => (
                <motion.i
                  key={height}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={shouldAnimate ? { delay: index * 0.08, duration: 0.45 } : { duration: 0 }}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="survey-flow"><span>AUTHOR</span><i>→</i><span>ASSIGN</span><i>→</i><span>RESPOND</span><i>→</i><span>ANALYZE</span></div>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'cpu-scheduler') {
    return (
      <div ref={visualRef} className="project-visual scheduler-visual" aria-hidden="true">
        <div className="visual-toolbar"><span>algorithms.js · execution order</span><span>WT 4.25 · TAT 8.50</span></div>
        <div className="scheduler-stage">
          <div className="scheduler-lanes"><span>QUEUE</span><span>CPU</span><span>DONE</span></div>
          <div className="scheduler-path"><i /><i /><i /></div>
          <motion.b
            className="scheduler-runner"
            animate={shouldAnimate ? { x: ['0%', '235%', '470%'] } : { x: '235%' }}
            transition={shouldAnimate ? { repeat: Infinity, duration: 2.8, times: [0, 0.48, 1], ease: 'easeInOut' } : { duration: 0 }}
          >P1</motion.b>
          <div className="scheduler-queue"><span>P2</span><span>P3</span><span>P4</span></div>
        </div>
        <div className="scheduler-algorithms"><span>FCFS</span><span>SJF</span><span>PRIORITY</span><span>ROUND ROBIN</span><span>PREEMPTIVE SJF</span><span>PREEMPTIVE PRIORITY</span></div>
      </div>
    )
  }

  return (
    <div ref={visualRef} className="project-visual generic-visual" aria-hidden="true">
      <div className="visual-toolbar"><span>repository overview</span><span>source verified</span></div>
      <div className="generic-visual-grid"><span>source</span><i>→</i><span>architecture</span><i>→</i><span>output</span></div>
    </div>
  )
}
