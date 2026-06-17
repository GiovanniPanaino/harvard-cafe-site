const IMAGE_STORAGE_KEY = 'harvard_cafe_image_assignments'

function emptyAssignments() {
  return {
    placeholders: {},
    menuItems: {},
  }
}

function readAssignments() {
  if (typeof window === 'undefined') return emptyAssignments()

  try {
    const saved = window.localStorage.getItem(IMAGE_STORAGE_KEY)
    if (!saved) return emptyAssignments()
    const parsed = JSON.parse(saved)
    return {
      placeholders: parsed.placeholders || {},
      menuItems: parsed.menuItems || {},
    }
  } catch {
    return emptyAssignments()
  }
}

function writeAssignments(assignments) {
  // Demo browser storage only. Production should upload files to backend storage and save references in MySQL.
  // TODO: POST /api/images_upload.php; GET /api/images_list.php; POST /api/images_assign_placeholder.php; POST /api/images_assign_menu_item.php; POST /api/images_delete.php
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(assignments))
  }
  return assignments
}

function createImageMeta(file, dataUrl, altText, targetType, targetId) {
  return {
    id: `${targetType}-${targetId}-${Date.now()}`,
    originalFileName: file.name,
    targetType,
    targetId,
    dataUrl,
    uploadedAt: new Date().toISOString(),
    altText: altText || file.name.replace(/\.[^.]+$/, ''),
  }
}

function canvasToDataUrl(canvas, quality = 0.75) {
  try {
    return canvas.toDataURL('image/webp', quality)
  } catch {
    return canvas.toDataURL('image/jpeg', quality)
  }
}

export function getImageAssignments() {
  return readAssignments()
}

export function saveImageAssignments(assignments) {
  return writeAssignments(assignments)
}

export async function prepareImageFile(file, altText, targetType, targetId) {
  if (!file || !file.type?.startsWith('image/')) {
    throw new Error('Please choose a supported image file.')
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('The image could not be read. Please try another file.'))
    reader.readAsDataURL(file)
  })

  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('The image could not be prepared. Please try another file.'))
    img.src = dataUrl
  })

  const maxWidth = 1200
  const scale = Math.min(1, maxWidth / image.width)
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0, width, height)
  const resizedDataUrl = canvasToDataUrl(canvas, 0.75)

  if (resizedDataUrl.length > 900000) {
    throw new Error('That image is still too large for browser demo storage. Please choose a smaller photo.')
  }

  return createImageMeta(file, resizedDataUrl, altText, targetType, targetId)
}

export function assignImageToSlot(slotId, imageData) {
  const current = readAssignments()
  return writeAssignments({
    ...current,
    placeholders: { ...current.placeholders, [slotId]: imageData },
  })
}

export function assignImageToMenuItem(menuItemId, imageData) {
  const current = readAssignments()
  return writeAssignments({
    ...current,
    menuItems: { ...current.menuItems, [menuItemId]: imageData },
  })
}

export function removeSlotImage(slotId) {
  const current = readAssignments()
  const next = { ...current.placeholders }
  delete next[slotId]
  return writeAssignments({ ...current, placeholders: next })
}

export function removeMenuItemImage(menuItemId) {
  const current = readAssignments()
  const next = { ...current.menuItems }
  delete next[menuItemId]
  return writeAssignments({ ...current, menuItems: next })
}

export function resetAllImages() {
  return writeAssignments(emptyAssignments())
}
