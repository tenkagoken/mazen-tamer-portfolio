export type ProjectId = 'huffman' | 'cipher' | 'exam-management' | 'library-management' | 'windows-game' | 'cpu-scheduler' | 'survey-platform'
export type ProjectCategory = 'Algorithms' | 'Systems' | 'Software Engineering' | 'Game Development' | 'Web'

export interface Project {
  id: ProjectId
  number: string
  repoName: string
  title: string
  shortTitle: string
  repository: string
  primaryLanguage?: string
  languages: string[]
  technologies: string[]
  categories: ProjectCategory[]
  featured: boolean
  status?: string
  accent: 'cyan' | 'violet' | 'lime' | 'amber' | 'rose' | 'slate'
  summary: string
  overview: string
  whatItDoes: string[]
  highlights: string[]
  concepts: string[]
  evidenceNote?: string
  media?: { src: string; alt: string; kind: 'sprite-sheet' }
}

export interface Skill {
  name: string
  note?: string
  projects: ProjectId[]
}

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const

export const profile = {
  displayName: 'Mazen Eladawy',
  fullName: 'Mazen Tamer Elsayed Ahmed Eladawy',
  email: 'mazentamerelsay@gmail.com',
  githubUsername: 'tenkagoken',
  githubUrl: 'https://github.com/tenkagoken',
  linkedinUrl: 'https://www.linkedin.com/in/mazen-tamer-35b993345',
  university: 'October University for Modern Sciences and Arts (MSA), Egypt',
  graduation: '2028',
  gpa: '3.55 / 4.00',
}

