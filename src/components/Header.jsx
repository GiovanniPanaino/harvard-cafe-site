import headerBanner from '../images/banner3.png'
import logoElipse from '../images/LogoElipse.png'
import { contactDetails } from '../data/contact'

function Header({ compact = false }) {
  const links = [
    ['Home', '#/'],
    ['Menu', '#menu'],
    ['Gallery', '#gallery'],
    ['Functions', '#functions'],
    ['Contact', '#contact'],
  ]

  return (
    <header
      className={compact ? 'site-header compact' : 'site-header'}
      style={{ '--header-banner-image': `url(${headerBanner})` }}
    >
      <a className="brand" href="#/" aria-label="The Harvard Cafe home">
        <img src={logoElipse} alt="The Harvard Cafe logo" className="brand-logo" />
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="btn btn-primary" href="#menu">View Menu</a>
        <a className="btn btn-outline header-call" href={contactDetails.phonePrimary.href}>Call Harvard Cafe</a>
      </div>
    </header>
  )
}

export default Header
