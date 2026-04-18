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
