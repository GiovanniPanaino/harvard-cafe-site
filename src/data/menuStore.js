import { takeawayCategories } from './takeawayMenu.js'

const MENU_STORAGE_KEY = 'harvard_cafe_menu_data'

function defaultCategories() {
  return takeawayCategories.map((category, index) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    sort_order: index + 1,
  }))
}

function normalizeItem(menuItem, category, index) {
  const priceCents = Number(menuItem.price_cents ?? menuItem.priceCents ?? 0)
  return {
    ...menuItem,
    id: String(menuItem.id),
    category_id: menuItem.category_id || category.id,
    category_name: category.name,
    description: menuItem.description || '',
    price_cents: priceCents,
    priceCents,
    available: menuItem.available !== false,
    popular: Boolean(menuItem.popular || menuItem.featured),
    featured: Boolean(menuItem.featured || menuItem.popular),
    sort_order: menuItem.sort_order || index + 1,
  }
}

function defaultItems() {
  return takeawayCategories.flatMap((category) => category.items.map((menuItem, index) => normalizeItem(menuItem, category, index)))
}

function defaultMenuData() {
  return {
    categories: defaultCategories(),
    items: defaultItems(),
  }
}

function readStoredMenu() {
  if (typeof window === 'undefined') return null

  try {
    const saved = window.localStorage.getItem(MENU_STORAGE_KEY)
    if (!saved) return null
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed.categories) || !Array.isArray(parsed.items)) return null
    return parsed
  } catch {
    return null
  }
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function uniqueItemId(items, categoryId, name) {
  const base = `${categoryId}-${slugify(name) || 'menu-item'}`
  let id = base
  let count = 2
  while (items.some((item) => item.id === id)) {
    id = `${base}-${count}`
    count += 1
  }
  return id
}

export function priceToCents(value) {
  const normalized = String(value).replace(/r/gi, '').trim().replace(',', '.')
  const amount = Number(normalized)
  if (!Number.isFinite(amount) || amount <= 0) return null
  return Math.round(amount * 100)
}

export function formatRand(cents = 0) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(Number(cents || 0) / 100)
}

export function getMenuData() {
  return readStoredMenu() || defaultMenuData()
}

export function getMenuCategories() {
  return getMenuData().categories
}

export function getMenuItems() {
  return getMenuData().items
}

export function saveMenuData(menuData) {
  const normalized = {
    categories: menuData.categories || [],
    items: (menuData.items || []).map((menuItem) => {
      const priceCents = Number(menuItem.price_cents ?? menuItem.priceCents ?? 0)
      return {
        ...menuItem,
        id: String(menuItem.id),
        price_cents: priceCents,
        priceCents,
        available: menuItem.available !== false,
        popular: Boolean(menuItem.popular || menuItem.featured),
        featured: Boolean(menuItem.featured || menuItem.popular),
      }
    }),
  }

  // Demo/MVP persistence for GitHub Pages. Replace with PHP/MySQL endpoints so edits sync across visitors and devices.
  // TODO: GET /api/menu_list.php; POST /api/menu_create.php; POST /api/menu_update.php; POST /api/menu_delete.php; POST /api/menu_toggle_availability.php
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(normalized))
  }

  return normalized
}

export function addMenuItem(itemData) {
  const current = getMenuData()
  const category = current.categories.find((item) => item.id === itemData.category_id)
  const priceCents = Number(itemData.price_cents ?? itemData.priceCents ?? 0)
  const newItem = {
    id: itemData.id || uniqueItemId(current.items, itemData.category_id, itemData.name),
    name: itemData.name,
    category_id: itemData.category_id,
    category_name: category?.name || '',
    description: itemData.description || '',
    price_cents: priceCents,
    priceCents,
    available: itemData.available !== false,
    popular: Boolean(itemData.popular || itemData.featured),
    featured: Boolean(itemData.featured || itemData.popular),
    sort_order: itemData.sort_order || current.items.filter((item) => item.category_id === itemData.category_id).length + 1,
  }

  return saveMenuData({ ...current, items: [...current.items, newItem] })
}

export function updateMenuItem(itemId, updates) {
  const current = getMenuData()
  const category = current.categories.find((item) => item.id === updates.category_id)
  const updatedItems = current.items.map((menuItem) => {
    if (menuItem.id !== itemId) return menuItem
    const priceCents = Number(updates.price_cents ?? updates.priceCents ?? menuItem.price_cents)
    return {
      ...menuItem,
      ...updates,
      category_name: category?.name || menuItem.category_name,
      price_cents: priceCents,
      priceCents,
      available: updates.available !== false,
      popular: Boolean(updates.popular || updates.featured),
      featured: Boolean(updates.featured || updates.popular),
    }
  })

  return saveMenuData({ ...current, items: updatedItems })
}

export function deleteMenuItem(itemId) {
  const current = getMenuData()
  return saveMenuData({ ...current, items: current.items.filter((menuItem) => menuItem.id !== itemId) })
}

export function resetMenuToDefault() {
  const defaults = defaultMenuData()
  saveMenuData(defaults)
  return defaults
}

export function getDefaultMenuData() {
  return defaultMenuData()
}
