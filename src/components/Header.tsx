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
