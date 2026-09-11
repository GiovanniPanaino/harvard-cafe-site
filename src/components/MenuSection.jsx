import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { imageMap } from '../data/imageMap'
import { menuPreviewCategories } from '../data/menuPreview'
import { getMenuSnippet } from '../data/menuSnippets'

function MenuSection({ standalone = false }) {
  const [activeCategoryId, setActiveCategoryId] = useState(menuPreviewCategories[0].id)
  const [modalCategoryId, setModalCategoryId] = useState(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
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

    const opener = document.activeElement
    const background = [...document.body.children].filter((element) => element !== dialogRef.current)
    const previousInert = background.map((element) => element.inert)
    const previousRootOverflow = document.documentElement.style.overflow
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`
    }
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    background.forEach((element) => { element.inert = true })
    closeButtonRef.current.focus({ preventScroll: true })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setModalCategoryId(null)
      }
      if (event.key === 'Tab') {
        const focusable = [...dialogRef.current.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
        )].filter((element) => element.getClientRects().length > 0)
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    const containFocus = (event) => {
      if (!dialogRef.current.contains(event.target)) closeButtonRef.current.focus()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', containFocus)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', containFocus)
      background.forEach((element, index) => { element.inert = previousInert[index] })
      document.documentElement.style.overflow = previousRootOverflow
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [modalSnippet])

  function openMenuModal(categoryId = activeCategoryId) {
    setModalCategoryId(categoryId)
  }

  return (
    <>
      <section className={standalone ? 'section menu-feature standalone-menu' : 'section menu-feature'} id="menu" data-reveal="fade-up">
        <div className="menu-feature-copy">
          <p className="eyebrow">Menu</p>
          <h2>View the Harvard Café menu before you visit.</h2>
          <p>
            From breakfast and burgers to pizzas, grills, seafood, sushi and drinks, tap a category for a quick
            taste of what is available.
          </p>
          <div className="menu-pill-grid" data-reveal-child aria-label="Menu category preview">
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
            <div className="menu-preview-panel" data-reveal-child aria-live="polite">
              <div className="menu-preview-header">
                <span>Preview</span>
                <strong>{previewSnippet.title}</strong>
              </div>
              <div className="menu-preview-scroll" ref={previewScrollRef}>
                {previewSnippet ? (
                  <MenuPreviewSnippet snippet={previewSnippet} />
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
        <figure className="menu-feature-image" data-reveal-child>
          <img src={imageMap.menuFeature.src} alt={imageMap.menuFeature.alt} loading={standalone ? 'eager' : 'lazy'} />
        </figure>
      </section>

      {modalSnippet ? createPortal(
        <div
          className="menu-modal-backdrop"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-modal-heading"
          onClick={() => setModalCategoryId(null)}
        >
          <div className="menu-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="menu-modal-close"
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu preview"
              onClick={() => setModalCategoryId(null)}
            >
              &times;
            </button>
            <div className="menu-modal-content" ref={modalContentRef}>
              <div className="menu-modal-head">
                <span>Menu</span>
                <h2 id="menu-modal-heading">{modalSnippet.title}</h2>
              </div>
              <div className="menu-modal-scroll" ref={modalScrollRef}>
                <MenuSnippet snippet={modalSnippet} />
              </div>
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  )
}

function MenuPreviewSnippet({ snippet }) {
  return (
    <div className="menu-preview-list">
      {snippet.sections.filter((section) => section.items.length > 0).map((section) => (
        <section className="menu-preview-section" key={section.heading}>
          <h3 className="menu-preview-section-heading">{section.heading}</h3>
          <div className="menu-preview-rows">
            {section.items.map((item) => (
              <article className="menu-preview-row" key={`${section.heading}-${item.name}`}>
                <span className="menu-preview-name">{item.name}</span>
                <span className="menu-preview-price">{formatCompactPrice(item)}</span>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function MenuSnippet({ snippet }) {
  return (
    <div className="menu-modal-text">
      {snippet.note ? <p className="menu-snippet-note">{snippet.note}</p> : null}
      {snippet.promo ? <p className="menu-snippet-promo">{snippet.promo}</p> : null}
      {snippet.sections.map((section) => (
        <section className="menu-snippet-section" key={section.heading}>
          <h3 className="menu-snippet-heading">{section.heading}</h3>
          {section.note ? <p className="menu-snippet-note">{section.note}</p> : null}
          {section.promo ? <p className="menu-snippet-promo">{section.promo}</p> : null}
          {section.exclusionNote ? <p className="menu-snippet-note">{section.exclusionNote}</p> : null}
          <div className="menu-snippet-list">
            {section.items.map((item) => (
              <article className="menu-snippet-item" key={`${section.heading}-${item.name}`}>
                <div className="menu-snippet-item-head">
                  <strong>{item.name}</strong>
                  {!hasPriceOptions(item) ? <span className="menu-snippet-price">{item.price}</span> : null}
                </div>
                {item.description ? <p>{item.description}</p> : null}
                {item.vegetarian ? <span className="menu-vegetarian-badge">Vegetarian</span> : null}
                {hasPriceOptions(item) ? (
                  <div className="menu-size-list">
                    {getPriceOptions(item).map((option) => (
                      <span key={`${item.name}-${option.label}`}>
                        {option.label} <strong>{option.price}</strong>
                      </span>
                    ))}
                  </div>
                ) : null}
                {item.exclusionNote ? <p className="menu-snippet-exclusion">{item.exclusionNote}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function getPriceOptions(item) {
  return item.sizes || item.options || []
}

function hasPriceOptions(item) {
  return getPriceOptions(item).length > 0
}

function formatCompactPrice(item) {
  const priceOptions = getPriceOptions(item)

  if (priceOptions.length > 0) {
    return priceOptions.map((option) => `${option.label} ${option.price}`).join(' | ')
  }

  return item.price || ''
}

export default MenuSection
