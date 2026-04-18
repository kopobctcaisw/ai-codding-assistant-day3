import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppRouter } from '../AppRouter'

describe('AppRouter basename', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/ai-codding-assistant-day3/')
  })

  it('renders home when app is hosted under repository base path', () => {
    render(<AppRouter basename="/ai-codding-assistant-day3/" />)

    expect(screen.getByRole('heading', { name: '개인 맞춤 커리큘럼으로 실력을 완성하세요' })).toBeInTheDocument()
  })
})
