import { useState } from 'react'
import { defaultGalleryImages } from '../data/galleryImages'
import {
  readGalleryReplacements,
  resetGalleryReplacement,
  saveGalleryReplacement,
  useGalleryImages,
  validateGalleryFile,
} from '../utils/galleryStorage'

function GalleryManager() {
  const galleryImages = useGalleryImages()
  const [drafts, setDrafts] = useState(() => readGalleryReplacements())
  const [messages, setMessages] = useState({})

  function updateDraft(slotId, updates) {
    setDrafts((current) => ({
      ...current,
      [slotId]: {
        ...(current[slotId] || {}),
        ...updates,
      },
    }))
  }

  function handleFileChange(slot, file) {
    const validationMessage = validateGalleryFile(file)
    if (validationMessage) {
      setMessages((current) => ({ ...current, [slot.id]: validationMessage }))
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateDraft(slot.id, {
        src: reader.result,
        alt: slot.alt,
        title: drafts[slot.id]?.title || slot.title,
        category: drafts[slot.id]?.category || slot.category,
      })
      setMessages((current) => ({ ...current, [slot.id]: 'Ready to save.' }))
    }
    reader.onerror = () => {
      setMessages((current) => ({ ...current, [slot.id]: 'That image could not be read. Please try another file.' }))
    }
    reader.readAsDataURL(file)
  }

  function saveSlot(slot) {
    const draft = drafts[slot.id]
    if (!draft) {
      setMessages((current) => ({ ...current, [slot.id]: 'No changes to save yet.' }))
      return
    }

    try {
      saveGalleryReplacement(slot.id, {
        ...(draft.src ? { src: draft.src } : {}),
        alt: slot.alt,
        title: draft.title || slot.title,
        category: draft.category || slot.category,
      })
      setMessages((current) => ({ ...current, [slot.id]: 'Saved in this browser.' }))
    } catch {
      setMessages((current) => ({
        ...current,
        [slot.id]: 'The image is too large for browser storage. Try a smaller compressed image.',
      }))
    }
  }

  function resetSlot(slot) {
    resetGalleryReplacement(slot.id)
    setDrafts((current) => {
      const next = { ...current }
      delete next[slot.id]
      return next
    })
    setMessages((current) => ({ ...current, [slot.id]: 'Reset to the original image.' }))
  }

  return (
    <section className="gallery-manager" aria-label="Gallery Image Manager">
      <div className="admin-note">
        <strong>Demo note:</strong> image changes are saved in this browser only. Live production upload will require
        server storage.
      </div>
      <div className="gallery-manager-grid">
        {defaultGalleryImages.map((slot, index) => {
          const currentImage = galleryImages.find((image) => image.id === slot.id) || slot
          const draft = drafts[slot.id] || {}
          const preview = draft.src || currentImage.src
          const title = draft.title ?? currentImage.title
          const category = draft.category ?? currentImage.category

          return (
            <article className="gallery-manager-card" key={slot.id}>
              <img src={preview} alt={currentImage.alt} loading="lazy" />
              <div className="gallery-manager-fields">
                <span>Gallery Image {index + 1}</span>
                <label>
                  Title
                  <input value={title} onChange={(event) => updateDraft(slot.id, { title: event.target.value })} />
                </label>
                <label>
                  Caption
                  <input value={category} onChange={(event) => updateDraft(slot.id, { category: event.target.value })} />
                </label>
                <label>
                  Replace image
                  <input
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    type="file"
                    onChange={(event) => handleFileChange(slot, event.target.files?.[0])}
                  />
                </label>
              </div>
              <div className="gallery-manager-actions">
                <button className="btn btn-primary" type="button" onClick={() => saveSlot(slot)}>
                  Save Image
                </button>
                <button className="btn btn-outline" type="button" onClick={() => resetSlot(slot)}>
                  Reset to Original
                </button>
              </div>
              {messages[slot.id] ? <p className="gallery-manager-status">{messages[slot.id]}</p> : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default GalleryManager
