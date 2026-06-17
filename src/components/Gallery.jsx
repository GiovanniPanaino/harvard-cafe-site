import { imageMap } from '../data/imageMap'
import { useImages } from '../context/ImageContext'

function Gallery() {
  const { getImageForSlot, getAltForSlot } = useImages()

  return (
    <section className="section dark-band" id="gallery">
      <div className="section-heading">
        <p className="eyebrow">Gallery</p>
        <h2>Food, aircraft, apron, atmosphere, events, and heritage.</h2>
      </div>
      <div className="gallery-grid">
        {imageMap.gallery.map((item, index) => (
          <figure key={`${item.category}-${item.src}`}>
            <img src={getImageForSlot(`gallery-${index + 1}`, item.src)} alt={getAltForSlot(`gallery-${index + 1}`, item.alt)} loading="lazy" />
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
