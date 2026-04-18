# 교육/학습 프리미엄 랜딩사이트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 개인 소비자(B2C) 대상 교육/학습 서비스용 3페이지 정적 랜딩사이트를 구축하고, 모든 핵심 전환을 카카오톡 채널 상담으로 연결한다.

**Architecture:** React + Vite 기반 단일 정적 앱에 React Router로 3개 페이지를 구성한다. 콘텐츠는 `src/content/siteContent.ts`로 분리해 운영 시 문구 수정만으로 업데이트 가능하게 한다. 공통 UI 컴포넌트와 프리미엄 디자인 토큰을 재사용해 페이지 일관성을 유지한다.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Vitest, React Testing Library

---

## 파일 구조 및 책임

- `src/content/siteContent.ts` — 카피/카드/FAQ/상담 데이터와 CTA URL 단일 소스
- `src/components/PrimaryCTAButton.tsx` — 공통 상담 CTA 버튼
- `src/components/SectionTitle.tsx` — 공통 섹션 제목
- `src/components/TestimonialCard.tsx` — 후기 카드
- `src/components/Header.tsx` — 상단 네비게이션 + 상단 CTA
- `src/components/Footer.tsx` — 하단 신뢰/저작권 영역
- `src/pages/HomePage.tsx` — 메인 페이지
- `src/pages/ProgramsPage.tsx` — 프로그램 페이지
- `src/pages/ConsultingPage.tsx` — 상담안내 페이지
- `src/App.tsx` — 공통 레이아웃 + 라우트 연결
- `src/main.tsx` — BrowserRouter 부트스트랩
- `src/index.css` — 프리미엄 톤 전역 스타일/반응형
- `src/__tests__/*.test.tsx` — 컴포넌트/페이지/라우팅 검증
- `src/test/setup.ts` — 테스트 환경 초기화
- `vite.config.ts` — Vitest 설정

---

### Task 1: 프로젝트/테스트 인프라 구축

**Files:**
- Create: `package.json`, `src/*` (Vite 기본 스캐폴드)
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`, `src/__tests__/setup-smoke.test.ts`
- Test: `src/__tests__/setup-smoke.test.ts`

- [ ] **Step 1: Vite React TypeScript 프로젝트 초기화**

Run: `npm create vite@latest . -- --template react-ts`
Expected: 현재 디렉터리에 React+TS 기본 파일 생성

- [ ] **Step 2: 의존성 설치**

Run: `npm install && npm install react-router-dom && npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
Expected: 설치 성공, `node_modules` 생성

- [ ] **Step 3: Vitest 설정 추가**

`vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})
```

- [ ] **Step 4: 테스트 셋업 파일 작성**

`src/test/setup.ts`
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: 스모크 테스트 작성**

`src/__tests__/setup-smoke.test.ts`
```ts
import { describe, expect, it } from 'vitest'

describe('test setup', () => {
  it('works', () => {
    expect(true).toBe(true)
  })
})
```

- [ ] **Step 6: 테스트 실행**

Run: `npm run test -- --run src/__tests__/setup-smoke.test.ts`
Expected: PASS 1 test

- [ ] **Step 7: 커밋**

```bash
git add package.json vite.config.ts src/test/setup.ts src/__tests__/setup-smoke.test.ts
git commit -m "chore: initialize react vite test infrastructure"
```

---

### Task 2: 콘텐츠 단일 소스(TDD)

**Files:**
- Create: `src/content/siteContent.ts`
- Create: `src/__tests__/site-content.test.ts`
- Test: `src/__tests__/site-content.test.ts`

- [ ] **Step 1: 실패하는 콘텐츠 테스트 작성**

`src/__tests__/site-content.test.ts`
```ts
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test -- --run src/__tests__/site-content.test.ts`
Expected: FAIL with "Cannot find module '../content/siteContent'"

- [ ] **Step 3: 최소 구현 작성**