// Static, source-verified metadata keeps essential content independent of the GitHub API.
export const projects: Project[] = [
  {
    id: 'huffman', number: '01', repoName: 'huffman-compression-algorithm',
    title: 'Huffman Compression Algorithm', shortTitle: 'Huffman',
    repository: 'https://github.com/tenkagoken/huffman-compression-algorithm',
    primaryLanguage: 'C++', languages: ['C++'],
    technologies: ['C++', 'Binary I/O', 'Huffman Trees', 'Bit Packing'],
    categories: ['Algorithms', 'Systems'], featured: true, accent: 'cyan',
    summary: 'A C++ compressor and decompressor for WAV, AVI, BMP, and TXT files built around Huffman coding.',
    overview: 'The program reads binary file data, counts byte frequencies, constructs a Huffman tree, generates prefix codes, and writes a compact bit-packed payload with the code table needed for reconstruction.',
    whatItDoes: [
      'Generates a frequency table from the input file’s bytes.',
      'Builds and traverses a binary Huffman tree to assign 0/1 codes.',
      'Compresses the encoded bit stream and reconstructs the original binary file.',
      'Handles WAV, AVI, BMP, and TXT input as binary data.',
    ],
    highlights: ['Byte-frequency analysis', 'Sorted linked-list tree construction', 'Prefix-code generation', 'Binary stream packing'],
    concepts: ['Trees', 'Encoding', 'Compression', 'Binary files'],
  },
  {
    id: 'cipher', number: '02', repoName: 'monoalphabetic-cypher',
    title: 'Monoalphabetic Cipher', shortTitle: 'Cipher',
    repository: 'https://github.com/tenkagoken/monoalphabetic-cypher',
    primaryLanguage: 'Assembly', languages: ['MIPS Assembly'],
    technologies: ['MIPS Assembly', 'MARS Syscalls', 'Character Mapping'],
    categories: ['Systems', 'Algorithms'], featured: true, accent: 'lime',
    summary: 'A MIPS Assembly implementation that expands a user key, encrypts letter input, and reverses the substitution on demand.',
    overview: 'The program validates letter-only input, removes duplicate key characters, appends unused alphabet characters to create a complete substitution key, and handles encryption and decryption for uppercase and lowercase letters.',
    whatItDoes: [
      'Accepts a text message and a user-supplied cipher key.',
      'Validates input and builds a complete 26-character substitution alphabet.',
      'Encrypts and decrypts while preserving letter case.',
      'Supports repeated messages within the same program session.',
    ],
    highlights: ['Key expansion', 'Duplicate removal', 'Character substitution', 'Reversible mapping'],
    concepts: ['Assembly', 'Encryption', 'Decryption', 'Input validation'],
  },
  {
    id: 'exam-management', number: '03', repoName: 'Examination-Management-System',
    title: 'Examination Management System', shortTitle: 'Examination',
    repository: 'https://github.com/tenkagoken/Examination-Management-System',
    primaryLanguage: 'C#', languages: ['C#'],
    technologies: ['C#', '.NET 10', 'File I/O', 'Generics', 'Events & Delegates'],
    categories: ['Software Engineering', 'Systems'], featured: true, accent: 'violet',
    summary: 'A C# console system for creating, persisting, taking, and scoring practice or final examinations.',
    overview: 'Instructor mode creates subject-based practice or final exams with true/false, choose-one, and choose-all questions. Student mode reloads them from text files, registers exam-start notifications, records answers, calculates a score, and reveals practice answers.',
    whatItDoes: [
      'Creates practice and final exams from an instructor workflow.',
      'Supports true/false, single-answer, and multiple-answer questions.',
      'Persists question banks by subject code and reloads them for students.',
      'Tracks exam state, notifies enrolled students, and calculates results.',
    ],
    highlights: ['Abstract exam and question hierarchies', 'Delegates and exam-start events', 'Generic constrained exam collection', 'Text-file question persistence'],
    concepts: ['OOP', 'Events', 'Generics', 'File handling'],
    evidenceNote: 'No README or repository description is published; details were verified directly from the C# source and .NET project file.',
  },
  {
    id: 'library-management', number: '04', repoName: 'Library-Management-System',
    title: 'Library Management System', shortTitle: 'Library System',
    repository: 'https://github.com/tenkagoken/Library-Management-System',
    primaryLanguage: 'C#', languages: ['C#'],
    technologies: ['C#', '.NET 10', 'Object-Oriented Programming', 'Generic Collections'],
    categories: ['Software Engineering', 'Systems'], featured: true, accent: 'amber',
    summary: 'A menu-driven C# library system that models books, members, librarians, borrowing, search, and availability.',
    overview: 'The console application maintains in-memory collections for books, members, and librarians. Its manager coordinates add, find, list, and borrow operations while each domain class owns its details and availability state.',
    whatItDoes: [
      'Adds and lists books, library members, and librarians.',
      'Finds books by ID or title and members by ID or name.',
      'Associates borrowed books with members and updates availability.',
      'Reports individual borrowing relationships and available-book counts.',
    ],
    highlights: ['Encapsulated domain models', 'Collection-backed state', 'Borrowing state transitions', 'Menu-driven console workflow'],
    concepts: ['OOP', 'Collections', 'Search', 'State management'],
    evidenceNote: 'No README or repository description is published; details were verified directly from the C# source and .NET project file.',
  },
  {
    id: 'windows-game', number: '05', repoName: 'C-windowsformapp-game',
    title: 'C# Windows Forms Platformer', shortTitle: 'Windows Platformer',
    repository: 'https://github.com/tenkagoken/C-windowsformapp-game',
    primaryLanguage: 'C#', languages: ['C#'],
    technologies: ['C#', '.NET Framework 4.7.2', 'Windows Forms', 'GDI+', 'System.Drawing'],
    categories: ['Game Development', 'Software Engineering'], featured: true, accent: 'rose',
    summary: 'A custom side-scrolling platformer built directly with C# Windows Forms, timers, and GDI+ rendering.',
    overview: 'The project implements its own update timers, off-screen rendering, keyboard input, camera scrolling, hero state machine, platforms, ladders, moving platforms, enemy collisions, ranged attacks, health, level loading, and boss logic without a game engine.',
    whatItDoes: [
      'Runs a custom timer-driven update and rendering loop.',
      'Handles movement, jumping, ladders, platforms, camera scrolling, and collisions.',
      'Implements melee, projectile, and beam attacks plus enemy behavior.',
      'Tracks hero and boss health, level transitions, summons, and win/lose states.',
    ],
    highlights: ['Off-screen GDI+ rendering', 'Finite-state player control', 'Collision and platform systems', 'Boss and projectile logic'],
    concepts: ['Custom game loop', '2D rendering', 'Collision detection', 'State machines'],
    evidenceNote: 'No README or repository description is published; details were verified directly from the Windows Forms and C# source.',
  },
  {
    id: 'cpu-scheduler', number: '06', repoName: 'cpu-scheduling-algorithm-simulation',
    title: 'CPU Scheduling Visualizer', shortTitle: 'CPU Scheduler',
    repository: 'https://github.com/tenkagoken/cpu-scheduling-algorithm-simulation',
    primaryLanguage: 'JavaScript', languages: ['JavaScript', 'HTML', 'CSS'],
    technologies: ['JavaScript', 'HTML', 'CSS', 'Process Scheduling'],
    categories: ['Algorithms', 'Systems', 'Web'], featured: false, accent: 'violet',
    summary: 'A browser-based simulator for comparing CPU scheduling algorithms through calculated metrics and animated process flow.',
    overview: 'The interface accepts process IDs, burst times, priorities, and a Round Robin quantum, then moves processes between Queue, CPU, and Done states while reporting waiting and turnaround times.',
    whatItDoes: [
      'Simulates FCFS, SJF, Priority, Round Robin, Preemptive SJF, and Preemptive Priority.',
      'Calculates per-process waiting and turnaround times plus their averages.',
      'Animates process movement through queue, execution, and completion states.',
      'Compares supported non-quantum runs by average waiting time.',
    ],
    highlights: ['Six scheduler implementations', 'Preemptive execution steps', 'Round Robin quantum', 'Animated process lifecycle'],
    concepts: ['CPU scheduling', 'Queues', 'Preemption', 'Turnaround time'],
    evidenceNote: 'No README or repository description is published; details were verified directly from the HTML and JavaScript source.',
  },
  {
    id: 'survey-platform', number: '07', repoName: 'lebaladnas-survey-helper',
    title: 'Lebaladna Survey Platform', shortTitle: 'Survey Platform',
    repository: 'https://github.com/tenkagoken/lebaladnas-survey-helper',
    primaryLanguage: 'PHP', languages: ['PHP', 'CSS', 'JavaScript', 'SQL'],
    technologies: ['PHP', 'MySQL', 'PDO', 'JavaScript', 'Chart.js'],
    categories: ['Web'], featured: false, accent: 'rose',
    summary: 'A role-based PHP and MySQL survey platform for building, assigning, completing, analyzing, and exporting surveys.',
    overview: 'The application separates admin, analyst, and member workflows. It uses PDO prepared statements, sessions, CSRF verification, password hashing, a drag-and-drop survey builder, response analytics, and CSV/PDF reporting.',
    whatItDoes: [
      'Provides separate admin, analyst, and member dashboards.',
      'Builds reorderable surveys across seven supported question types.',
      'Assigns surveys to members and stores draft or submitted responses.',
      'Analyzes answers with charts and supports CSV and PDF exports.',
    ],
    highlights: ['Role-based access', 'Survey builder', 'Prepared database queries', 'Analytics and exports'],
    concepts: ['MVC-style structure', 'Authentication', 'Relational data', 'Reporting'],
    evidenceNote: 'No README or repository description is published; details were verified directly from the PHP, SQL, CSS, and JavaScript source.',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const projectFilters: Array<'All' | ProjectCategory> = ['All', 'Algorithms', 'Systems', 'Software Engineering', 'Web', 'Game Development']

const defineSkills = (skills: Skill[]) => skills

export const skillGroups = {
  Programming: defineSkills([
    { name: 'C++', projects: ['huffman'] },
    { name: 'C#', projects: ['exam-management', 'library-management', 'windows-game'] },
    { name: '.NET', projects: ['exam-management', 'library-management', 'windows-game'] },
    { name: 'JavaScript', projects: ['cpu-scheduler', 'survey-platform'] },
    { name: 'PHP', projects: ['survey-platform'] },
    { name: 'MIPS Assembly', projects: ['cipher'] },
  ]),
  Web: defineSkills([
    { name: 'HTML', projects: ['cpu-scheduler', 'survey-platform'] },
    { name: 'CSS', projects: ['cpu-scheduler', 'survey-platform'] },
    { name: 'JavaScript', projects: ['cpu-scheduler', 'survey-platform'] },
    { name: 'PHP', projects: ['survey-platform'] },
    { name: 'MySQL', projects: ['survey-platform'] },
  ]),
  'Game Dev': defineSkills([
    { name: 'Windows Forms', projects: ['windows-game'] },
    { name: 'GDI+', projects: ['windows-game'] },
    { name: 'Custom Game Loop', projects: ['windows-game'] },
    { name: '2D Collision Detection', projects: ['windows-game'] },
    { name: 'State Machines', projects: ['windows-game'] },
  ]),
  Engineering: defineSkills([
    { name: 'Object-Oriented Programming', projects: ['exam-management', 'library-management', 'windows-game'] },
    { name: 'File Handling', projects: ['huffman', 'exam-management'] },
    { name: 'Events & Delegates', projects: ['exam-management'] },
    { name: 'Generics', projects: ['exam-management', 'library-management'] },
    { name: 'Collections', projects: ['exam-management', 'library-management', 'windows-game'] },
    { name: 'Algorithms', projects: ['huffman', 'cipher', 'cpu-scheduler'] },
  ]),
  Tools: defineSkills([
    { name: 'Git', projects: projects.map((project) => project.id) },
    { name: 'GitHub', note: 'Foundational knowledge', projects: projects.map((project) => project.id) },
    { name: 'VS Code', projects: [] },
    { name: 'Visual Studio', projects: ['exam-management', 'library-management', 'windows-game'] },
  ]),
} satisfies Record<string, Skill[]>

export type SkillCategory = keyof typeof skillGroups

export const journey = [
  { label: 'Foundation', title: 'Computer Science Degree', text: `Studying at ${profile.university}. Expected graduation: ${profile.graduation}.` },
  { label: 'Experience · 2023–2024', title: 'IGCSE Mathematics Tutor', text: 'Taught O Level mathematics through structured explanations and step-by-step problem solving.' },
  { label: 'Algorithms', title: 'Compression & Scheduling', text: 'Implemented Huffman coding in C++ and six CPU scheduling simulations in JavaScript.' },
  { label: 'Low level', title: 'Encryption in Assembly', text: 'Built a key-driven monoalphabetic cipher in MIPS Assembly.' },
  { label: 'Software design', title: 'Examination & Library Systems', text: 'Modeled two console systems in C# with OOP, collections, generics, events, and file handling.' },
  { label: 'Full stack', title: 'Survey Systems', text: 'Built role-based survey workflows with PHP, MySQL, JavaScript, analytics, and exports.' },
  { label: 'Game engineering', title: 'Custom Windows Forms Platformer', text: 'Built timer-driven rendering, collision, combat, and boss systems directly with C#, Windows Forms, and GDI+.' },
]

export const languages = [
  { name: 'Arabic', level: 'Spoken' },
  { name: 'English', level: 'Spoken' },
]
