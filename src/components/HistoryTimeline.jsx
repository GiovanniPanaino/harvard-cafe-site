import { imageMap } from '../data/imageMap'

const timeline = [
  ['Rand Airport setting', 'A working aviation backdrop gives every visit a sense of occasion.'],
  ['Aircraft atmosphere', 'Harvard Cafe carries the graphic confidence and nostalgia of flight.'],
  ['A place to gather', 'Meals, coffee, families and events come together beside the apron.'],
]

function HistoryTimeline() {
  return (
    <section className="section reveal-on-scroll reveal-up" id="history">
      <div className="section-heading">
        <p className="eyebrow">Rand Airport Heritage</p>
        <h2>A little aviation charm with your table.</h2>
      </div>
      <div className="history-layout">
        <figure className="section-image-card">
          <img src={imageMap.history.src} alt={imageMap.history.alt} loading="lazy" />
        </figure>
        <div className="timeline">
          {timeline.map(([title, body], index) => (
            <article key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HistoryTimeline