`src/content/siteContent.ts`
```ts
export const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_sample'

export const curriculumHighlights = [
  {
    title: '학습 진단 기반 설계',
    description: '사전 진단으로 현재 수준을 파악하고 목표에 맞춘 학습 경로를 제공합니다.',
  },
  {
    title: '주간 맞춤 피드백',
    description: '학습 로그를 바탕으로 개인별 약점 보완 계획을 매주 업데이트합니다.',
  },
  {
    title: '실행 중심 관리',
    description: '학습량과 성취를 수치화해 실질적인 개선을 빠르게 확인합니다.',
  },
]

export const testimonials = [
  {
    name: '김OO',
    summary: '3개월 만에 목표 점수를 달성했습니다. 커리큘럼이 저에게 정확히 맞았습니다.',
  },
  {
    name: '이OO',
    summary: '막연했던 공부가 주간 계획으로 명확해졌고 꾸준히 실력이 올랐습니다.',
  },
]

export const programs = [
  {
    name: '입문 트랙',
    target: '기초를 빠르게 다지고 싶은 학습자',
    outcome: '핵심 개념 정착과 학습 루틴 형성',
  },
  {
    name: '심화 트랙',
    target: '고득점/고난도 대비가 필요한 학습자',
    outcome: '실전 적용력 강화와 약점 정밀 보완',
  },
]

export const faqItems = [
  {
    question: '상담은 얼마나 걸리나요?',
    answer: '평균 20~30분이며 현재 수준과 목표를 중심으로 진행됩니다.',
  },
  {
    question: '비대면 상담도 가능한가요?',
    answer: '네, 카카오톡 채널 기반으로 비대면 상담이 가능합니다.',
  },
  {
    question: '상담 후 바로 시작해야 하나요?',
    answer: '아니요. 상담 후 충분히 검토한 뒤 시작하셔도 됩니다.',
  },
]

export const consultingTargets = [
  '학습 방향이 불명확한 초중급 학습자',
  '단기간 성과 향상이 필요한 학습자',
  '개인별 학습 코칭이 필요한 학습자',
]

export const consultingSteps = [
  '카카오톡 채널로 상담 신청',
  '현재 수준/목표 진단',
  '개인 맞춤 커리큘럼 제안',
]

export const consultingHours = '평일 10:00 ~ 21:00 / 토요일 10:00 ~ 16:00'
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm run test -- --run src/__tests__/site-content.test.ts`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/content/siteContent.ts src/__tests__/site-content.test.ts
git commit -m "feat: add centralized landing content source"
```

---

### Task 3: 공통 CTA 버튼(TDD)

**Files:**
- Create: `src/components/PrimaryCTAButton.tsx`
- Create: `src/__tests__/primary-cta-button.test.tsx`
- Test: `src/__tests__/primary-cta-button.test.tsx`

- [ ] **Step 1: 실패하는 CTA 버튼 테스트 작성**

`src/__tests__/primary-cta-button.test.tsx`
```tsx
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test -- --run src/__tests__/primary-cta-button.test.tsx`
Expected: FAIL with "Cannot find module '../components/PrimaryCTAButton'"

- [ ] **Step 3: 최소 구현 작성**

`src/components/PrimaryCTAButton.tsx`
```tsx
import { KAKAO_CHANNEL_URL } from '../content/siteContent'

type PrimaryCTAButtonProps = {
  label: string
  className?: string
}

