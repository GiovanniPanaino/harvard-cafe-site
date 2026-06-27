import { imageMap } from '../data/imageMap'
import { contactDetails } from '../data/contactDetails'

function FinalCTASection({ onOpenMenu, onOpenEmail, onOpenWhatsApp }) {
  return (
    <section className="section final-cta-section" id="final-cta" style={{ '--final-cta-image': `url("${imageMap.gallery[2].src}")` }}>
      <div className="final-cta-inner reveal">
        <p className="eyebrow">Ready when you are</p>
        <h2>Hungry? Let&apos;s get you sorted.</h2>
        <div className="final-cta-actions">
          <button className="btn primary" type="button" onClick={onOpenWhatsApp}>WhatsApp Us</button>
          <button className="btn" type="button" onClick={onOpenMenu}>View Menu</button>
          <a className="btn" href={contactDetails.mapHref} target="_blank" rel="noreferrer">
            Get Directions
          </a>
          <button className="btn ghost light" type="button" onClick={onOpenEmail}>Email Us</button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
