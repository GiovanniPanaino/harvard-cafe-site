import { useEffect, useRef, useState } from 'react'
import { imageMap } from '../data/imageMap'
import { menuPreviewCategories } from '../data/menuPreview'
import { getMenuSnippet } from '../data/menuSnippets'

function MenuSection({ standalone = false }) {
  const [activeCategoryId, setActiveCategoryId] = useState(menuPreviewCategories[0].id)
  const [modalCategoryId, setModalCategoryId] = useState(null)
  const previewScrollRef = useRef(null)
  const modalContentRef = useRef(null)
  const modalScrollRef = useRef(null)
  const selectedCategory = menuPreviewCategories.find((category) => category.id === activeCategoryId)
  const previewSnippet = getMenuSnippet(activeCategoryId)
  const modalSnippet = modalCategoryId ? getMenuSnippet(modalCategoryId) : null

  useEffect(() => {
    if (previewScrollRef.current) {
      previewScrollRef.current.scrollTop = 0
    }
  }, [activeCategoryId])

  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0
    }

    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0
    }
  }, [modalCategoryId])

  useEffect(() => {
    if (!modalSnippet) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModalCategoryId(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [modalSnippet])

  function openMenuModal(categoryId = activeCategoryId) {
    setModalCategoryId(categoryId)
  }

  return (
    <>
      <section className={standalone ? 'section menu-feature standalone-menu reveal-on-scroll reveal-up' : 'section menu-feature reveal-on-scroll reveal-up'} id="menu">
        <div className="menu-feature-copy">
          <p className="eyebrow">Menu</p>
          <h2>View the Harvard Cafe menu before you visit.</h2>
          <p>
            From breakfast and burgers to pizzas, grills, seafood, sushi and drinks, tap a category for a quick
            taste of what is available.
          </p>
          <div className="menu-pill-grid" aria-label="Menu category preview">
            {menuPreviewCategories.map((category) => (
              <button
                className={category.id === activeCategoryId ? 'menu-pill active' : 'menu-pill'}
                key={category.id}
                type="button"
                aria-pressed={category.id === activeCategoryId}
                onClick={() => setActiveCategoryId(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          {selectedCategory && (
            <div className="menu-preview-panel" aria-live="polite">
              <div className="menu-preview-header">
                <span>Preview</span>
                <strong>{previewSnippet.title}</strong>
              </div>
              <div className="menu-preview-scroll" ref={previewScrollRef}>
                {previewSnippet ? (
                  <MenuSnippet snippet={previewSnippet} />
                ) : (
                  <p className="menu-preview-fallback">Menu preview coming soon.</p>
                )}
              </div>
              <div className="menu-preview-actions">
                <button className="btn btn-primary" type="button" onClick={() => openMenuModal()}>
                  Open Menu Preview
                </button>
              </div>
            </div>
          )}
        </div>
        <figure className="menu-feature-image">
          <img src={imageMap.menuFeature.src} alt={imageMap.menuFeature.alt} loading={standalone ? 'eager' : 'lazy'} />
        </figure>
      </section>

      {modalSnippet ? (
        <div
          className="menu-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${modalSnippet.title} menu`}
          onClick={() => setModalCategoryId(null)}
        >
          <div className="menu-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="menu-modal-close"
              type="button"
              aria-label="Close menu preview"
              onClick={() => setModalCategoryId(null)}
            >
              &times;
            </button>
            <div className="menu-modal-content" ref={modalContentRef}>
              <div className="menu-modal-head">
                <span>Menu</span>
                <h2>{modalSnippet.title}</h2>
              </div>
              <div className="menu-modal-scroll" ref={modalScrollRef}>
                <MenuSnippet snippet={modalSnippet} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function MenuSnippet({ snippet }) {
  return (
    <div className="menu-modal-text">
      {snippet.sections.map((section) => (
        <section className="menu-snippet-section" key={section.heading}>
          <h3 className="menu-snippet-heading">{section.heading}</h3>
          {section.note ? <p className="menu-snippet-note">{section.note}</p> : null}
          {section.promo ? <p className="menu-snippet-promo">{section.promo}</p> : null}
          <div className="menu-snippet-list">
            {section.items.map((item) => (
              <article className="menu-snippet-item" key={`${section.heading}-${item.name}`}>
                <div className="menu-snippet-item-head">
                  <strong>{item.name}</strong>
                  <span className="menu-snippet-price">{item.price}</span>
                </div>
                {item.description ? <p>{item.description}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default MenuSection
