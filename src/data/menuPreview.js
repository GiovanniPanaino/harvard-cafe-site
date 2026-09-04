import { menuSnippets } from './menuSnippets'

export const menuPreviewCategories = Object.entries(menuSnippets).map(([id, snippet]) => ({
  id,
  name: snippet.title,
  items: snippet.sections.flatMap((section) => section.items).slice(0, 3),
}))
