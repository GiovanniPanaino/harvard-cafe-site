import { imageMap } from '../data/imageMap'

function AirshowSection() {
  const items = ['Table reservations', 'Pre-orders', 'Platters', 'VIP seating', 'Special menus']

  return (
    <section className="section airshow-section" id="airshow" style={{ '--airshow-image': `url("${imageMap.airshow.src}")` }}>
      <div>
        <p className="eyebrow">Rand Airshow / Events</p>
        <h2>Future airshow mode for high-demand days.</h2>
        <p>
          This MVP leaves a clear runway for event-day revenue: timed table bookings, pre-orders,
          group platters, VIP seating requests, and special menus.
        </p>
      </div>
      <div className="event-mode-panel">
        {items.map((item) => <span key={item}>{item}</span>)}
      </div>
    </section>
  )
}

export default AirshowSection
