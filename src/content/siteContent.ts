export type CurriculumHighlight = {
  title: string
  description: string
}

export type Testimonial = {
  name: string
  summary: string
}

export type Program = {
  name: string
  target: string
  outcome: string
}

export type FaqItem = {
  question: string
  answer: string
}

export const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_sample'

export const curriculumHighlights: readonly CurriculumHighlight[] = [
  {
    title: '정밀 진단 기반 설계',
    description: '현재 성취도와 목표 구간을 정교하게 분석해 개인별 커리큘럼을 설계합니다.',
  },
  {
    title: '주간 맞춤 코칭 리포트',
    description: '학습 로그를 바탕으로 강점은 확장하고 약점은 집중 보완하는 실행 가이드를 제공합니다.',
  },
  {
    title: '성과 중심 학습 운영',
    description: '진행 지표를 시각화해 개선 속도를 확인하고 다음 단계까지 일관되게 연결합니다.',
  },
]

export const testimonials: readonly Testimonial[] = [
  {
    name: '김OO',
    summary: '맞춤 커리큘럼 덕분에 흔들리던 학습 루틴이 안정됐고 목표 점수에 도달했습니다.',
  },
  {
    name: '이OO',
    summary: '매주 제공되는 피드백이 명확해 공부 우선순위가 선명해졌고 성적이 꾸준히 상승했습니다.',
  },
]

export const programs: readonly Program[] = [
  {
    name: 'Foundation Track',
    target: '기초 개념을 체계적으로 재정비하고 싶은 학습자',
    outcome: '핵심 개념 정착과 안정적인 학습 루틴 확립',
  },
  {
    name: 'Mastery Track',
    target: '상위권 도약과 고난도 문제 해결력을 강화하고 싶은 학습자',
    outcome: '실전 적용력 향상과 취약 영역의 정밀 보완',
  },
]

export const faqItems: readonly FaqItem[] = [
  {
    question: '초기 상담은 어떻게 진행되나요?',
    answer: '사전 문답과 목표 진단을 통해 현재 수준을 파악한 뒤 개인별 학습 로드맵을 제안합니다.',
  },
  {
    question: '비대면으로도 충분히 관리받을 수 있나요?',
    answer: '네. 카카오톡 채널 기반으로 주간 피드백, 과제 점검, 학습 코칭을 일관되게 제공합니다.',
  },
  {
    question: '상담 후 바로 등록해야 하나요?',
    answer: '아니요. 제안받은 커리큘럼을 충분히 검토한 뒤 시작 시점을 결정하실 수 있습니다.',
  },
]

export const consultingTargets: readonly string[] = [
  '학습 방향 설정이 필요한 예비 상위권 학습자',
  '단기간에 점수 구간을 끌어올려야 하는 학습자',
  '개인 맞춤 관리형 커리큘럼이 필요한 학습자',
]

export const consultingSteps: readonly string[] = [
  '카카오톡 채널 상담 신청',
  '현재 수준·목표 정밀 진단',
  '개인 맞춤 커리큘럼 제안 및 시작',
]

export const consultingHours = '평일 10:00 ~ 21:00 / 토요일 10:00 ~ 16:00'
