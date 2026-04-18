import { SectionTitle } from '../components/SectionTitle'
import { faqItems, learningProcessSteps, programs } from '../content/siteContent'

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
        <SectionTitle title="학습 프로세스" subtitle="진단→계획→실행→피드백으로 학습을 운영합니다." />
        <div className="grid-2">
          {learningProcessSteps.map((step) => (
            <article key={step.title} className="feature-card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
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
