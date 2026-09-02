import { imageMap } from '../data/imageMap'

const offerings = [
  ['Apron-side atmosphere', 'outsideBar', 'Aircraft, open sky and Rand Airport energy.'],
  ['Food and drinks', 'burgers', 'Breakfasts, burgers, grills, coffee and drinks.'],
  ['Aviation heritage', 'harvardPlane', 'A bold cafe identity shaped by flight.'],
  ['Functions and events', 'functions', 'Birthdays, clubs, corporate days and airshow visits.'],
]

function Offerings() {
  return (
    <section className="section reveal-on-scroll reveal-up" id="offerings">
      <div className="section-heading">
        <p className="eyebrow">Why Visit Harvard Cafe</p>
        <h2>Food, flight and gathering in one memorable setting.</h2>
      </div>
      <div className="feature-grid">
        {offerings.map(([title, imageKey, body]) => {
          const image = imageMap.offerings[imageKey]
          return (
            <article className="feature-card image-feature-card" key={title}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <div>
                <span className="feature-icon">*</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Offerings
