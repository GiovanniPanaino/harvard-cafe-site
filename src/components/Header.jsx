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
      <a className="brand" href="#/" aria-label="The Harvard Cafe home">
        <span className="brand-logo-slot">
          {/* Future logo banner: <img src="/assets/images/harvard-logo-banner.webp" alt="The Harvard Cafe - Where time flies" /> */}
          <span className="brand-mark">HC</span>
        </span>
        <span className="brand-copy">
          <strong>The Harvard Cafe</strong>
          <small>Where time flies</small>
        </span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="btn btn-primary order-nav-button" href="#/order">Order Take Away</a>
        <button className="cart-button" type="button" onClick={onOpenCart}>
          Cart <span>{cartCount}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
