import { useCallback, useMemo, useState } from 'react'
import {
  assignImageToMenuItem as assignStoredImageToMenuItem,
  assignImageToSlot as assignStoredImageToSlot,
  getImageAssignments,
  removeMenuItemImage as removeStoredMenuItemImage,
  removeSlotImage as removeStoredSlotImage,
  resetAllImages as resetStoredImages,
} from '../services/imageStore'
import { ImageContext } from './imageContextValue'

export function ImageProvider({ children }) {
  const [assignments, setAssignments] = useState(() => getImageAssignments())

  const getImageForSlot = useCallback((slotId, fallbackImage) => {
    return assignments.placeholders[slotId]?.dataUrl || fallbackImage
  }, [assignments.placeholders])

  const getAltForSlot = useCallback((slotId, fallbackAlt) => {
    return assignments.placeholders[slotId]?.altText || fallbackAlt
  }, [assignments.placeholders])

  const getImageForMenuItem = useCallback((menuItemId, fallbackImage = '') => {
    return assignments.menuItems[menuItemId]?.dataUrl || fallbackImage
  }, [assignments.menuItems])

  const getAltForMenuItem = useCallback((menuItemId, fallbackAlt = '') => {
    return assignments.menuItems[menuItemId]?.altText || fallbackAlt
  }, [assignments.menuItems])

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
    [
      assignments,
      getImageForSlot,
      getAltForSlot,
      getImageForMenuItem,
      getAltForMenuItem,
    ],
  )

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
}
