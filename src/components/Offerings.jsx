import { imageMap } from '../data/imageMap'

const offerings = [
  ['Breakfast', 'breakfast', 'Early plates, coffee, and weekend gathering energy.'],
  ['Lunch', 'burgers', 'Burgers, grills, and relaxed apron-side favourites.'],
  ['Drinks', 'coffee', 'Coffee, milkshakes, soft drinks, and future bar specials.'],
  ['Family Meals', 'family', 'Easy meals for kids, groups, and long-table lunches.'],
  ['Apron View', 'aviation', 'A restaurant experience shaped by aircraft, runway life, and open sky.'],
  ['Events', 'functions', 'Birthdays, clubs, corporate functions, and airshow-ready service.'],
]

function Offerings() {
  return (
    <section className="section" id="offerings">
      <div className="section-heading">
        <p className="eyebrow">Offerings and highlights</p>
        <h2>Built around food, flight, and gathering.</h2>
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
