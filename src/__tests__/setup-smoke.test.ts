import { describe, expect, it } from 'vitest'

describe('test setup', () => {
  it('works with jest-dom matcher in jsdom', () => {
    const element = document.createElement('div')
    document.body.append(element)

    expect(element).toBeInTheDocument()
  })
})