export function PrimaryCTAButton({ label, className }: PrimaryCTAButtonProps) {
  const classes = ['cta-button', className].filter(Boolean).join(' ')

  return (
    <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer" className={classes}>
      {label}
    </a>
  )
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm run test -- --run src/__tests__/primary-cta-button.test.tsx`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/components/PrimaryCTAButton.tsx src/__tests__/primary-cta-button.test.tsx
git commit -m "feat: add reusable kakao consultation cta button"
```

---

### Task 4: 공통 레이아웃/디자인 시스템(TDD)

**Files:**
- Create: `src/components/SectionTitle.tsx`
- Create: `src/components/TestimonialCard.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/index.css`
- Create: `src/__tests__/layout-components.test.tsx`
- Test: `src/__tests__/layout-components.test.tsx`

- [ ] **Step 1: 실패하는 레이아웃 컴포넌트 테스트 작성**

`src/__tests__/layout-components.test.tsx`
```tsx
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test -- --run src/__tests__/layout-components.test.tsx`
Expected: FAIL with "Cannot find module '../components/Header'"

- [ ] **Step 3: 최소 구현 작성**

`src/components/SectionTitle.tsx`
```tsx
type SectionTitleProps = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="section-title">
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  )
}
```

`src/components/TestimonialCard.tsx`
```tsx
type TestimonialCardProps = {
  name: string
  summary: string
}

export function TestimonialCard({ name, summary }: TestimonialCardProps) {
  return (
    <article className="testimonial-card">
      <p>{summary}</p>
      <p className="testimonial-name">{name}</p>
    </article>
  )
}
```

`src/components/Header.tsx`
```tsx
import { NavLink } from 'react-router-dom'
import { PrimaryCTAButton } from './PrimaryCTAButton'

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          Personalized Learning Studio
        </NavLink>
        <nav className="nav">
          <NavLink to="/">홈</NavLink>
          <NavLink to="/programs">프로그램</NavLink>
          <NavLink to="/consulting">상담안내</NavLink>
        </nav>
        <PrimaryCTAButton label="무료 상담 신청" />
      </div>
    </header>
  )
}
```

`src/components/Footer.tsx`
```tsx
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>Personalized Learning Studio</p>
        <p>© 2026 All rights reserved.</p>
      </div>
    </footer>
  )
}
```

`src/index.css`
```css
:root {
  --color-bg: #f8f9fc;
  --color-surface: #ffffff;
  --color-primary: #0f1f3d;
  --color-accent: #b9933f;
  --color-text: #121826;
  --color-muted: #4b5563;
  --container: 1120px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  width: min(100% - 2rem, var(--container));
  margin-inline: auto;
}

.site-header {
  position: sticky;
  top: 0;
  backdrop-filter: blur(8px);
  background: rgba(248, 249, 252, 0.92);
  border-bottom: 1px solid #e5e7eb;
}

.header-inner {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  font-weight: 700;
  color: var(--color-primary);
}

.nav {
  display: flex;
  gap: 1rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
}

.cta-button:focus-visible,
a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

.section-title {
  margin-bottom: 1.25rem;
}

.section-eyebrow {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title h2 {
  margin: 0.35rem 0;
  color: var(--color-primary);
}

.section-subtitle {
  margin: 0;
  color: var(--color-muted);
}

.testimonial-card {
  background: var(--color-surface);
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 1rem;
}

.testimonial-name {
  margin-top: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
}

.site-footer {
  margin-top: 4rem;
  border-top: 1px solid #e5e7eb;
  background: #fff;
}

.footer-inner {
  padding: 1.5rem 0;
  color: var(--color-muted);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

@media (max-width: 768px) {
  .header-inner {
    flex-wrap: wrap;
    padding: 0.75rem 0;
  }

  .nav {
    width: 100%;
    justify-content: space-between;
  }

  .footer-inner {
    flex-direction: column;
  }
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm run test -- --run src/__tests__/layout-components.test.tsx`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/components/SectionTitle.tsx src/components/TestimonialCard.tsx src/components/Header.tsx src/components/Footer.tsx src/index.css src/__tests__/layout-components.test.tsx
git commit -m "feat: add shared layout components and premium design tokens"
```

---

### Task 5: 메인 페이지 구현(TDD)

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/__tests__/home-page.test.tsx`
- Test: `src/__tests__/home-page.test.tsx`

- [ ] **Step 1: 실패하는 메인 페이지 테스트 작성**

`src/__tests__/home-page.test.tsx`
```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from '../pages/HomePage'

describe('HomePage', () => {
  it('renders premium hero and key sections', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: '개인 맞춤 커리큘럼으로 실력을 완성하세요' })).toBeInTheDocument()
    expect(screen.getByText('학습 진단 기반 설계')).toBeInTheDocument()
    expect(screen.getByText('성과 후기')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '지금 상담 시작하기' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test -- --run src/__tests__/home-page.test.tsx`
Expected: FAIL with "Cannot find module '../pages/HomePage'"

- [ ] **Step 3: 최소 구현 작성**

`src/pages/HomePage.tsx`
```tsx
import { PrimaryCTAButton } from '../components/PrimaryCTAButton'
import { SectionTitle } from '../components/SectionTitle'
import { TestimonialCard } from '../components/TestimonialCard'
import { curriculumHighlights, testimonials } from '../content/siteContent'

export function HomePage() {
  return (
    <>
      <section className="hero container">
        <p className="hero-eyebrow">Premium Learning</p>
        <h1>개인 맞춤 커리큘럼으로 실력을 완성하세요</h1>
        <p>진단부터 실행까지, 학습자에게 맞춘 고밀도 설계를 제공합니다.</p>
        <PrimaryCTAButton label="지금 상담 시작하기" />
      </section>

      <section className="container section-block">
        <SectionTitle title="개인 맞춤 학습 설계" subtitle="목표와 현재 수준을 기반으로 최적 경로를 제시합니다." />
        <div className="grid-3">
          {curriculumHighlights.map((item) => (
            <article key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionTitle title="성과 후기" subtitle="실제 학습자의 변화 사례" />
        <div className="grid-2">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} name={item.name} summary={item.summary} />
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: 스타일 최소 보강**

`src/index.css`에 아래 블록 추가:
```css
main {
  min-height: calc(100vh - 72px - 96px);
}

.hero {
  padding: 5rem 0 3rem;
}

.hero-eyebrow {
  margin: 0;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
}

.hero h1 {
  margin: 0.75rem 0;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-primary);
}

