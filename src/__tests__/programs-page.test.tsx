import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { programs } from '../content/siteContent'
import { ProgramsPage } from '../pages/ProgramsPage'

describe('ProgramsPage', () => {
  it('renders program cards and faq section', () => {
    render(<ProgramsPage />)

    expect(screen.getByRole('heading', { name: '프로그램 안내' })).toBeInTheDocument()
    expect(screen.getByText(programs[0].name)).toBeInTheDocument()
    expect(screen.getByText(programs[1].name)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '자주 묻는 질문' })).toBeInTheDocument()
  })
})
