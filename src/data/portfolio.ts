import { normalizeRepositoryPath, validateGitHubSegment, validateVerifiedCommit } from '../lib/github.ts'

export type ProjectId =
  | 'huffman'
  | 'cipher'
  | 'exam-management'
  | 'library-management'
  | 'windows-game'
  | 'lebaladna-survey'
  | 'cpu-scheduler'

export type ProjectCategory = 'Algorithms' | 'Systems' | 'Software Engineering' | 'Game Development' | 'Web'
export type ProjectAccent = 'cyan' | 'violet' | 'lime' | 'amber' | 'rose' | 'slate'
export type ClaimKind = 'contribution' | 'decision' | 'result' | 'limitation'
export type EvidenceKind = 'repository' | 'readme' | 'source'

export interface ProjectClaim {
  id: string
  kind: ClaimKind
  text: string
}

interface EvidenceBase {
  id: string
  label: string
  supports: readonly string[]
}

export type EvidenceRecord =
  | (EvidenceBase & { kind: 'repository' })
  | (EvidenceBase & { kind: 'readme' | 'source'; path: string })

export interface ProjectBase {
  id: ProjectId
  repoName: string
  title: string
  shortTitle: string
  primaryLanguage: string
  languages: readonly string[]
  technologies: readonly string[]
  categories: readonly ProjectCategory[]
  accent: ProjectAccent
  summary: string
  featured: boolean
}

export interface FeaturedProject extends ProjectBase {
  featured: true
  verifiedCommit: string
  claims: Readonly<Record<ClaimKind, ProjectClaim>>
  evidence: readonly EvidenceRecord[]
}

export interface ArchiveProject extends ProjectBase {
  featured: false
}

export type Project = FeaturedProject | ArchiveProject

export interface Skill {
  name: string
  note?: string
  projects: readonly ProjectId[]
}

export interface ProfileTimelineEntry {
  label: string
  title: string
  text: string
  projects?: readonly ProjectId[]
}

export interface PortfolioDataInput {
  profile: typeof rawProfile
  projects: readonly Project[]
  skillGroups: Readonly<Record<string, readonly Skill[]>>
  profileTimeline: readonly ProfileTimelineEntry[]
}

export interface EvidenceValidationFinding {
  category: string
  field: string
  expected: string
  projectId?: string
  recordId?: string
}

export class EvidenceValidationError extends Error {
  readonly findings: readonly EvidenceValidationFinding[]

  constructor(findings: readonly EvidenceValidationFinding[]) {
    const grouped = Object.entries(
      findings.reduce<Record<string, EvidenceValidationFinding[]>>((groups, finding) => {
        ;(groups[finding.category] ??= []).push(finding)
        return groups
      }, {}),
    )
      .map(([category, entries]) => {
        const details = entries
          .map((finding) => {
            const context = [finding.projectId && `project=${finding.projectId}`, finding.recordId && `record=${finding.recordId}`]
              .filter(Boolean)
              .join(', ')
            return `  - ${finding.field}${context ? ` (${context})` : ''}: ${finding.expected}`
          })
          .join('\n')
        return `${category}\n${details}`
      })
      .join('\n')

    super(`Portfolio evidence validation failed with ${findings.length} finding(s):\n${grouped}`)
    this.name = 'EvidenceValidationError'
    this.findings = findings
  }
}

