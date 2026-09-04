import { useEffect, useState } from 'react'
import { defaultGalleryImages } from '../data/galleryImages'

const GALLERY_STORAGE_KEY = 'harvard_gallery_replacements_v1'
const GALLERY_UPDATED_EVENT = 'harvard-gallery-updated'

export const acceptedGalleryImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
export const maxGalleryImageBytes = 4 * 1024 * 1024

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function readGalleryReplacements() {
  if (!canUseStorage()) return {}

  try {
    return JSON.parse(window.localStorage.getItem(GALLERY_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeGalleryReplacements(replacements) {
  if (!canUseStorage()) return

  window.localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(replacements))
  window.dispatchEvent(new CustomEvent(GALLERY_UPDATED_EVENT))
}

export function getMergedGalleryImages() {
  const replacements = readGalleryReplacements()

  return defaultGalleryImages.map((slot) => ({
    ...slot,
    ...(replacements[slot.id] || {}),
  }))
}

export function saveGalleryReplacement(slotId, replacement) {
  writeGalleryReplacements({
    ...readGalleryReplacements(),
    [slotId]: replacement,
  })
}

export function resetGalleryReplacement(slotId) {
  const replacements = readGalleryReplacements()
  delete replacements[slotId]
  writeGalleryReplacements(replacements)
}

export function validateGalleryFile(file) {
  if (!file) return 'Choose an image file first.'
  if (!acceptedGalleryImageTypes.includes(file.type)) return 'Please choose a JPG, PNG, WebP or AVIF image.'
  if (file.size > maxGalleryImageBytes) return 'Please choose an image smaller than 4MB.'

  return ''
}

export function useGalleryImages() {
  const [images, setImages] = useState(() => getMergedGalleryImages())

  useEffect(() => {
    function syncGalleryImages() {
      setImages(getMergedGalleryImages())
    }

    window.addEventListener(GALLERY_UPDATED_EVENT, syncGalleryImages)
    window.addEventListener('storage', syncGalleryImages)

    return () => {
      window.removeEventListener(GALLERY_UPDATED_EVENT, syncGalleryImages)
      window.removeEventListener('storage', syncGalleryImages)
    }
  }, [])

  return images
}
