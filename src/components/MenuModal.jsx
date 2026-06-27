import { useEffect } from 'react'

function MenuModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="menu-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="menu-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="menu-modal-head">
          <div>
            <p className="eyebrow">Menu preview</p>
            <h2 id="menu-modal-title">Harvard Cafe Menu Preview</h2>
          </div>
          <button className="modal-close-button" type="button" onClick={onClose} aria-label="Close menu preview">
            Close
          </button>
        </div>
        <div className="menu-artwork-placeholder">
          <span>Harvard Cafe Menu Preview</span>
          <strong>Final menu artwork to be added here.</strong>
          <p>
            Final menu artwork to be added here.
          </p>
        </div>
      </section>
    </div>
  )
}

export default MenuModal
