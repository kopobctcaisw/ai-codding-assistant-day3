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
