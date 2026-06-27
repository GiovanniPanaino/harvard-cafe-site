function Header({ onOpenWhatsApp }) {
  const links = [
    ['Experience', '#experience'],
    ['Menu', '#menu-preview'],
    ['Functions', '#functions'],
    ['Gallery', '#gallery'],
    ['Contact', '#contact'],
  ]

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="The Harvard Cafe home">
        <span className="brand-mark">HC</span>
        <span>
          <strong>Harvard Cafe</strong>
          <small>Rand Airport, Germiston</small>
        </span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <button className="header-order-button" type="button" onClick={onOpenWhatsApp}>
        WhatsApp Us
      </button>
    </header>
  )
}

export default Header
