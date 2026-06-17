import { useMemo, useState } from 'react'
import { useImages } from '../context/ImageContext'
import { useMenu } from '../context/MenuContext'
import { imageSlots } from '../data/imageSlots'
import { formatRand } from '../data/menuStore'
import { prepareImageFile } from '../services/imageStore'

const filterOptions = ['All', 'Website placeholders', 'Menu item photos', 'Hero', 'Food', 'Functions', 'History', 'Gallery', 'Contact', 'Aircraft']

function UploadControl({ targetType, targetId, defaultAlt, onSave }) {
  const [altText, setAltText] = useState(defaultAlt || '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setBusy(true)
    setError('')
    try {
      const imageData = await prepareImageFile(file, altText, targetType, targetId)
      onSave(imageData)
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setBusy(false)
      event.target.value = ''
    }
  }

  return (
    <div className="compact-upload-control">
      <label>
        Alt text
        <input value={altText} onChange={(event) => setAltText(event.target.value)} placeholder="Describe this photo" />
      </label>
      <label className="image-upload-button">
        {busy ? 'Saving...' : 'Upload / Replace'}
        <input accept="image/*" disabled={busy} type="file" onChange={handleFile} />
      </label>
      {error && <p className="form-message error">{error}</p>}
    </div>
  )
}

function PhotoManager() {
  const { menuCategories, menuItems } = useMenu()
  const {
    assignments,
    assignImageToSlot,
    assignImageToMenuItem,
    removeSlotImage,
    removeMenuItemImage,
    resetAllImages,
  } = useImages()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('All')

  const categoryNameById = useMemo(() => {
    return menuCategories.reduce((lookup, category) => ({ ...lookup, [category.id]: category.name }), {})
  }, [menuCategories])

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredSlots = imageSlots.filter((slot) => {
    const matchesSearch = !normalizedSearch || `${slot.label} ${slot.section} ${slot.description}`.toLowerCase().includes(normalizedSearch)
    const matchesFilter = filter === 'All' || filter === 'Website placeholders' || slot.section === filter
    return matchesSearch && matchesFilter && filter !== 'Menu item photos'
  })

  const filteredMenuItems = menuItems.filter((menuItem) => {
    const categoryName = categoryNameById[menuItem.category_id] || ''
    const matchesSearch = !normalizedSearch || `${menuItem.name} ${categoryName} ${menuItem.description}`.toLowerCase().includes(normalizedSearch)
    const matchesFilter = filter === 'All' || filter === 'Menu item photos' || filter === 'Food'
    return matchesSearch && matchesFilter && filter !== 'Website placeholders'
  })

  function resetAll() {
    if (window.confirm('Reset all uploaded image assignments in this browser?')) {
      resetAllImages()
    }
  }

  return (
    <section className="admin-panel wide photo-manager">
      <div className="panel-head">
        <div>
          <h2>Photo Manager</h2>
          <p>Demo images are saved in this browser only.</p>
        </div>
        <span>{Object.keys(assignments.placeholders).length + Object.keys(assignments.menuItems).length} custom</span>
      </div>

      <div className="photo-manager-toolbar">
        <label>
          Search images
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search slots or meals" />
        </label>
        <label>
          Filter
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            {filterOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <button className="danger-button compact-button" type="button" onClick={resetAll}>
          Reset all images
        </button>
      </div>

      {filter !== 'Menu item photos' && (
        <>
          <div className="panel-head photo-section-head">
            <h3>Website Placeholder Slots</h3>
            <span>{filteredSlots.length}</span>
          </div>
          <div className="photo-manager-grid">
            {filteredSlots.map((slot) => {
              const assigned = assignments.placeholders[slot.id]
              return (
                <article className="photo-slot-card" key={slot.id}>
                  <img className="photo-slot-preview" src={assigned?.dataUrl || slot.defaultImage} alt={assigned?.altText || slot.defaultAlt} loading="lazy" />
                  <div>
                    <div className="photo-card-title">
                      <strong>{slot.label}</strong>
                      <span className={assigned ? 'image-status-badge custom' : 'image-status-badge'}>{assigned ? 'Custom photo' : 'Placeholder'}</span>
                    </div>
                    <p>{slot.description}</p>
                    <small>{slot.section} - {slot.recommendedUse} - {slot.targetSize}</small>
                    <div className="photo-actions">
                      <UploadControl
                        defaultAlt={assigned?.altText || slot.defaultAlt}
                        targetId={slot.id}
                        targetType="placeholder"
                        onSave={(imageData) => assignImageToSlot(slot.id, imageData)}
                      />
                      <button className="image-reset-button compact-button" type="button" onClick={() => removeSlotImage(slot.id)}>
                        Reset Slot
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </>
      )}

      {filter !== 'Website placeholders' && (
        <>
          <div className="panel-head photo-section-head">
            <h3>Menu Item Photos</h3>
            <span>{filteredMenuItems.length}</span>
          </div>
          <div className="photo-manager-grid">
            {filteredMenuItems.map((menuItem) => {
              const assigned = assignments.menuItems[menuItem.id]
              return (
                <article className="menu-photo-card" key={menuItem.id}>
                  <div className="photo-slot-preview empty-preview">
                    {assigned ? <img src={assigned.dataUrl} alt={assigned.altText || `${menuItem.name} menu item`} loading="lazy" /> : <span>No photo</span>}
                  </div>
                  <div>
                    <div className="photo-card-title">
                      <strong>{menuItem.name}</strong>
                      <span className={assigned ? 'image-status-badge custom' : 'image-status-badge'}>{assigned ? 'Custom meal photo' : 'No meal photo'}</span>
                    </div>
                    <p>{categoryNameById[menuItem.category_id] || menuItem.category_id} - {formatRand(menuItem.price_cents)}</p>
                    <small>{menuItem.description || 'No description'}</small>
                    <div className="photo-actions">
                      <UploadControl
                        defaultAlt={assigned?.altText || `${menuItem.name} menu item`}
                        targetId={menuItem.id}
                        targetType="menuItem"
                        onSave={(imageData) => assignImageToMenuItem(menuItem.id, imageData)}
                      />
                      <button className="image-reset-button compact-button" type="button" onClick={() => removeMenuItemImage(menuItem.id)}>
                        Remove Photo
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}

export default PhotoManager
