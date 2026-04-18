import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

describe('layout components', () => {
  it('shows primary navigation and header cta', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: '홈' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '프로그램' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '상담안내' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '무료 상담 신청' })).toBeInTheDocument()
  })

  it('shows footer trust copy', () => {
    render(<Footer />)
    expect(screen.getByText('Personalized Learning Studio')).toBeInTheDocument()
  })
})
