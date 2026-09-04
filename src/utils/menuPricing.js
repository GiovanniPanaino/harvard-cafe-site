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

function hasRequiredSpecialTag(item, requiredSpecialTag) {
  if (!requiredSpecialTag) return true

  return Array.isArray(item.specialTags) && item.specialTags.includes(requiredSpecialTag)
}

export function getSpecialItems({ categoryIds = [], itemMatch = [], requiredSpecialTag = '' } = {}) {
  const items = itemMatch.length > 0 ? findMenuItemsByName(categoryIds, itemMatch) : getMenuItemsByCategories(categoryIds)

  return items.filter((item) => hasRequiredSpecialTag(item, requiredSpecialTag))
}

export function getDiscountedPriceOptions(item, discountPercent = 0) {
  if (item.discountEligible === false) return []

  const multiplier = (100 - discountPercent) / 100

  const priceOptions = item.sizes || item.options

  if (Array.isArray(priceOptions) && priceOptions.length > 0) {
    return priceOptions
      .map((option) => {
        const amount = parseRandPrice(option.price)
        if (amount === null) return null

        return {
          label: option.label,
          original: option.price,
          discounted: formatRandPrice(amount * multiplier),
        }
      })
      .filter(Boolean)
  }

  const amount = parseRandPrice(item.price)
  if (amount === null) return []

  return [
    {
      label: '',
      original: item.price,
      discounted: formatRandPrice(amount * multiplier),
    },
  ]
}

export function getDiscountedItems(categoryIds = [], discountPercent = 0, { requiredSpecialTag = '' } = {}) {
  return getMenuItemsByCategories(categoryIds)
    .filter((item) => hasRequiredSpecialTag(item, requiredSpecialTag))
    .map((item) => ({
      ...item,
      discountedOptions: getDiscountedPriceOptions(item, discountPercent),
    }))
    .filter((item) => item.discountedOptions.length > 0)
}

export function getHalfPriceItems(categoryIds = []) {
  return getDiscountedItems(categoryIds, 50)
}

export function getLegacySpecialItems({ categoryIds = [], itemMatch = [] } = {}) {
  if (itemMatch.length > 0) {
    return findMenuItemsByName(categoryIds, itemMatch)
  }

  return getMenuItemsByCategories(categoryIds)
}
