import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('App routing', () => {
  it('renders homepage on /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '개인 맞춤 커리큘럼으로 실력을 완성하세요' })).toBeInTheDocument()
  })

  it('renders programs page on /programs', () => {
    render(
      <MemoryRouter initialEntries={['/programs']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '프로그램 안내' })).toBeInTheDocument()
  })

  it('renders consulting page on /consulting', () => {
    render(
      <MemoryRouter initialEntries={['/consulting']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '상담안내' })).toBeInTheDocument()
  })
})
