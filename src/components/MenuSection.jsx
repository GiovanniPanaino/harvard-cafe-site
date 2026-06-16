import { useEffect, useMemo, useState } from 'react'
import { getMenu } from '../api/client'
import { formatRand } from '../data/placeholderData'

function MenuSection({ onAddToCart }) {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    getMenu().then((data) => {
      setCategories(data.categories || [])
      setItems(data.items || [])
    })
  }, [])

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items
    return items.filter((item) => Number(item.category_id) === Number(activeCategory))
  }, [activeCategory, items])

  return (
    <section className="section dark-band" id="menu">
      <div className="section-heading">
        <p className="eyebrow">Official menu</p>
        <h2>Choose your flight plan.</h2>
      </div>
      <div className="tabs" role="tablist" aria-label="Menu categories">
        <button className={activeCategory === 'all' ? 'active' : ''} type="button" onClick={() => setActiveCategory('all')}>
          All
        </button>
        {categories.map((category) => (
          <button
            className={Number(activeCategory) === Number(category.id) ? 'active' : ''}
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <article className="menu-card" key={item.id}>
            <img src={item.image_path} alt={item.image_alt || `${item.name} menu item`} loading="lazy" />
            <div>
              <div className="menu-card-head">
                <h3>{item.name}</h3>
                <strong>{formatRand(item.price_cents)}</strong>
              </div>
              <p>{item.description}</p>
              <div className="menu-card-actions">
                <span className={item.available ? 'available' : 'unavailable'}>
                  {item.available ? 'Available today' : 'Temporarily grounded'}
                </span>
                <button className="btn small" disabled={!item.available} type="button" onClick={() => onAddToCart(item)}>
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MenuSection
