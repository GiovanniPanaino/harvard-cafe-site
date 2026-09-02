import { imageMap } from '../data/imageMap'
import { contactDetails } from '../data/contact'

function AirshowSection() {
  const items = ['Airshow Mode', 'Early Bookings', 'Apron Atmosphere', 'Menu Access']

  return (
    <section className="section airshow-section reveal-on-scroll reveal-right" id="airshow" style={{ '--airshow-image': `url("${imageMap.airshow.src}")` }}>
      <div>
        <p className="eyebrow">Rand Airport Airshow</p>
        <h2>Book early. View the menu. Join us on the apron.</h2>
        <p>
          Airshow days are made for early bookings, good food and a front-row seat to the atmosphere
          at Rand Airport.
        </p>
        <div className="section-actions">
          <a className="btn btn-primary" href="#contact">Airshow Info</a>
          <a className="btn btn-secondary" href="#menu">View Menu</a>
          <a className="btn btn-outline" href={contactDetails.directions} target="_blank" rel="noreferrer">Get Directions</a>
        </div>
      </div>
      <div className="event-mode-panel">
        {items.map((item) => <span key={item}>{item}</span>)}
      </div>
    </section>
  )
}

export default AirshowSection
