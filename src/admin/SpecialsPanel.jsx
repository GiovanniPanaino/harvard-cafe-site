import { formatRand } from '../data/placeholderData'

function SpecialsPanel({ specials }) {
  return (
    <section className="admin-panel">
      <div className="panel-head">
        <h2>Daily Specials</h2>
        <span>{specials.length}</span>
      </div>
      {specials.map((special) => (
        <article className="mini-record" key={special.id}>
          <strong>{special.title}</strong>
          <span>{formatRand(special.price_cents)}</span>
        </article>
      ))}
    </section>
  )
}

export default SpecialsPanel
