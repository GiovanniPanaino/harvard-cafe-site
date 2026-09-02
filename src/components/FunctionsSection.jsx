import { imageMap } from '../data/imageMap'
import { contactDetails } from '../data/contact'

const functionTypes = ['Birthdays', 'Corporate Events', 'Year-End Functions', 'Family Gatherings', 'Aviation Clubs', 'Event Days']

function FunctionsSection() {
  return (
    <section className="section functions-feature reveal-on-scroll reveal-left" id="functions">
      <figure className="section-image-card">
        <img src={imageMap.functions.src} alt={imageMap.functions.alt} loading="lazy" />
      </figure>
      <div>
        <p className="eyebrow">Functions & Events</p>
        <h2>Host a gathering guests remember.</h2>
        <p>
          Birthdays, corporate lunches, year-end functions and special occasions feel different beside the
          runway at Rand Airport.
        </p>
        <div className="pill-list">
          {functionTypes.map((type) => <span key={type}>{type}</span>)}
        </div>
        <div className="section-actions">
          <a className="btn btn-primary" href={contactDetails.email.href}>Function Enquiries</a>
          <a className="btn btn-outline" href={contactDetails.phonePrimary.href}>Call Harvard Cafe</a>
        </div>
      </div>
    </section>
  )
}

export default FunctionsSection
