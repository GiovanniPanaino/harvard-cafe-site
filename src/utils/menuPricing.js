import { menuSnippets } from '../data/menuSnippets'

export function parseRandPrice(price) {
  if (!price || typeof price !== 'string') return null

  const clean = price.replace(/[^\d.]/g, '')
  if (!clean) return null

  const value = Number(clean)

  return Number.isFinite(value) ? value : null
}

export function formatRandPrice(value) {
  if (!Number.isFinite(value)) return ''

  return value % 1 === 0 ? `R${value.toFixed(0)}` : `R${value.toFixed(2)}`
}

export function getMenuItemsByCategory(categoryId) {
  const category = menuSnippets[categoryId]
  if (!category?.sections) return []

  return category.sections.flatMap((section) =>
    (section.items || []).map((item) => ({
      ...item,
      categoryId,
      categoryTitle: category.title,
      sectionHeading: section.heading,
    })),
  )
}

export function getItemsFromCategory(categoryId) {
  return getMenuItemsByCategory(categoryId)
}

export function getMenuItemsByCategories(categoryIds = []) {
  return categoryIds.flatMap((categoryId) => getMenuItemsByCategory(categoryId))
}

export function getMissingCategoryIds(categoryIds = []) {
  return categoryIds.filter((categoryId) => !menuSnippets[categoryId])
}

export function findMenuItemsByName(categoryIds = [], itemNames = []) {
  const matches = itemNames.map((name) => name.toLowerCase())

  return getMenuItemsByCategories(categoryIds).filter((item) => {
    const itemName = item.name.toLowerCase()
    return matches.some((match) => itemName.includes(match))
  })
}

export function getSpecialItems({ categoryIds = [], itemMatch = [] } = {}) {
  if (itemMatch.length > 0) {
    return findMenuItemsByName(categoryIds, itemMatch)
  }

  return getMenuItemsByCategories(categoryIds)
}

export function getDiscountedItems(categoryIds = [], discountPercent = 0) {
  const multiplier = (100 - discountPercent) / 100

  return getMenuItemsByCategories(categoryIds).map((item) => {
    const originalAmount = parseRandPrice(item.price)

    return {
      ...item,
      originalAmount,
      discountedPrice: Number.isFinite(originalAmount) ? originalAmount * multiplier : null,
    }
  })
}

export function getHalfPriceItems(categoryIds = []) {
  return getDiscountedItems(categoryIds, 50)
}
