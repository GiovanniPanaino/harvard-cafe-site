import { createContext, useContext, useMemo, useState } from 'react'
import {
  assignImageToMenuItem as assignStoredImageToMenuItem,
  assignImageToSlot as assignStoredImageToSlot,
  getImageAssignments,
  removeMenuItemImage as removeStoredMenuItemImage,
  removeSlotImage as removeStoredSlotImage,
  resetAllImages as resetStoredImages,
} from '../services/imageStore'

const ImageContext = createContext(null)

export function ImageProvider({ children }) {
  const [assignments, setAssignments] = useState(() => getImageAssignments())

  function getImageForSlot(slotId, fallbackImage) {
    return assignments.placeholders[slotId]?.dataUrl || fallbackImage
  }

  function getAltForSlot(slotId, fallbackAlt) {
    return assignments.placeholders[slotId]?.altText || fallbackAlt
  }

  function getImageForMenuItem(menuItemId, fallbackImage = '') {
    return assignments.menuItems[menuItemId]?.dataUrl || fallbackImage
  }

  function getAltForMenuItem(menuItemId, fallbackAlt = '') {
    return assignments.menuItems[menuItemId]?.altText || fallbackAlt
  }

  function assignImageToSlot(slotId, imageData) {
    const saved = assignStoredImageToSlot(slotId, imageData)
    setAssignments(saved)
    return saved
  }

  function assignImageToMenuItem(menuItemId, imageData) {
    const saved = assignStoredImageToMenuItem(menuItemId, imageData)
    setAssignments(saved)
    return saved
  }

  function removeSlotImage(slotId) {
    const saved = removeStoredSlotImage(slotId)
    setAssignments(saved)
    return saved
  }

  function removeMenuItemImage(menuItemId) {
    const saved = removeStoredMenuItemImage(menuItemId)
    setAssignments(saved)
    return saved
  }

  function resetAllImages() {
    const saved = resetStoredImages()
    setAssignments(saved)
    return saved
  }

  const value = useMemo(
    () => ({
      assignments,
      getImageForSlot,
      getAltForSlot,
      getImageForMenuItem,
      getAltForMenuItem,
      assignImageToSlot,
      assignImageToMenuItem,
      removeSlotImage,
      removeMenuItemImage,
      resetAllImages,
    }),
    [assignments],
  )

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
}

export function useImages() {
  const context = useContext(ImageContext)
  if (!context) throw new Error('useImages must be used inside ImageProvider')
  return context
}
