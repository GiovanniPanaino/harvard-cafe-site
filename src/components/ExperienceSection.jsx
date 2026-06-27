import { imageMap } from '../data/imageMap'
import { useImages } from '../context/useImages'

function ExperienceSection() {
  const { getImageForSlot, getAltForSlot } = useImages()
  const image = imageMap.offerings.aviation

  return (
    <section className="section slide-panel experience-section" id="experience">
      <figure className="cinematic-image reveal from-left">
        <img
          src={getImageForSlot('experience-aviation', image.src)}
          alt={getAltForSlot('experience-aviation', image.alt)}
          loading="lazy"
        />
      </figure>
      <div className="slide-copy reveal from-right">
        <p className="eyebrow">The Harvard Cafe experience</p>
        <h2>Settle in where great food meets the theatre of flight.</h2>
        <p>
          A relaxed, family-friendly cafe shaped by aviation atmosphere, generous plates, easy conversation,
          and airport views that make every breakfast, lunch, and coffee feel a little more memorable.
        </p>
        <div className="detail-list">
          <span>Aviation atmosphere</span>
          <span>Family-friendly dining</span>
          <span>Airport views</span>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
