import { PrimaryCTAButton } from '../components/PrimaryCTAButton'
import { SectionTitle } from '../components/SectionTitle'
import { consultingHours, consultingPreparationItems, consultingSteps, consultingTargets } from '../content/siteContent'

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
          <h3>상담 전 준비사항</h3>
          <ul>
            {consultingPreparationItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
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
