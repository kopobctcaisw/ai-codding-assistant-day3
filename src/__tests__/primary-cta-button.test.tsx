import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PrimaryCTAButton } from '../components/PrimaryCTAButton'
import { KAKAO_CHANNEL_URL } from '../content/siteContent'

describe('PrimaryCTAButton', () => {
  it('renders external consult link with safe attributes', () => {
    render(<PrimaryCTAButton label="무료 상담 신청" />)

    const link = screen.getByRole('link', { name: '무료 상담 신청' })
    expect(link).toHaveAttribute('href', KAKAO_CHANNEL_URL)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })
})