.section-block {
  margin-top: 3rem;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.feature-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 1rem;
}

@media (max-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .grid-3,
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm run test -- --run src/__tests__/home-page.test.tsx`
Expected: PASS

- [ ] **Step 6: 커밋**

```bash
git add src/pages/HomePage.tsx src/index.css src/__tests__/home-page.test.tsx
git commit -m "feat: implement homepage sections for premium landing"
```

---

### Task 6: 프로그램 페이지 구현(TDD)

**Files:**
- Create: `src/pages/ProgramsPage.tsx`
- Create: `src/__tests__/programs-page.test.tsx`
- Test: `src/__tests__/programs-page.test.tsx`

- [ ] **Step 1: 실패하는 프로그램 페이지 테스트 작성**

`src/__tests__/programs-page.test.tsx`
```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProgramsPage } from '../pages/ProgramsPage'

describe('ProgramsPage', () => {
  it('renders program cards and faq', () => {
    render(<ProgramsPage />)

    expect(screen.getByRole('heading', { name: '프로그램 안내' })).toBeInTheDocument()
    expect(screen.getByText('입문 트랙')).toBeInTheDocument()
    expect(screen.getByText('심화 트랙')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '자주 묻는 질문' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test -- --run src/__tests__/programs-page.test.tsx`
Expected: FAIL with "Cannot find module '../pages/ProgramsPage'"

- [ ] **Step 3: 최소 구현 작성**

`src/pages/ProgramsPage.tsx`
```tsx
import { SectionTitle } from '../components/SectionTitle'
import { faqItems, programs } from '../content/siteContent'

export function ProgramsPage() {
  return (
    <>
      <section className="container section-block">
        <SectionTitle
          eyebrow="Programs"
          title="프로그램 안내"
          subtitle="학습 목표와 수준에 맞춘 트랙을 제안합니다."
        />
        <div className="grid-2">
          {programs.map((program) => (
            <article key={program.name} className="feature-card">
              <h3>{program.name}</h3>
              <p>대상: {program.target}</p>
              <p>성과: {program.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionTitle title="자주 묻는 질문" />
        <div className="faq-list">
          {faqItems.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: 스타일 최소 보강**

`src/index.css`에 아래 블록 추가:
```css
.faq-list {
  display: grid;
  gap: 0.75rem;
}

.faq-list details {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.85rem 1rem;
}

.faq-list summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--color-primary);
}

.faq-list p {
  margin: 0.6rem 0 0;
  color: var(--color-muted);
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm run test -- --run src/__tests__/programs-page.test.tsx`
Expected: PASS

- [ ] **Step 6: 커밋**

```bash
git add src/pages/ProgramsPage.tsx src/index.css src/__tests__/programs-page.test.tsx
git commit -m "feat: add programs page with faq section"
```

---

### Task 7: 상담안내 페이지 구현(TDD)

**Files:**
- Create: `src/pages/ConsultingPage.tsx`
- Create: `src/__tests__/consulting-page.test.tsx`
- Test: `src/__tests__/consulting-page.test.tsx`

- [ ] **Step 1: 실패하는 상담안내 페이지 테스트 작성**

`src/__tests__/consulting-page.test.tsx`
```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ConsultingPage } from '../pages/ConsultingPage'

describe('ConsultingPage', () => {
  it('renders consulting targets, steps, hours and final cta', () => {
    render(<ConsultingPage />)

    expect(screen.getByRole('heading', { name: '상담안내' })).toBeInTheDocument()
    expect(screen.getByText('상담 가능 시간')).toBeInTheDocument()
    expect(screen.getByText('평일 10:00 ~ 21:00 / 토요일 10:00 ~ 16:00')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '카카오톡으로 상담 신청' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test -- --run src/__tests__/consulting-page.test.tsx`
Expected: FAIL with "Cannot find module '../pages/ConsultingPage'"

- [ ] **Step 3: 최소 구현 작성**

`src/pages/ConsultingPage.tsx`
```tsx
import { PrimaryCTAButton } from '../components/PrimaryCTAButton'
import { SectionTitle } from '../components/SectionTitle'
import { consultingHours, consultingSteps, consultingTargets } from '../content/siteContent'

export function ConsultingPage() {
  return (
    <>
      <section className="container section-block">
        <SectionTitle
          eyebrow="Consulting"
          title="상담안내"
          subtitle="현재 수준 진단부터 맞춤 제안까지 빠르게 안내합니다."
        />

        <div className="grid-2">
          <article className="feature-card">
            <h3>상담 대상</h3>
            <ul>
              {consultingTargets.map((target) => (
                <li key={target}>{target}</li>
              ))}
            </ul>
          </article>

          <article className="feature-card">
            <h3>상담 절차</h3>
            <ol>
              {consultingSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section className="container section-block">
        <article className="feature-card">
          <h3>상담 가능 시간</h3>
          <p>{consultingHours}</p>
          <PrimaryCTAButton label="카카오톡으로 상담 신청" />
        </article>
      </section>
    </>
  )
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm run test -- --run src/__tests__/consulting-page.test.tsx`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/pages/ConsultingPage.tsx src/__tests__/consulting-page.test.tsx
git commit -m "feat: add consulting guide page with unified cta"
```

---

### Task 8: 라우팅 통합 및 최종 검증(TDD)

**Files:**
- Modify: `src/App.tsx`, `src/main.tsx`
- Create: `src/__tests__/app-routing.test.tsx`
- Test: `src/__tests__/app-routing.test.tsx`

- [ ] **Step 1: 실패하는 라우팅 테스트 작성**

`src/__tests__/app-routing.test.tsx`
```tsx
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test -- --run src/__tests__/app-routing.test.tsx`
Expected: FAIL with route/headings mismatch

- [ ] **Step 3: 최소 구현 작성**

`src/App.tsx`
```tsx
import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ConsultingPage } from './pages/ConsultingPage'
import { HomePage } from './pages/HomePage'
import { ProgramsPage } from './pages/ProgramsPage'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
```

`src/main.tsx`
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 4: 라우팅 테스트 통과 확인**

Run: `npm run test -- --run src/__tests__/app-routing.test.tsx`
Expected: PASS

- [ ] **Step 5: 전체 테스트 실행**

Run: `npm run test -- --run`
Expected: 모든 테스트 PASS

- [ ] **Step 6: 프로덕션 빌드 검증**

Run: `npm run build`
Expected: `dist/` 생성, build success 메시지 출력

- [ ] **Step 7: 커밋**

```bash
git add src/App.tsx src/main.tsx src/__tests__/app-routing.test.tsx
git commit -m "feat: wire routes and finalize static landing flow"
```

---

## 자체 점검 결과

- Spec coverage: 목표/범위/3페이지/공통 CTA/반응형/접근성/테스트/빌드 요구사항을 Task 1~8에 매핑 완료
- Placeholder scan: TBD/TODO/모호 문구 없음
- Type consistency: `KAKAO_CHANNEL_URL`, 페이지/컴포넌트 명칭, 테스트 import 경로 일관성 확인