const CLAIM_ORDER: readonly ClaimKind[] = ['contribution', 'decision', 'result', 'limitation']
const REQUIRED_FEATURED_IDS: readonly ProjectId[] = [
  'huffman',
  'cipher',
  'exam-management',
  'library-management',
  'windows-game',
  'lebaladna-survey',
  'cpu-scheduler',
]
const DENIED_REPOSITORIES = new Set([
  'knights-end',
  'knightsend',
])
const DENIED_COPY = [/knight(?:'|’)?s?\s*end/i]

const rawProfile = {
  displayName: 'Mazen Eladawy',
  fullName: 'Mazen Tamer Elsayed Ahmed Eladawy',
  email: 'mazentamerelsay@gmail.com',
  githubUsername: 'tenkagoken',
  linkedinUrl: 'https://www.linkedin.com/in/mazen-tamer-35b993345',
  university: 'October University for Modern Sciences and Arts (MSA), Egypt',
  graduation: '2028',
  gpa: '3.55 / 4.00',
}

const rawProjects: readonly Project[] = [
  {
    id: 'huffman', repoName: 'huffman-compression-algorithm', title: 'Huffman Compression Algorithm', shortTitle: 'Huffman',
    primaryLanguage: 'C++', languages: ['C++'], technologies: ['C++', 'Binary I/O', 'Huffman Trees', 'Bit Packing'],
    categories: ['Algorithms', 'Systems'], featured: true, accent: 'cyan',
    summary: 'A byte-oriented C++ compression pipeline for binary files, built around Huffman coding and bit-packed output.',
    verifiedCommit: 'e8724d47acb6ebe4811e179327eae13a01252e79', // pragma: allowlist secret — public Git commit
    claims: {
      contribution: { id: 'huffman-contribution', kind: 'contribution', text: 'Built separate frequency generation, compression, and decompression stages for WAV, AVI, BMP, and TXT inputs.' },
      decision: { id: 'huffman-decision', kind: 'decision', text: 'Embedded the generated code table and final-byte bit count in the compressed output so decoding is self-contained.' },
      result: { id: 'huffman-result', kind: 'result', text: 'Produced a byte-oriented pipeline that reconstructs the original binary stream for byte-for-byte verification.' },
      limitation: { id: 'huffman-limitation', kind: 'limitation', text: 'The coursework implementation uses manual memory and fixed buffers, with limited handling for corrupt or one-symbol inputs.' },
    },
    evidence: [
      { id: 'huffman-readme', kind: 'readme', label: 'Technical README', path: 'README.md', supports: ['huffman-contribution', 'huffman-decision', 'huffman-result', 'huffman-limitation'] },
      { id: 'huffman-generator', kind: 'source', label: 'Frequency generator', path: 'Trial/gen hufff.cpp', supports: ['huffman-contribution'] },
      { id: 'huffman-compressor', kind: 'source', label: 'Compressor source', path: 'Trial/comp.cpp', supports: ['huffman-decision', 'huffman-result'] },
      { id: 'huffman-decompressor', kind: 'source', label: 'Decompressor source', path: 'Trial/decomp.cpp', supports: ['huffman-result', 'huffman-limitation'] },
    ],
  },
  {
    id: 'cipher', repoName: 'monoalphabetic-cypher', title: 'Monoalphabetic Cipher', shortTitle: 'Cipher',
    primaryLanguage: 'MIPS Assembly', languages: ['MIPS Assembly'], technologies: ['MIPS Assembly', 'MARS Syscalls', 'Character Mapping'],
    categories: ['Systems', 'Algorithms'], featured: true, accent: 'lime',
    summary: 'A MIPS Assembly cipher that expands a user key into a reversible, case-preserving substitution alphabet.',
    verifiedCommit: 'c73b077dbb15391c2fe304e165d56d45f61ad4c4', // pragma: allowlist secret — public Git commit
    claims: {
      contribution: { id: 'cipher-contribution', kind: 'contribution', text: 'Implemented input validation, key expansion, encryption, and decryption routines directly in MIPS Assembly.' },
      decision: { id: 'cipher-decision', kind: 'decision', text: 'Generated one canonical 26-letter substitution table by removing duplicate key letters before appending unused letters.' },
      result: { id: 'cipher-result', kind: 'result', text: 'Preserved uppercase and lowercase input while supporting reversible round trips inside a single MARS session.' },
      limitation: { id: 'cipher-limitation', kind: 'limitation', text: 'The classical cipher accepts letters only and uses fixed input buffers; it is educational rather than cryptographically secure.' },
    },
    evidence: [
      { id: 'cipher-readme', kind: 'readme', label: 'Technical README', path: 'README.md', supports: ['cipher-contribution', 'cipher-decision', 'cipher-result', 'cipher-limitation'] },
      { id: 'cipher-source', kind: 'source', label: 'Assembly implementation', path: 'mono_cipher.asm', supports: ['cipher-contribution', 'cipher-decision', 'cipher-result'] },
    ],
  },
  {
    id: 'exam-management', repoName: 'Examination-Management-System', title: 'Examination Management System', shortTitle: 'Examination',
    primaryLanguage: 'C#', languages: ['C#'], technologies: ['C#', '.NET 10', 'File I/O', 'Generics', 'Events & Delegates'],
    categories: ['Software Engineering', 'Systems'], featured: true, accent: 'violet',
    summary: 'A C# console application for authoring, persisting, taking, and scoring practice or final examinations.',
    verifiedCommit: '00b64c05db7e2f7d51772e9dbe80e01188befa49', // pragma: allowlist secret — public Git commit
    claims: {
      contribution: { id: 'exam-contribution', kind: 'contribution', text: 'Modeled instructor and student workflows, three question types, exam state, scoring, and text-file persistence.' },
      decision: { id: 'exam-decision', kind: 'decision', text: 'Used abstract exam and question hierarchies with a start event so exam behavior stays polymorphic and extensible.' },
      result: { id: 'exam-result', kind: 'result', text: 'The .NET 10 project builds successfully and supports true/false, choose-one, and choose-all scoring flows.' },
      limitation: { id: 'exam-limitation', kind: 'limitation', text: 'The build still reports nullable warnings, persistence uses a custom line format, and automated tests are not included.' },
    },
    evidence: [
      { id: 'exam-readme', kind: 'readme', label: 'Technical README', path: 'README.md', supports: ['exam-contribution', 'exam-decision', 'exam-result', 'exam-limitation'] },
      { id: 'exam-source', kind: 'source', label: 'Application source', path: 'Program.cs', supports: ['exam-contribution', 'exam-decision', 'exam-limitation'] },
      { id: 'exam-project', kind: 'source', label: '.NET project file', path: 'Examination Management System.csproj', supports: ['exam-result'] },
    ],
  },
  {
    id: 'library-management', repoName: 'Library-Management-System', title: 'Library Management System', shortTitle: 'Library System',
    primaryLanguage: 'C#', languages: ['C#'], technologies: ['C#', '.NET 10', 'Object-Oriented Programming', 'Generic Collections'],
    categories: ['Software Engineering', 'Systems'], featured: true, accent: 'amber',
    summary: 'A menu-driven C# library system for books, members, librarians, search, borrowing, and availability.',
    verifiedCommit: '69a13c6e31d1a75954467662235bdd2de1a86785', // pragma: allowlist secret — public Git commit
    claims: {
      contribution: { id: 'library-contribution', kind: 'contribution', text: 'Created the book, member, librarian, and manager domain model plus the complete console menu workflow.' },
      decision: { id: 'library-decision', kind: 'decision', text: 'Kept borrowing as a member-owned state transition while the manager coordinates lookup and collection operations.' },
      result: { id: 'library-result', kind: 'result', text: 'The .NET 10 project builds successfully and supports ID/title search, member lookup, borrowing, and availability counts.' },
      limitation: { id: 'library-limitation', kind: 'limitation', text: 'State is memory-only, nullable warnings remain, and no automated test suite is included.' },
    },
    evidence: [
      { id: 'library-readme', kind: 'readme', label: 'Technical README', path: 'README.md', supports: ['library-contribution', 'library-decision', 'library-result', 'library-limitation'] },
      { id: 'library-source', kind: 'source', label: 'Application source', path: 'Program.cs', supports: ['library-contribution', 'library-decision', 'library-result', 'library-limitation'] },
      { id: 'library-project', kind: 'source', label: '.NET project file', path: 'Library_Management_System.csproj', supports: ['library-result'] },
    ],
  },
  {
    id: 'windows-game', repoName: 'C-windowsformapp-game', title: 'C# Windows Forms Platformer', shortTitle: 'Windows Platformer',
    primaryLanguage: 'C#', languages: ['C#'], technologies: ['C#', '.NET Framework 4.7.2', 'Windows Forms', 'GDI+', 'System.Drawing'],
    categories: ['Game Development', 'Software Engineering'], featured: true, accent: 'rose',
    summary: 'A side-scrolling platformer built directly with Windows Forms, timers, collision logic, and GDI+ rendering.',
    verifiedCommit: 'e25a2e300481c581aad3905f32c5e8e6a7c82384', // pragma: allowlist secret — public Git commit
    claims: {
      contribution: { id: 'game-contribution', kind: 'contribution', text: 'Built the update loop, rendering, movement, platforms, ladders, camera, combat, enemies, health, and boss systems.' },
      decision: { id: 'game-decision', kind: 'decision', text: 'Separated world and screen coordinates and drew to an off-screen buffer to support camera scrolling and smoother GDI+ output.' },
      result: { id: 'game-result', kind: 'result', text: 'The Release configuration builds successfully as a custom engine-style Windows Forms implementation.' },
      limitation: { id: 'game-limitation', kind: 'limitation', text: 'Referenced sprite assets are absent from the repository, so a clean clone builds but cannot run with its intended visuals.' },
    },
    evidence: [
      { id: 'game-readme', kind: 'readme', label: 'Technical README', path: 'README.md', supports: ['game-contribution', 'game-decision', 'game-result', 'game-limitation'] },
      { id: 'game-source', kind: 'source', label: 'Game implementation', path: 'WindowsFormsApp38/Form1.cs', supports: ['game-contribution', 'game-decision', 'game-limitation'] },
      { id: 'game-project', kind: 'source', label: 'Windows Forms project', path: 'WindowsFormsApp38/WindowsFormsApp38.csproj', supports: ['game-result'] },
    ],
  },
  {
    id: 'lebaladna-survey', repoName: 'lebaladnas-survey-helper', title: 'LeBaladna Survey Helper', shortTitle: 'LeBaladna Survey',
    primaryLanguage: 'PHP', languages: ['PHP', 'JavaScript', 'SQL', 'HTML', 'CSS'], technologies: ['PHP', 'MySQL', 'PDO', 'JavaScript', 'Chart.js', 'Role-Based Access Control'],
    categories: ['Web', 'Software Engineering', 'Systems'], featured: true, accent: 'cyan',
    summary: 'A role-based PHP and MySQL survey platform with questionnaire authoring, member responses, analytics dashboards, and CSV/PDF export.',
    verifiedCommit: '4197ce0620330c6afffa39a492ddc5a48a8fddf7', // pragma: allowlist secret — public Git commit
    claims: {
      contribution: { id: 'survey-contribution', kind: 'contribution', text: 'Built admin, analyst, and member workflows for authoring surveys, assigning participants, collecting responses, and reviewing results.' },
      decision: { id: 'survey-decision', kind: 'decision', text: 'Separated authentication, survey, and response concerns while centralizing PDO queries, role checks, CSRF verification, and session hardening.' },
      result: { id: 'survey-result', kind: 'result', text: 'Delivered dynamic question building, saved responses, completion analytics, Chart.js visualizations, and CSV/PDF export paths.' },
      limitation: { id: 'survey-limitation', kind: 'limitation', text: 'The repository targets a local PHP/MySQL setup, keeps environment values in a PHP config file, and does not include automated tests or deployment instructions.' },
    },
    evidence: [
      { id: 'survey-auth', kind: 'source', label: 'Authentication and role flows', path: 'controllers/AuthController.php', supports: ['survey-contribution', 'survey-decision'] },
      { id: 'survey-model', kind: 'source', label: 'Survey domain model', path: 'models/Survey.php', supports: ['survey-contribution', 'survey-decision', 'survey-result'] },
      { id: 'survey-analytics', kind: 'source', label: 'Analytics dashboard', path: 'analyst/analytics.php', supports: ['survey-result'] },
      { id: 'survey-config', kind: 'source', label: 'Local application configuration', path: 'config/config.php', supports: ['survey-limitation'] },
    ],
  },
  {
    id: 'cpu-scheduler', repoName: 'cpu-scheduling-algorithm-simulation', title: 'CPU Scheduling Visualizer', shortTitle: 'CPU Scheduler',
    primaryLanguage: 'JavaScript', languages: ['JavaScript', 'HTML', 'CSS'], technologies: ['JavaScript', 'HTML', 'CSS', 'Process Scheduling'],
    categories: ['Algorithms', 'Systems', 'Web'], featured: true, accent: 'violet',
    summary: 'A browser-based visualizer for comparing six CPU scheduling algorithms through metrics and animated process flow.',
    verifiedCommit: '6096599a69ae12731cfb8bb243ab4f1f8ba7a032', // pragma: allowlist secret — public Git commit
    claims: {
      contribution: { id: 'scheduler-contribution', kind: 'contribution', text: 'Implemented FCFS, SJF, Priority, Round Robin, preemptive SJF, and preemptive Priority scheduling in browser-native JavaScript.' },
      decision: { id: 'scheduler-decision', kind: 'decision', text: 'Separated process models and scheduling calculations from interface orchestration and DOM-based queue-to-CPU animation.' },
      result: { id: 'scheduler-result', kind: 'result', text: 'Calculates per-process waiting and turnaround time, reports averages, compares non-Round-Robin results, and animates execution order.' },
      limitation: { id: 'scheduler-limitation', kind: 'limitation', text: 'All processes are treated as immediately available, input validation is minimal, and the repository has no automated tests or technical README.' },
    },
    evidence: [
      { id: 'scheduler-algorithms', kind: 'source', label: 'Scheduling algorithms', path: 'algorithms.js', supports: ['scheduler-contribution', 'scheduler-decision', 'scheduler-result', 'scheduler-limitation'] },
      { id: 'scheduler-interface', kind: 'source', label: 'Simulation orchestration', path: 'script.js', supports: ['scheduler-decision', 'scheduler-result', 'scheduler-limitation'] },
      { id: 'scheduler-animation', kind: 'source', label: 'Process animation', path: 'animation.js', supports: ['scheduler-decision', 'scheduler-result'] },
      { id: 'scheduler-page', kind: 'source', label: 'Visualizer interface', path: 'index.html', supports: ['scheduler-contribution'] },
    ],
  },
]

const allProjectIds: readonly ProjectId[] = rawProjects.map((project) => project.id)

const rawSkillGroups = {
  Programming: [
    { name: 'C++', projects: ['huffman'] },
    { name: 'C#', projects: ['exam-management', 'library-management', 'windows-game'] },
    { name: '.NET', projects: ['exam-management', 'library-management', 'windows-game'] },
    { name: 'PHP', projects: ['lebaladna-survey'] },
    { name: 'JavaScript', projects: ['lebaladna-survey', 'cpu-scheduler'] },
    { name: 'MIPS Assembly', projects: ['cipher'] },
  ],
  Web: [
    { name: 'PHP', projects: ['lebaladna-survey'] },
    { name: 'MySQL', projects: ['lebaladna-survey'] },
    { name: 'HTML', projects: ['lebaladna-survey', 'cpu-scheduler'] },
    { name: 'CSS', projects: ['lebaladna-survey', 'cpu-scheduler'] },
    { name: 'JavaScript', projects: ['lebaladna-survey', 'cpu-scheduler'] },
    { name: 'Chart.js', projects: ['lebaladna-survey'] },
  ],
  'Game Development': [
    { name: 'Windows Forms', projects: ['windows-game'] },
    { name: 'GDI+', projects: ['windows-game'] },
    { name: 'Custom Game Loop', projects: ['windows-game'] },
    { name: 'Collision Detection', projects: ['windows-game'] },
    { name: 'State Machines', projects: ['windows-game'] },
  ],
  Engineering: [
    { name: 'Object-Oriented Programming', projects: ['exam-management', 'library-management', 'windows-game', 'lebaladna-survey'] },
    { name: 'File I/O', projects: ['huffman', 'exam-management'] },
    { name: 'Events & Delegates', projects: ['exam-management'] },
    { name: 'Generics', projects: ['exam-management', 'library-management'] },
    { name: 'Collections', projects: ['exam-management', 'library-management', 'windows-game'] },
    { name: 'Algorithms', projects: ['huffman', 'cipher', 'cpu-scheduler'] },
    { name: 'Binary I/O', projects: ['huffman'] },
    { name: 'Bit Packing', projects: ['huffman'] },
    { name: 'Relational Data Modeling', projects: ['lebaladna-survey'] },
    { name: 'Role-Based Access Control', projects: ['lebaladna-survey'] },
    { name: 'CSRF Protection', projects: ['lebaladna-survey'] },
  ],
  Tools: [
    { name: 'Git', projects: allProjectIds },
    { name: 'GitHub', note: 'Repository-backed project history', projects: allProjectIds },
    { name: 'Visual Studio', projects: ['exam-management', 'library-management', 'windows-game'] },
    { name: 'MARS', projects: ['cipher'] },
  ],
} satisfies Record<string, readonly Skill[]>

const rawProfileTimeline: readonly ProfileTimelineEntry[] = [
  { label: 'Foundation', title: 'Computer Science Degree', text: `Studying at ${rawProfile.university}. Expected graduation: ${rawProfile.graduation}.` },
  { label: 'Experience · 2023–2024', title: 'IGCSE Mathematics Tutor', text: 'Taught O Level mathematics through structured explanations and step-by-step problem solving.' },
  { label: 'Algorithms', title: 'Compression & Scheduling', text: 'Implemented Huffman coding in C++ and six CPU scheduling simulations in JavaScript.', projects: ['huffman', 'cpu-scheduler'] },
  { label: 'Low level', title: 'Encryption in Assembly', text: 'Built a key-driven monoalphabetic cipher in MIPS Assembly.', projects: ['cipher'] },
  { label: 'Software design', title: 'Examination & Library Systems', text: 'Modeled two console systems in C# with OOP, collections, generics, events, and file handling.', projects: ['exam-management', 'library-management'] },
  { label: 'Web platform', title: 'Survey Workflows & Analytics', text: 'Built role-based survey authoring, response collection, analytics, and export workflows with PHP, MySQL, JavaScript, and Chart.js.', projects: ['lebaladna-survey'] },
  { label: 'Game engineering', title: 'Custom Windows Forms Platformer', text: 'Built timer-driven rendering, collision, combat, and boss systems directly with C#, Windows Forms, and GDI+.', projects: ['windows-game'] },
]

function addFinding(findings: EvidenceValidationFinding[], category: string, field: string, expected: string, projectId?: string, recordId?: string) {
  findings.push({ category, field, expected, projectId, recordId })
}

export function validatePortfolioData(data: PortfolioDataInput): readonly EvidenceValidationFinding[] {
  const findings: EvidenceValidationFinding[] = []
  const projectIds = new Set<ProjectId>()
  const repoNames = new Set<string>()
  const globalEvidenceIds = new Set<string>()

  try { validateGitHubSegment(data.profile.githubUsername, 'owner') } catch {
    addFinding(findings, 'identity', 'profile.githubUsername', 'a GitHub-safe owner segment')
  }

  for (const project of data.projects) {
    if (projectIds.has(project.id)) addFinding(findings, 'identity', 'id', 'a unique project ID', project.id)
    projectIds.add(project.id)

    const normalizedRepo = project.repoName.toLowerCase()
    if (repoNames.has(normalizedRepo)) addFinding(findings, 'identity', 'repoName', 'a unique repository name', project.id)
    repoNames.add(normalizedRepo)

    try { validateGitHubSegment(project.repoName, 'repository') } catch {
      addFinding(findings, 'destination', 'repoName', 'a GitHub-safe repository segment', project.id)
    }

    if (DENIED_REPOSITORIES.has(normalizedRepo)) addFinding(findings, 'exclusion', 'repoName', 'a repository outside the explicit denylist', project.id)
    if (DENIED_COPY.some((pattern) => pattern.test(JSON.stringify(project)))) addFinding(findings, 'exclusion', 'project copy', 'no references to excluded or empty projects', project.id)
    if (!project.featured) continue

    try { validateVerifiedCommit(project.verifiedCommit) } catch {
      addFinding(findings, 'commit', 'verifiedCommit', 'a lowercase 40-character commit SHA', project.id)
    }

    const claimIds = new Set<string>()
    for (const kind of CLAIM_ORDER) {
      const claim = project.claims[kind]
      if (!claim || claim.kind !== kind || !claim.text.trim()) {
        addFinding(findings, 'claim', `claims.${kind}`, `a non-empty ${kind} claim with a matching kind`, project.id, claim?.id)
        continue
      }
      if (claimIds.has(claim.id)) addFinding(findings, 'claim', 'claim.id', 'a unique claim ID within the project', project.id, claim.id)
      claimIds.add(claim.id)
    }

    const evidenceIds = new Set<string>()
    const destinations = new Set<string>()
    const supportedClaimIds = new Set<string>()
    for (const evidence of project.evidence) {
      if (evidenceIds.has(evidence.id)) addFinding(findings, 'evidence', 'evidence.id', 'a unique evidence ID within the project', project.id, evidence.id)
      evidenceIds.add(evidence.id)
      if (globalEvidenceIds.has(evidence.id)) addFinding(findings, 'evidence', 'evidence.id', 'a globally unique evidence ID', project.id, evidence.id)
      globalEvidenceIds.add(evidence.id)
      if (!evidence.supports.length || evidence.supports.some((claimId) => !claimIds.has(claimId))) {
        addFinding(findings, 'evidence', 'supports', 'one or more claim IDs declared by the same project', project.id, evidence.id)
      }
      evidence.supports.filter((claimId) => claimIds.has(claimId)).forEach((claimId) => supportedClaimIds.add(claimId))
      if (evidence.kind === 'repository') {
        if (destinations.has('repository')) addFinding(findings, 'evidence', 'destination', 'no duplicate normalized destination', project.id, evidence.id)
        destinations.add('repository')
      } else {
        try {
          const destination = `path:${normalizeRepositoryPath(evidence.path)}`
          if (destinations.has(destination)) addFinding(findings, 'evidence', 'destination', 'no duplicate normalized destination', project.id, evidence.id)
          destinations.add(destination)
        } catch {
          addFinding(findings, 'destination', 'path', 'a repository-relative path without dot segments, query, or fragment', project.id, evidence.id)
        }
      }
    }
    for (const claimId of claimIds) {
      if (!supportedClaimIds.has(claimId)) addFinding(findings, 'evidence', 'claim coverage', 'every claim supported by at least one evidence record', project.id, claimId)
    }
    if (destinations.size < 2) addFinding(findings, 'evidence', 'destinations', 'at least two distinct evidence destinations', project.id)
  }

  const featuredIds = data.projects.filter((project) => project.featured).map((project) => project.id)
  if (featuredIds.length !== REQUIRED_FEATURED_IDS.length || REQUIRED_FEATURED_IDS.some((id) => !featuredIds.includes(id))) {
    addFinding(findings, 'featured set', 'projects', `exactly these seven featured IDs: ${REQUIRED_FEATURED_IDS.join(', ')}`)
  }
  for (const [groupName, skills] of Object.entries(data.skillGroups)) {
    for (const skill of skills) {
      for (const projectId of skill.projects) {
        if (!projectIds.has(projectId)) addFinding(findings, 'reference', `skillGroups.${groupName}.${skill.name}`, 'only existing project IDs', projectId)
      }
    }
  }
  for (const entry of data.profileTimeline) {
    for (const projectId of entry.projects ?? []) {
      if (!projectIds.has(projectId)) addFinding(findings, 'reference', `profileTimeline.${entry.title}`, 'only existing project IDs', projectId)
    }
  }
  if (DENIED_COPY.some((pattern) => pattern.test(JSON.stringify({ skillGroups: data.skillGroups, profileTimeline: data.profileTimeline })))) {
    addFinding(findings, 'exclusion', 'skills or profile timeline copy', 'no references to excluded projects')
  }
  return findings
}

export function assertPortfolioIntegrity(data: PortfolioDataInput = { profile: rawProfile, projects: rawProjects, skillGroups: rawSkillGroups, profileTimeline: rawProfileTimeline }) {
  const findings = validatePortfolioData(data)
  if (findings.length) throw new EvidenceValidationError(findings)
  return data
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const nested of Object.values(value as Record<string, unknown>)) deepFreeze(nested)
  }
  return value
}

const accepted = assertPortfolioIntegrity()

export const profile = deepFreeze(accepted.profile)
export const projects = deepFreeze(accepted.projects)
export const featuredProjects = deepFreeze(projects.filter((project): project is FeaturedProject => project.featured))
export const archiveProjects = deepFreeze(projects.filter((project): project is ArchiveProject => !project.featured))
export const projectFilters: readonly ('All' | ProjectCategory)[] = deepFreeze([
  'All',
  ...Array.from(new Set(projects.flatMap((project) => project.categories))),
])
export const skillGroups = deepFreeze(accepted.skillGroups)
export type SkillCategory = keyof typeof skillGroups
export const profileTimeline = deepFreeze(accepted.profileTimeline)

export const navigation = deepFreeze([
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const)

export const languages = deepFreeze([
  { name: 'Arabic', level: 'Spoken' },
  { name: 'English', level: 'Spoken' },
] as const)

export function getProjectDisplayNumber(project: Project) {
  return String(projects.findIndex((candidate) => candidate.id === project.id) + 1).padStart(2, '0')
}

export function isFeaturedProject(project: Project): project is FeaturedProject {
  return project.featured
}
