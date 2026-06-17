import { imageMap } from '../data/imageMap'
import { useImages } from '../context/ImageContext'

function ContactSection() {
  const { getImageForSlot, getAltForSlot } = useImages()

  return (
    <section className="section split-section" id="contact">
      <div>
        <p className="eyebrow">Contact / Location</p>
        <h2>Find us at Rand Airport.</h2>
        <dl className="contact-list">
          <div><dt>Phone</dt><dd>Placeholder: +27 00 000 0000</dd></div>
          <div><dt>WhatsApp</dt><dd>Placeholder: +27 00 000 0000</dd></div>
          <div><dt>Address</dt><dd>Placeholder: Rand Airport, Germiston, South Africa</dd></div>
          <div><dt>Opening hours</dt><dd>Placeholder: Tue-Sun, 08:00-16:00</dd></div>
          <div><dt>Social</dt><dd>Placeholder links for Facebook, Instagram, and Google Business</dd></div>
        </dl>
      </div>
      <div className="map-placeholder">
        <img src={getImageForSlot('contact-location', imageMap.contact.src)} alt={getAltForSlot('contact-location', imageMap.contact.alt)} loading="lazy" />
        <span>Map placeholder</span>
        <p>Replace with Google Maps embed after official address and consent are confirmed.</p>
      </div>
    </section>
  )
}

export default ContactSection
