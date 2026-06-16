import { imageMap } from '../data/imageMap'

function Gallery() {
  return (
    <section className="section dark-band" id="gallery">
      <div className="section-heading">
        <p className="eyebrow">Gallery</p>
        <h2>Food, aircraft, apron, atmosphere, events, and heritage.</h2>
      </div>
      <div className="gallery-grid">
        {imageMap.gallery.map((item) => (
          <figure key={`${item.category}-${item.src}`}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Gallery
