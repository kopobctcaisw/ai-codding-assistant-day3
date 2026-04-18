import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from '../pages/HomePage'

describe('HomePage', () => {
  it('renders premium hero and key sections', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: '개인 맞춤 커리큘럼으로 실력을 완성하세요' })).toBeInTheDocument()
    expect(screen.getByText('정밀 진단 기반 설계')).toBeInTheDocument()
    expect(screen.getByText('성과 후기')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '지금 상담 시작하기' })).toBeInTheDocument()
  })
})
