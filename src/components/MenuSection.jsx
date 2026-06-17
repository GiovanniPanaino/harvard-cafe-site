import { useMemo, useState } from 'react'
import { useImages } from '../context/ImageContext'
import { useMenu } from '../context/MenuContext'
import { imageMap } from '../data/imageMap'
import { formatRand } from '../data/menuStore'

function menuPlaceholderForCategory(categoryId = '') {
  const normalized = String(categoryId).toLowerCase()
  if (normalized.includes('breakfast') || normalized.includes('toasted') || normalized.includes('kiddies')) return imageMap.menu.breakfast
  if (normalized.includes('burger') || normalized.includes('roll') || normalized.includes('wrap') || normalized.includes('tramezzini')) return imageMap.menu.burger
  if (normalized.includes('steak') || normalized.includes('grill') || normalized.includes('combo') || normalized.includes('chef')) return imageMap.menu.steak
  if (normalized.includes('seafood') || normalized.includes('sushi')) return imageMap.menu.fish
  if (normalized.includes('pizza')) return imageMap.menu.pizza
  if (normalized.includes('hot') || normalized.includes('cold') || normalized.includes('juice') || normalized.includes('chillas')) return imageMap.menu.coffee
  return imageMap.menu.function
}

function MenuSection({ onAddToCart }) {
  const { menuCategories, menuItems } = useMenu()
  const { getImageForMenuItem, getAltForMenuItem } = useImages()
  const [openCategory, setOpenCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const itemsByCategory = useMemo(() => {
    return menuItems.reduce((grouped, menuItem) => {
      const categoryItems = grouped[menuItem.category_id] || []
      return { ...grouped, [menuItem.category_id]: [...categoryItems, menuItem] }
    }, {})
  }, [menuItems])

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const visibleCategories = useMemo(() => {
    if (!normalizedSearch) return menuCategories
    return menuCategories.filter((category) =>
      (itemsByCategory[category.id] || []).some((menuItem) =>
        `${menuItem.name} ${menuItem.description}`.toLowerCase().includes(normalizedSearch),
      ),
    )
  }, [menuCategories, itemsByCategory, normalizedSearch])

  function toggleCategory(categoryId) {
    setOpenCategory((current) => (current === categoryId ? '' : categoryId))
  }

  function categoryItems(categoryId) {
    const categoryMenuItems = itemsByCategory[categoryId] || []
    if (!normalizedSearch) return categoryMenuItems
    return categoryMenuItems.filter((menuItem) =>
      `${menuItem.name} ${menuItem.description}`.toLowerCase().includes(normalizedSearch),
    )
  }

  return (
    <section className="section dark-band takeaway-menu-section" id="menu">
      <div className="section-heading">
        <p className="eyebrow">Order Take Away</p>
        <h2>Build your Harvard flight tray.</h2>
      </div>

      <label className="menu-search">
        <span>Search takeaway menu</span>
        <input
          type="search"
          placeholder="Search burgers, sushi, cappuccino..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>

      <div className="takeaway-category-grid" aria-label="Takeaway categories">
        {visibleCategories.map((category) => {
          const count = (itemsByCategory[category.id] || []).length
          const isOpen = openCategory === category.id

          return (
            <button
              aria-expanded={isOpen}
              className={isOpen ? 'takeaway-category-button active' : 'takeaway-category-button'}
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
            >
              <span>{category.name}</span>
              <small>{count} items</small>
            </button>
          )
        })}
      </div>

      {visibleCategories.length === 0 && <p className="menu-empty">No menu items match that search.</p>}

      {visibleCategories.map((category) => {
        const isOpen = openCategory === category.id
        const categoryMenuItems = categoryItems(category.id)

        return (
          <div className={isOpen ? 'takeaway-category-panel open' : 'takeaway-category-panel'} key={category.id}>
            {isOpen && (
              <>
                <div className="takeaway-category-heading">
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                  <span>{categoryMenuItems.length} shown</span>
                </div>
                <div className="takeaway-item-list">
                  {categoryMenuItems.map((menuItem) => {
                    const fallbackImage = menuPlaceholderForCategory(menuItem.category_id)
                    const itemImage = getImageForMenuItem(menuItem.id, fallbackImage)
                    const itemAlt = getAltForMenuItem(menuItem.id, `${menuItem.name} menu item`)

                    return (
                      <article className={menuItem.available === false ? 'takeaway-item unavailable-item' : 'takeaway-item'} key={menuItem.id}>
                        <img
                          className="takeaway-item-thumb"
                          src={itemImage}
                          alt={itemAlt}
                          loading="lazy"
                        />
                        <div>
                          <div className="takeaway-item-title">
                            <h4>{menuItem.name}</h4>
                            {(menuItem.popular || menuItem.featured) && <span>Popular</span>}
                            {menuItem.available === false && <span className="unavailable-chip">Unavailable</span>}
                          </div>
                          <p>{menuItem.description}</p>
                        </div>
                        <div className="takeaway-item-action">
                          <strong>{formatRand(menuItem.price_cents)}</strong>
                          <button className="btn small" disabled={menuItem.available === false} type="button" onClick={() => onAddToCart(menuItem)}>
                            {menuItem.available === false ? 'Unavailable' : 'Add'}
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )
      })}
    </section>
  )
}

export default MenuSection
