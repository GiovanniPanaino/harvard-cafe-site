import { menuSnippets } from './menuSnippets'

const menuCategoryOrder = [
  'breakfast',
  'wraps',
  'toasted-treats',
  'tramezzini',
  'salads',
  'appetizers',
  'combos',
  'burgers',
  'seafood',
  'sushi',
  'pasta',
  'poultry',
  'meaty-treats',
  'pizzas',
  'speciality-dishes',
  'sweet-sensations',
  'future-pilots',
]

export const menuPreviewCategories = menuCategoryOrder.filter((id) => menuSnippets[id]).map((id) => ({
  id,
  name: menuSnippets[id].label || menuSnippets[id].title,
  items: menuSnippets[id].sections.flatMap((section) => section.items).slice(0, 3),
}))
