import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { consultingPreparationItems } from '../content/siteContent'
import { ConsultingPage } from '../pages/ConsultingPage'

describe('ConsultingPage', () => {
  it('renders preparation checklist, consulting hours, and final cta', () => {
    render(<ConsultingPage />)

    expect(screen.getByRole('heading', { name: '상담안내' })).toBeInTheDocument()
    expect(screen.getByText('상담 전 준비사항')).toBeInTheDocument()
    expect(screen.getByText(consultingPreparationItems[0])).toBeInTheDocument()
    expect(screen.getByText(consultingPreparationItems[2])).toBeInTheDocument()
    expect(screen.getByText('상담 가능 시간')).toBeInTheDocument()
    expect(screen.getByText('평일 10:00 ~ 21:00 / 토요일 10:00 ~ 16:00')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '카카오톡으로 상담 신청' })).toBeInTheDocument()
  })
})
