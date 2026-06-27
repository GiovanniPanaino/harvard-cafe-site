import { imageMap } from '../data/imageMap'
import { contactDetails } from '../data/contactDetails'
import { useImages } from '../context/useImages'

const contactLinks = [
  {
    label: 'WhatsApp',
    value: 'Message the cafe',
    action: 'whatsapp',
  },
  {
    label: 'Phone',
    value: contactDetails.phoneDisplay,
    href: contactDetails.phoneHref,
  },
  {
    label: 'Email',
    value: contactDetails.email,
    action: 'email',
  },
  {
    label: 'Directions',
    value: 'Rand Airport, Germiston',
    href: contactDetails.mapHref,
  },
]

const socials = [
  ['Instagram', 'https://www.instagram.com/'],
  ['Facebook', 'https://www.facebook.com/'],
  ['Google', 'https://www.google.com/search?q=Harvard%20Cafe%20Rand%20Airport'],
]

function LocationContactSection({ onOpenEmail, onOpenWhatsApp }) {
  const { getImageForSlot, getAltForSlot } = useImages()

  function handleContactAction(action) {
    if (action === 'whatsapp') onOpenWhatsApp()
    if (action === 'email') onOpenEmail()
  }

  return (
    <section className="section slide-panel location-contact-section" id="contact">
      <div className="slide-copy reveal from-left">
        <p className="eyebrow">Location / Contact</p>
        <h2>Meet at Rand Airport for coffee, lunch, and aircraft views.</h2>
        <p>
          Plan your visit, ask about the current menu, or check table availability directly with the cafe.
          The links below open WhatsApp, email, maps, and social pages directly.
        </p>
        <div className="contact-card-grid">
          {contactLinks.map((item) => {
            if (item.action) {
              return (
                <button className="contact-card" type="button" onClick={() => handleContactAction(item.action)} key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </button>
              )
            }

            return (
              <a className="contact-card" href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            )
          })}
        </div>
        <div className="social-row" aria-label="Social links">
          {socials.map(([label, href]) => (
            <a href={href} target="_blank" rel="noreferrer" key={label}>{label}</a>
          ))}
        </div>
      </div>
      <figure className="cinematic-image reveal from-right">
        <img
          src={getImageForSlot('contact-location', imageMap.contact.src)}
          alt={getAltForSlot('contact-location', imageMap.contact.alt)}
          loading="lazy"
        />
      </figure>
    </section>
  )
}

export default LocationContactSection
