function Header({ cartCount, onOpenCart }) {
  const links = [
    ['Menu', '#menu'],
    ['Specials', '#specials'],
    ['Functions', '#functions'],
    ['Bookings', '#bookings'],
    ['History', '#history'],
    ['Contact', '#contact'],
  ]

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="The Harvard Cafe home">
        <span className="brand-mark">HC</span>
        <span>
          <strong>The Harvard Cafe</strong>
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
      <button className="cart-button" type="button" onClick={onOpenCart}>
        Takeaway Cart <span>{cartCount}</span>
      </button>
    </header>
  )
}

export default Header
