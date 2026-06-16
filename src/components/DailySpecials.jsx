import { useEffect, useState } from 'react'
import { getSpecials } from '../api/client'
import { formatRand } from '../data/placeholderData'

function DailySpecials() {
  const [specials, setSpecials] = useState([])

  useEffect(() => {
    getSpecials().then((data) => setSpecials(data.specials || []))
  }, [])

  return (
    <section className="section" id="specials">
      <div className="section-heading">
        <p className="eyebrow">Today&apos;s Flight Plan</p>
        <h2>Daily specials from the tower.</h2>
      </div>
      <div className="specials-board">
        {specials.slice(0, 5).map((special, index) => (
          <article key={special.id}>
            <img src={special.image_path} alt={special.image_alt || `${special.title} special`} loading="lazy" />
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{special.title}</h3>
              <p>{special.description}</p>
            </div>
            <strong>{formatRand(special.price_cents)}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DailySpecials
