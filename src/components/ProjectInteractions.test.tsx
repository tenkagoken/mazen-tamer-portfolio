import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ProjectModal } from './ProjectModal'
import { Projects } from './Projects'
import { projects, type Project } from '../data/portfolio'

function ModalHarness() {
  const [project, setProject] = useState<Project | null>(null)
  return (
    <>
      <button type="button" onClick={() => setProject(projects[0])}>Open project</button>
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </>
  )
}

describe('project interactions', () => {
  it('wraps featured tab focus and keeps selection in sync', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    const tabs = screen.getAllByRole('tab')

    tabs[0].focus()
    await user.keyboard('{ArrowLeft}')
    expect(tabs.at(-1)).toHaveFocus()
    expect(tabs.at(-1)).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowRight}')
    expect(tabs[0]).toHaveFocus()
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')

    await user.click(screen.getByRole('button', { name: 'Web' }))
    expect(screen.getByText('Showing 2 of 7')).toBeInTheDocument()
  })

  it('locks scroll, traps focus, closes with Escape, and restores the opener', async () => {
    const user = userEvent.setup()
    render(<ModalHarness />)
    const opener = screen.getByRole('button', { name: 'Open project' })

    await user.click(opener)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close project details' })).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')

    await user.tab({ shift: true })
    expect(screen.getByRole('link', { name: /view repository/i })).toHaveFocus()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(document.body.style.overflow).toBe('')
    expect(opener).toHaveFocus()
  })
})
