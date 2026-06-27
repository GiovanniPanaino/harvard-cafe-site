import { imageMap } from '../data/imageMap'
import { useImages } from '../context/useImages'

const categories = [
  {
    title: 'Breakfast',
    imageKey: 'breakfast',
    slot: 'featured-breakfast',
    description: 'Morning plates, fresh coffee, and easy runway-side starts.',
  },
  {
    title: 'Burgers',
    imageKey: 'burger',
    slot: 'featured-burgers',
    description: 'Big cafe favourites made for casual lunches and hungry crews.',
  },
  {
    title: 'Steaks',
    imageKey: 'steak',
    slot: 'featured-steaks',
    description: 'Comforting grill plates with classic Harvard Cafe character.',
  },
  {
    title: 'Light Meals',
    imageKey: 'fish',
    slot: 'featured-light-meals',
    description: 'Relaxed bites for quick visits, families, and sunny afternoons.',
  },
  {
    title: 'Drinks',
    imageKey: 'coffee',
    slot: 'featured-drinks',
    description: 'Coffee, cold drinks, shakes, and cafe refreshments.',
  },
  {
    title: 'Desserts',
    imageKey: 'function',
    slot: 'featured-desserts',
    description: 'Sweet finishes for long tables and weekend treats.',
  },
]

function FeaturedMenuPreview({ onOpenMenu, onOpenEmail, onOpenWhatsApp }) {
  const { getImageForSlot } = useImages()

  return (
    <section className="section featured-menu-section" id="menu-preview">
      <div className="section-heading centered reveal">
        <p className="eyebrow">Menu highlights</p>
        <h2>Familiar cafe favourites, served with a runway view.</h2>
        <p>Explore the categories guests come back for, then contact the cafe directly for current menus, specials, and bookings.</p>
      </div>
      <div className="featured-menu-grid">
        {categories.map((item, index) => (
          <article className="featured-menu-card reveal" style={{ '--stagger': `${index * 80}ms` }} key={item.title}>
            <img src={getImageForSlot(item.slot, imageMap.menu[item.imageKey])} alt={`${item.title} at Harvard Cafe`} loading="lazy" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="section-actions reveal">
        <button className="btn primary" type="button" onClick={onOpenMenu}>View Menu</button>
        <button className="btn" type="button" onClick={onOpenEmail}>Request Current Menu</button>
        <button className="btn" type="button" onClick={onOpenWhatsApp}>Ask on WhatsApp</button>
      </div>
    </section>
  )
}

export default FeaturedMenuPreview
