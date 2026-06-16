import { imageMap } from './imageMap'

export const menuCategories = [
  { id: 1, name: 'Breakfast Hangar', description: 'Placeholder morning plates for early arrivals.', sort_order: 1 },
  { id: 2, name: 'Runway Lunch', description: 'Burgers, grills, and family favourites.', sort_order: 2 },
  { id: 3, name: 'Pilot Plates', description: 'Heartier mains for long-table lunches.', sort_order: 3 },
  { id: 4, name: 'Little Flyers', description: 'Simple family-friendly placeholder meals.', sort_order: 4 },
  { id: 5, name: 'Control Tower Drinks', description: 'Coffee, shakes, and soft drinks.', sort_order: 5 },
]

export const menuItems = [
  { id: 1, category_id: 1, name: 'Harvard Breakfast', description: 'Eggs, bacon, grilled tomato, toast, and chips. Placeholder item.', price_cents: 9200, image_path: imageMap.menu.breakfast, image_alt: 'Harvard breakfast plate with eggs, bacon and chips', available: true, featured: true },
  { id: 2, category_id: 1, name: 'Apron Sunrise Omelette', description: 'Three-egg omelette with cheese and herbs. Placeholder item.', price_cents: 7800, image_path: imageMap.menu.breakfast, image_alt: 'Breakfast omelette served at the cafe', available: true },
  { id: 3, category_id: 1, name: 'Biker Breakfast Roll', description: 'Bacon, egg, and relish on a toasted roll. Placeholder item.', price_cents: 6900, image_path: imageMap.menu.breakfast, image_alt: 'Breakfast roll for a casual morning meal', available: true },
  { id: 4, category_id: 2, name: 'Runway Burger', description: 'Beef burger, cheese, chips, and house sauce. Placeholder item.', price_cents: 11900, image_path: imageMap.menu.burger, image_alt: 'Runway burger with chips', available: true, featured: true },
  { id: 5, category_id: 2, name: 'Hangar Chicken Burger', description: 'Grilled chicken, slaw, aioli, and chips. Placeholder item.', price_cents: 11200, image_path: imageMap.menu.burger, image_alt: 'Chicken burger with chips', available: true },
  { id: 6, category_id: 2, name: 'Club Sandwich Final Approach', description: 'Chicken, bacon, egg, tomato, and chips. Placeholder item.', price_cents: 10500, image_path: imageMap.menu.burger, image_alt: 'Club sandwich and chips lunch plate', available: true },
  { id: 7, category_id: 3, name: 'Heritage Steak Plate', description: 'Grilled steak, chips, onion rings, and sauce. Placeholder item.', price_cents: 18900, image_path: imageMap.menu.steak, image_alt: 'Grilled steak plate with chips', available: true },
  { id: 8, category_id: 3, name: "Captain's Chicken Schnitzel", description: 'Chicken schnitzel with cheese sauce and chips. Placeholder item.', price_cents: 13900, image_path: imageMap.menu.steak, image_alt: 'Chicken schnitzel meal with chips', available: true },
  { id: 9, category_id: 3, name: 'Apron Fish & Chips', description: 'Crisp battered fish with chips and tartar sauce. Placeholder item.', price_cents: 12800, image_path: imageMap.menu.fish, image_alt: 'Fish and chips lunch plate', available: true },
  { id: 10, category_id: 4, name: 'Junior Pilot Burger', description: 'Mini burger and chips. Placeholder item.', price_cents: 6500, image_path: imageMap.menu.burger, image_alt: 'Kids burger and chips', available: true },
  { id: 11, category_id: 4, name: 'Little Flyer Nuggets', description: 'Chicken nuggets and chips. Placeholder item.', price_cents: 5900, image_path: imageMap.menu.burger, image_alt: 'Kids chicken nuggets and chips', available: true },
  { id: 12, category_id: 4, name: 'Taxiway Toastie', description: 'Cheese toastie with chips. Placeholder item.', price_cents: 5200, image_path: imageMap.menu.breakfast, image_alt: 'Cheese toastie with chips', available: true },
  { id: 13, category_id: 5, name: 'Control Tower Cappuccino', description: 'Fresh coffee, served hot. Placeholder item.', price_cents: 3600, image_path: imageMap.menu.coffee, image_alt: 'Fresh cappuccino served at the cafe', available: true },
  { id: 14, category_id: 5, name: 'Iced Coffee Flypast', description: 'Cold coffee with cream. Placeholder item.', price_cents: 4900, image_path: imageMap.menu.coffee, image_alt: 'Iced coffee drink', available: true },
  { id: 15, category_id: 5, name: 'Runway Milkshake', description: 'Chocolate, vanilla, or strawberry. Placeholder item.', price_cents: 5500, image_path: imageMap.menu.coffee, image_alt: 'Milkshake served at the cafe', available: true },
]

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

export function formatRand(cents = 0) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(cents / 100)
}
