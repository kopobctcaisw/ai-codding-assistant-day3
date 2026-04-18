import { PrimaryCTAButton } from '../components/PrimaryCTAButton'
import { SectionTitle } from '../components/SectionTitle'
import { TestimonialCard } from '../components/TestimonialCard'
import { curriculumHighlights, homePageCtaBanners, testimonials } from '../content/siteContent'

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
        <article className="feature-card">
          <h3>{homePageCtaBanners[0].title}</h3>
          <p>{homePageCtaBanners[0].description}</p>
          <PrimaryCTAButton label={homePageCtaBanners[0].buttonLabel} />
        </article>
      </section>

      <section className="container section-block">
        <SectionTitle title="성과 후기" subtitle="실제 학습자의 변화 사례" />
        <div className="grid-2">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} name={item.name} summary={item.summary} />
          ))}
        </div>
      </section>

      <section className="container section-block">
        <article className="feature-card">
          <h3>{homePageCtaBanners[1].title}</h3>
          <p>{homePageCtaBanners[1].description}</p>
          <PrimaryCTAButton label={homePageCtaBanners[1].buttonLabel} />
        </article>
      </section>
    </>
  )
}
