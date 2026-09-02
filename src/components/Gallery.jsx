import { imageMap } from '../data/imageMap'

function Gallery() {
  return (
    <section className="section gallery-section reveal-on-scroll reveal-up" id="gallery">
      <div className="section-heading">
        <p className="eyebrow">Gallery</p>
        <h2>A glimpse of the food, apron, aircraft and atmosphere.</h2>
      </div>
      <div className="gallery-grid">
        {imageMap.gallery.slice(0, 10).map((item) => (
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
