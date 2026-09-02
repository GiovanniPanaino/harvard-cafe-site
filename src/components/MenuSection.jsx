import { useEffect, useState } from 'react'
import { imageMap } from '../data/imageMap'
import { contactDetails } from '../data/contact'
import { menuPreviewCategories } from '../data/menuPreview'
import { getMenuSnippet, sampleMenuSnippet } from '../data/menuSnippets'

// Future live file: public/assets/menu/harvard-cafe-menu.pdf, replaced by a manager upload flow.
const menuPdfPath = '/assets/menu/harvard-cafe-menu.pdf'
const menuPdfReady = false

function MenuSection({ standalone = false }) {
  const [activeCategory, setActiveCategory] = useState(menuPreviewCategories[0].name)
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const selectedCategory = menuPreviewCategories.find((category) => category.name === activeCategory)
  const selectedSnippet = getMenuSnippet(activeCategory)
  const fallbackSnippet = selectedCategory
    ? {
        title: selectedCategory.name,
        sections: [
          {
            heading: selectedCategory.name,
            items: selectedCategory.items,
          },
        ],
        isFallback: true,
      }
    : sampleMenuSnippet
  const previewSnippet = selectedSnippet || fallbackSnippet
  const modalSnippet = selectedSnippet || sampleMenuSnippet

  useEffect(() => {
    if (!isMenuModalOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuModalOpen])

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
                className={category.name === activeCategory ? 'menu-pill active' : 'menu-pill'}
                key={category.name}
                type="button"
                aria-pressed={category.name === activeCategory}
                onClick={() => setActiveCategory(category.name)}
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
              <div className="menu-preview-scroll">
                {selectedSnippet ? (
                  <MenuSnippet snippet={previewSnippet} />
                ) : (
                  <>
                    <p className="menu-preview-fallback">
                      Full preview coming soon. View the PDF menu for the complete selection.
                    </p>
                    <MenuSnippet snippet={previewSnippet} />
                  </>
                )}
              </div>
              <div className="menu-preview-actions">
                <button className="btn btn-primary" type="button" onClick={() => setIsMenuModalOpen(true)}>
                  Open Menu Preview
                </button>
                {menuPdfReady ? (
                  <>
                    <a className="btn btn-outline" href={menuPdfPath} target="_blank" rel="noreferrer">View Full Menu PDF</a>
                    <a className="btn btn-outline" href={menuPdfPath} download>Download Menu</a>
                  </>
                ) : (
                  <a className="btn btn-outline" href={contactDetails.phonePrimary.href}>Call Harvard Cafe</a>
                )}
              </div>
            </div>
          )}
        </div>
        <figure className="menu-feature-image">
          <img src={imageMap.menuFeature.src} alt={imageMap.menuFeature.alt} loading={standalone ? 'eager' : 'lazy'} />
        </figure>
      </section>

      {isMenuModalOpen ? (
        <div
          className="menu-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${modalSnippet.title} menu`}
          onClick={() => setIsMenuModalOpen(false)}
        >
          <div className="menu-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="menu-modal-close"
              type="button"
              aria-label="Close menu preview"
              onClick={() => setIsMenuModalOpen(false)}
            >
              &times;
            </button>
            <div className="menu-modal-content">
              <div className="menu-modal-head">
                <span>Menu</span>
                <h2>{modalSnippet.title}</h2>
              </div>
              <div className="menu-modal-scroll">
                <MenuSnippet snippet={modalSnippet} />
              </div>
              {menuPdfReady ? (
                <div className="menu-modal-actions">
                  <a className="btn btn-primary" href={menuPdfPath} target="_blank" rel="noreferrer">View Full Menu PDF</a>
                  <a className="btn btn-outline" href={menuPdfPath} download>Download Menu</a>
                </div>
              ) : null}
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
          <div className="menu-snippet-list">
            {section.items.map((item) => (
              <article className="menu-snippet-item" key={`${section.heading}-${item.name}`}>
                <div className="menu-snippet-item-head">
                  <strong>{item.name}</strong>
                  <span className="menu-snippet-price">{item.price}</span>
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default MenuSection
