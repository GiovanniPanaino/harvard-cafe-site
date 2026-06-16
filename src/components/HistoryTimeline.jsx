import { imageMap } from '../data/imageMap'

const timeline = [
  ['Early aviation in Germiston', 'Placeholder copy: final historical text must be verified before publishing.'],
  ['Rand Airport opening era', 'Placeholder copy: confirm dates, people, and archive references before launch.'],
  ['South African aviation heritage', 'Placeholder copy: add accurate aviation heritage notes after review.'],
  ['WWII-era aviation relevance', 'Placeholder copy: verify any wartime references before public use.'],
  ['SAA Museum / aviation preservation', 'Placeholder copy: confirm museum references, permissions, and current wording.'],
  ['Modern apron restaurant experience', 'Placeholder copy: describe the current restaurant once official content is supplied.'],
]

function HistoryTimeline() {
  return (
    <section className="section" id="history">
      <div className="section-heading">
        <p className="eyebrow">Rand Airport History</p>
        <h2>A heritage timeline ready for verified text.</h2>
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
