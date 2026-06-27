import { contactDetails, emailHref } from '../data/contactDetails'

function Footer() {
  const socials = [
    ['Instagram', 'https://www.instagram.com/'],
    ['Facebook', 'https://www.facebook.com/'],
  ]

  return (
    <footer className="site-footer">
      <p>Harvard Cafe, Rand Airport, Germiston. Premium cafe dining with aviation atmosphere.</p>
      <nav className="footer-links" aria-label="Footer links">
        <a href={emailHref()}>Email</a>
        <a href={contactDetails.phoneHref}>Phone</a>
        <a href={contactDetails.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={contactDetails.mapHref} target="_blank" rel="noreferrer">Map</a>
        {socials.map(([label, href]) => (
          <a href={href} target="_blank" rel="noreferrer" key={label}>{label}</a>
        ))}
      </nav>
    </footer>
  )
}

export default Footer
