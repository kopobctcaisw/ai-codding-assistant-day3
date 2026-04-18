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
    const parsedUrl = new URL(KAKAO_CHANNEL_URL)

    expect(parsedUrl.protocol).toBe('https:')
  })

  it('has minimum landing content', () => {
    expect(curriculumHighlights.length).toBeGreaterThanOrEqual(3)
    expect(testimonials.length).toBeGreaterThanOrEqual(2)
    expect(programs.length).toBeGreaterThanOrEqual(2)
    expect(faqItems.length).toBeGreaterThanOrEqual(3)
  })

  it('ensures required string fields are non-empty after trim', () => {
    curriculumHighlights.forEach((item) => {
      expect(item.title.trim().length).toBeGreaterThan(0)
      expect(item.description.trim().length).toBeGreaterThan(0)
    })

    testimonials.forEach((item) => {
      expect(item.name.trim().length).toBeGreaterThan(0)
      expect(item.summary.trim().length).toBeGreaterThan(0)
    })

    programs.forEach((item) => {
      expect(item.name.trim().length).toBeGreaterThan(0)
      expect(item.target.trim().length).toBeGreaterThan(0)
      expect(item.outcome.trim().length).toBeGreaterThan(0)
    })

    faqItems.forEach((item) => {
      expect(item.question.trim().length).toBeGreaterThan(0)
      expect(item.answer.trim().length).toBeGreaterThan(0)
    })
  })

  it('keeps consultingHours in expected weekday and time format', () => {
    const consultingHoursPattern = /평일\s+\d{2}:\d{2}\s*~\s*\d{2}:\d{2}\s*\/\s*토요일\s+\d{2}:\d{2}\s*~\s*\d{2}:\d{2}/

    expect(consultingHours).toMatch(consultingHoursPattern)
  })
})
