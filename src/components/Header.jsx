import headerBanner from '../images/banner3.webp'
import logoElipse from '../images/LogoElipse.webp'
import { contactDetails } from '../data/contact'

function Header({ compact = false }) {
  const links = [
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
      <a className="brand" href="#/" aria-label="The Harvard Café home">
        <img src={logoElipse} alt="The Harvard Café logo" className="brand-logo" fetchPriority="high" />
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
        <a className="btn btn-outline header-call" href={contactDetails.phonePrimary.href}>Call Harvard Café</a>
      </div>
    </header>
  )
}

export default Header
