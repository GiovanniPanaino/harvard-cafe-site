import { contactDetails, emailHref } from '../data/contactDetails'

function Footer() {
  const socials = [
    ['Instagram', 'https://www.instagram.com/'],
    ['Facebook', 'https://www.facebook.com/'],
  ]

  return (
    <footer className="site-footer">
      <div className="footer-column footer-brand">
        <span className="footer-title">Harvard Cafe</span>
        <p>Great food, warm hospitality, and a unique aviation atmosphere at Rand Airport.</p>
      </div>
      <div className="footer-column">
        <span className="footer-heading">Contact</span>
        <a href={emailHref()}>info@cafeharvard.co.za</a>
        <a href={contactDetails.phoneHref}>011-827-4856</a>
        <a href={contactDetails.mapHref} target="_blank" rel="noreferrer">Map</a>
      </div>
      <div className="footer-column">
        <span className="footer-heading">Connect</span>
        <a href={contactDetails.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
        {socials.map(([label, href]) => (
          <a href={href} target="_blank" rel="noreferrer" key={label}>{label}</a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
