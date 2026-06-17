import { useMemo, useState } from 'react'
import { useMenu } from '../context/MenuContext'
import { formatRand, priceToCents } from '../data/menuStore'

const emptyForm = {
  id: '',
  name: '',
  category_id: '',
  description: '',
  price: '',
  available: true,
  popular: false,
  sort_order: '',
}

function MenuManager() {
  const { menuCategories, menuItems, addMenuItem, updateMenuItem, deleteMenuItem, resetMenuToDefault } = useMenu()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  const categoryNameById = useMemo(() => {
    return menuCategories.reduce((lookup, category) => ({ ...lookup, [category.id]: category.name }), {})
  }, [menuCategories])

  const itemCountByCategory = useMemo(() => {
    return menuItems.reduce((counts, menuItem) => {
      return { ...counts, [menuItem.category_id]: (counts[menuItem.category_id] || 0) + 1 }
    }, {})
  }, [menuItems])

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    return menuItems.filter((menuItem) => {
      const matchesCategory = categoryFilter === 'all' || menuItem.category_id === categoryFilter
      const matchesSearch =
        !normalizedSearch ||
        `${menuItem.name} ${menuItem.description} ${categoryNameById[menuItem.category_id] || ''}`.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [categoryFilter, categoryNameById, menuItems, searchTerm])

  function openAddForm() {
    setEditingItem(null)
    setForm({
      ...emptyForm,
      category_id: categoryFilter === 'all' ? menuCategories[0]?.id || '' : categoryFilter,
      available: true,
    })
    setFormError('')
  }

  function openEditForm(menuItem) {
    setEditingItem(menuItem)
    setForm({
      id: menuItem.id,
      name: menuItem.name,
      category_id: menuItem.category_id,
      description: menuItem.description || '',
      price: String((Number(menuItem.price_cents || 0) / 100).toFixed(2)),
      available: menuItem.available !== false,
      popular: Boolean(menuItem.popular || menuItem.featured),
      sort_order: menuItem.sort_order || '',
    })
    setFormError('')
  }

  function closeForm() {
    setEditingItem(null)
    setForm(emptyForm)
    setFormError('')
  }

  function validateForm() {
    const priceCents = priceToCents(form.price)
    if (!form.name.trim()) return { error: 'Item name is required.' }
    if (!form.category_id) return { error: 'Choose a category for this item.' }
    if (!priceCents) return { error: 'Enter a valid positive price in Rand.' }
    return { priceCents }
  }

  function saveItem(event) {
    event.preventDefault()
    const validation = validateForm()
    if (validation.error) {
      setFormError(validation.error)
      return
    }

    const payload = {
      name: form.name.trim(),
      category_id: form.category_id,
      description: form.description.trim(),
      price_cents: validation.priceCents,
      priceCents: validation.priceCents,
      available: form.available,
      popular: form.popular,
      featured: form.popular,
      sort_order: form.sort_order ? Number(form.sort_order) : undefined,
    }

    if (editingItem) {
      updateMenuItem(editingItem.id, payload)
    } else {
      addMenuItem(payload)
    }

    closeForm()
  }

  function removeItem(menuItem) {
    if (window.confirm('Are you sure you want to remove this menu item?')) {
      deleteMenuItem(menuItem.id)
    }
  }

  function resetMenu() {
    if (window.confirm('Reset the menu back to the original Harvard Cafe menu list? This will remove local manager edits.')) {
      resetMenuToDefault()
      setCategoryFilter('all')
      setSearchTerm('')
      closeForm()
    }
  }

  function exportJson() {
    const payload = JSON.stringify({ categories: menuCategories, items: menuItems }, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'harvard-cafe-menu.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  function toggleItem(menuItem, field) {
    const nextValue = field === 'available' ? menuItem.available === false : !Boolean(menuItem[field])
    updateMenuItem(menuItem.id, {
      ...menuItem,
      [field]: nextValue,
      ...(field === 'popular' ? { featured: nextValue } : {}),
    })
  }

  return (
    <section className="admin-panel wide menu-manager">
      <div className="panel-head menu-manager-head">
        <div>
          <h2>Menu Manager</h2>
          <p>Manage public menu items, prices and availability.</p>
        </div>
        <span>{menuItems.length} items</span>
      </div>

      <div className="menu-manager-toolbar">
        <label>
          Search menu items
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search item, category or description" />
        </label>
        <label>
          Filter by category
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">All categories</option>
            {menuCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <div className="menu-manager-actions">
          <button className="compact-button" type="button" onClick={openAddForm}>
            Add New Item
          </button>
          <button className="compact-button" type="button" onClick={exportJson}>
            Export JSON
          </button>
          <button className="danger-button compact-button" type="button" onClick={resetMenu}>
            Reset to Default Menu
          </button>
        </div>
      </div>

      <div className="menu-manager-category-pills" aria-label="Menu category filters">
        <button className={categoryFilter === 'all' ? 'active' : ''} type="button" onClick={() => setCategoryFilter('all')}>
          All <span>{menuItems.length}</span>
        </button>
        {menuCategories.map((category) => (
          <button
            className={categoryFilter === category.id ? 'active' : ''}
            key={category.id}
            type="button"
            onClick={() => setCategoryFilter(category.id)}
          >
            {category.name} <span>{itemCountByCategory[category.id] || 0}</span>
          </button>
        ))}
      </div>

      <div className="menu-manager-list">
        <table className="menu-manager-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((menuItem) => (
              <tr key={menuItem.id}>
                <td>
                  <strong>{menuItem.name}</strong>
                  <span>{menuItem.description || 'No description'}</span>
                </td>
                <td>{categoryNameById[menuItem.category_id] || menuItem.category_id}</td>
                <td>{formatRand(menuItem.price_cents)}</td>
                <td>
                  <button className={menuItem.available === false ? 'availability-badge off' : 'availability-badge'} type="button" onClick={() => toggleItem(menuItem, 'available')}>
                    {menuItem.available === false ? 'Unavailable' : 'Available'}
                  </button>
                  <button className={menuItem.popular || menuItem.featured ? 'popular-badge active' : 'popular-badge'} type="button" onClick={() => toggleItem(menuItem, 'popular')}>
                    {menuItem.popular || menuItem.featured ? 'Popular' : 'Not popular'}
                  </button>
                </td>
                <td>
                  <div className="menu-manager-row-actions">
                    <button className="compact-button" type="button" onClick={() => openEditForm(menuItem)}>
                      Edit
                    </button>
                    <button className="danger-button compact-button" type="button" onClick={() => removeItem(menuItem)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="menu-manager-cards">
          {filteredItems.map((menuItem) => (
          <article className="menu-manager-card" key={menuItem.id}>
            <div>
              <strong>{menuItem.name}</strong>
              <span>{categoryNameById[menuItem.category_id] || menuItem.category_id}</span>
            </div>
            <p>{menuItem.description || 'No description'}</p>
            <div className="menu-manager-card-meta">
              <strong>{formatRand(menuItem.price_cents)}</strong>
              <button className={menuItem.available === false ? 'availability-badge off' : 'availability-badge'} type="button" onClick={() => toggleItem(menuItem, 'available')}>
                {menuItem.available === false ? 'Unavailable' : 'Available'}
              </button>
              <button className={menuItem.popular || menuItem.featured ? 'popular-badge active' : 'popular-badge'} type="button" onClick={() => toggleItem(menuItem, 'popular')}>
                {menuItem.popular || menuItem.featured ? 'Popular' : 'Not popular'}
              </button>
            </div>
            <div className="menu-manager-row-actions">
              <button className="compact-button" type="button" onClick={() => openEditForm(menuItem)}>
                Edit
              </button>
              <button className="danger-button compact-button" type="button" onClick={() => removeItem(menuItem)}>
                Delete
              </button>
            </div>
          </article>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 && <p className="muted">No menu items match the current filter.</p>}

      {(editingItem || form.category_id) && (
        <div className="menu-manager-modal" role="dialog" aria-modal="true" aria-label={editingItem ? 'Edit menu item' : 'Add menu item'}>
          <form className="menu-manager-form" onSubmit={saveItem}>
            <div className="panel-head">
              <h3>{editingItem ? 'Edit menu item' : 'Add menu item'}</h3>
              <button className="compact-button" type="button" onClick={closeForm}>
                Close
              </button>
            </div>
            <label>
              Item name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label>
              Category
              <select value={form.category_id} onChange={(event) => setForm({ ...form, category_id: event.target.value })}>
                <option value="">Choose category</option>
                {menuCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Description
              <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
            </label>
            <div className="two-col">
              <label>
                Price in Rand
                <input inputMode="decimal" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="89.90" />
              </label>
              <label>
                Sort order
                <input inputMode="numeric" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: event.target.value })} />
              </label>
            </div>
            <div className="menu-manager-checks">
              <label>
                <input type="checkbox" checked={form.available} onChange={(event) => setForm({ ...form, available: event.target.checked })} />
                Available
              </label>
              <label>
                <input type="checkbox" checked={form.popular} onChange={(event) => setForm({ ...form, popular: event.target.checked })} />
                Featured / Popular
              </label>
            </div>
            {formError && <p className="form-message error">{formError}</p>}
            <button className="btn primary full" type="submit">
              Save changes
            </button>
          </form>
        </div>
      )}
    </section>
  )
}

export default MenuManager
