import { describe, expect, it } from 'vitest'
import {
  KAKAO_CHANNEL_URL,
  consultingHours,
  curriculumHighlights,
  faqItems,
  programs,
  testimonials,
} from '../content/siteContent'

describe('siteContent', () => {
  it('uses a secure kakao channel url', () => {
    expect(KAKAO_CHANNEL_URL.startsWith('https://')).toBe(true)
  })

  it('has minimum landing content', () => {
    expect(curriculumHighlights.length).toBeGreaterThanOrEqual(3)
    expect(testimonials.length).toBeGreaterThanOrEqual(2)
    expect(programs.length).toBeGreaterThanOrEqual(2)
    expect(faqItems.length).toBeGreaterThanOrEqual(3)
    expect(consultingHours).toContain('평일')
  })
})
