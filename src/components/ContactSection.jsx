import { imageMap } from '../data/imageMap'
import { contactDetails } from '../data/contact'

function ContactSection() {
  return (
    <section className="section split-section reveal-on-scroll reveal-up" id="contact">
      <div>
        <p className="eyebrow">Contact / Location</p>
        <h2>Find us at Rand Airport.</h2>
        <p>Call, email or get directions before you arrive.</p>
        <div className="contact-actions">
          <a className="btn btn-primary" href={contactDetails.phonePrimary.href}>Call Harvard Cafe</a>
          <a className="btn btn-secondary" href={contactDetails.email.href}>Email Harvard Cafe</a>
          <a className="btn btn-outline" href={contactDetails.directions} target="_blank" rel="noreferrer">Get Directions</a>
        </div>
        <dl className="contact-list">
          <div>
            <dt>Telephone</dt>
            <dd><a href={contactDetails.phonePrimary.href}>{contactDetails.phonePrimary.label}</a></dd>
          </div>
          <div>
            <dt>Telephone</dt>
            <dd><a href={contactDetails.phoneSecondary.href}>{contactDetails.phoneSecondary.label}</a></dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a href={contactDetails.email.href}>{contactDetails.email.label}</a></dd>
          </div>
          <div><dt>Address</dt><dd>{contactDetails.address}</dd></div>
          <div>
            <dt>Opening hours</dt>
            <dd>
              {contactDetails.tradingHours.map((hours) => (
                <span className="trading-hours-row" key={hours.label}>
                  <strong>{hours.label}</strong>
                  <span>{hours.time}</span>
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
      <div className="map-placeholder">
        <img src={imageMap.contact.src} alt={imageMap.contact.alt} loading="lazy" />
        <span>Find us at Rand Airport</span>
        <p>{contactDetails.address}</p>
      </div>
    </section>
  )
}

export default ContactSection
