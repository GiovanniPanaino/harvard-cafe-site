import { useState } from 'react'

function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const links = [
    ['Experience', '#experience'],
    ['Menu', '#menu-preview'],
    ['Functions', '#functions'],
    ['Gallery', '#gallery'],
    ['Contact', '#contact'],
  ]

  return (
    <header className={`site-header ${navOpen ? 'nav-open' : ''}`}>
      <a className="brand" href="#top" aria-label="The Harvard Cafe home">
        <span className="brand-mark">HC</span>
        <span>
          <strong>Harvard Cafe</strong>
          <small>Rand Airport, Germiston</small>
        </span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={navOpen}
        onClick={() => setNavOpen((current) => !current)}
      >
        <span />
        <span />
      </button>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setNavOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
