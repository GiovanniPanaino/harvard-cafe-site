function Header({ cartCount = 0, onOpenCart, isOrderPage = false }) {
  const links = [
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
      {isOrderPage ? (
        <button className="cart-button" type="button" onClick={onOpenCart}>
          Takeaway Cart <span>{cartCount}</span>
        </button>
      ) : (
        <a className="header-order-button" href="#/order">
          Order Take Away
        </a>
      )}
    </header>
  )
}

export default Header
