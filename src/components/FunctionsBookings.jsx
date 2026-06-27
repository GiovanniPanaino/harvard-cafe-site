import { contactDetails } from '../data/contactDetails'
import { imageMap } from '../data/imageMap'
import { useImages } from '../context/useImages'

const bookingCards = [
  {
    title: 'Birthdays',
    imageKey: 'functions',
    description: 'Warm, easy gatherings with a setting that feels different from the usual restaurant table.',
  },
  {
    title: 'Family Gatherings',
    imageKey: 'family',
    description: 'Relaxed lunches, generous plates, and space for everyone to settle in.',
  },
  {
    title: 'Corporate Lunches',
    imageKey: 'breakfast',
    description: 'A memorable airport-side venue for teams, clients, and working lunches.',
  },
  {
    title: 'Group Bookings',
    imageKey: 'aviation',
    description: 'Great food, aviation atmosphere, and a clear point of contact for planning.',
  },
]

function FunctionsBookings({ onOpenEmail }) {
  const { getImageForSlot, getAltForSlot } = useImages()

  return (
    <section className="section functions-bookings-section" id="functions">
      <div className="section-heading centered reveal">
        <p className="eyebrow">Private gatherings</p>
        <h2>Functions &amp; Bookings</h2>
        <p>
          From relaxed family gatherings to group lunches and special celebrations, Harvard Cafe offers a warm,
          memorable setting with great food and a unique aviation atmosphere.
        </p>
      </div>

      <div className="functions-layout">
        <div className="booking-card-grid">
          {bookingCards.map((card, index) => {
            const image = imageMap.offerings[card.imageKey]
            return (
              <article className="booking-card reveal" style={{ '--stagger': `${index * 80}ms` }} key={card.title}>
                <img
                  src={getImageForSlot(`booking-${card.imageKey}`, image.src)}
                  alt={getAltForSlot(`booking-${card.imageKey}`, image.alt)}
                  loading="lazy"
                />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="enquiry-panel reveal from-right">
          <p className="eyebrow">Enquire by email</p>
          <h3>Tell us what you are planning.</h3>
          <p>
            Add your details, and we will prepare an email to Harvard Cafe with
            everything ready to send.
          </p>
          <button className="btn primary" type="button" onClick={onOpenEmail}>Send Function Enquiry</button>
          <p className="enquiry-note">The email is prepared locally in your email app and addressed to {contactDetails.email}.</p>
        </div>
      </div>
    </section>
  )
}

export default FunctionsBookings
