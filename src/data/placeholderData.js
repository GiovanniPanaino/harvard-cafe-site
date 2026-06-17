import { imageMap } from './imageMap'
import { formatRand, getMenuCategories, getMenuItems } from './menuStore'

export const menuCategories = getMenuCategories()
export const menuItems = getMenuItems()

export const dailySpecials = [
  { id: 1, title: 'Tower Breakfast Clearance', description: 'A hearty breakfast plate with coffee. Placeholder special.', price_cents: 9900, image_path: imageMap.specials[0].src, image_alt: imageMap.specials[0].alt },
  { id: 2, title: 'Runway Burger Combo', description: 'Burger, chips, and a soft drink. Placeholder special.', price_cents: 12900, image_path: imageMap.specials[1].src, image_alt: imageMap.specials[1].alt },
  { id: 3, title: 'Apron Steak Lunch', description: 'Steak, chips, and onion rings. Placeholder special.', price_cents: 17900, image_path: imageMap.specials[2].src, image_alt: imageMap.specials[2].alt },
  { id: 4, title: 'Family Fly-In Platter', description: 'Shareable bites for the table. Placeholder special.', price_cents: 24500, image_path: imageMap.specials[3].src, image_alt: imageMap.specials[3].alt },
]

export const galleryItems = imageMap.gallery.map((item, index) => ({
  id: index + 1,
  title: item.title,
  category: item.category,
  image_path: item.src,
  alt: item.alt,
}))

export { formatRand }
