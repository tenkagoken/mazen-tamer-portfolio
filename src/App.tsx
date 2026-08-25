import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { BackToTop, Footer, ScrollProgress } from './components/SiteChrome'
import { navigation } from './data/portfolio'
import { useDocumentVisibility } from './hooks/useDocumentVisibility'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const documentVisible = useDocumentVisibility()

  useEffect(() => {
    const sections = navigation.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollProgress />
      <Navbar activeSection={activeSection} />
      <main id="main-content">
        <Hero documentVisible={documentVisible} />
        <Projects documentVisible={documentVisible} />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
