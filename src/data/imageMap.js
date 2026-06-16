const base = import.meta.env.BASE_URL

const imagePath = (filename) => `${base}assets/images/${filename}`

export const imageMap = {
  hero: {
    src: imagePath('hero_rand_airport_northwest_apron.webp'),
    alt: 'Rand Airport apron view with aircraft atmosphere for The Harvard Cafe',
  },
  offerings: {
    breakfast: {
      src: imagePath('breakfast_plate_placeholder.webp'),
      alt: 'Breakfast plate served at an aviation-themed restaurant',
    },
    burgers: {
      src: imagePath('burgers_and_fries_placeholder.webp'),
      alt: 'Burgers and fries for a casual runway lunch',
    },
    coffee: {
      src: imagePath('coffee_latte_art_placeholder.webp'),
      alt: 'Fresh coffee with latte art for cafe guests',
    },
    family: {
      src: imagePath('table_with_food_placeholder.webp'),
      alt: 'Shared family meal on a restaurant table',
    },
    aviation: {
      src: imagePath('north_american_harvard_iia_7111.webp'),
      alt: 'North American Harvard aircraft at Rand Airport',
    },
    functions: {
      src: imagePath('function_elegant_dinner_table_placeholder.webp'),
      alt: 'Elegant dinner table setup for a restaurant function',
    },
  },
  menu: {
    breakfast: imagePath('breakfast_plate_placeholder.webp'),
    burger: imagePath('burgers_and_fries_placeholder.webp'),
    steak: imagePath('steak_dinner_placeholder.webp'),
    coffee: imagePath('coffee_latte_art_placeholder.webp'),
    fish: imagePath('fish_and_chips_placeholder.webp'),
    pizza: imagePath('pizza_placeholder.webp'),
    function: imagePath('table_with_food_placeholder.webp'),
  },
  specials: [
    {
      src: imagePath('breakfast_plate_placeholder.webp'),
      alt: 'Breakfast special at The Harvard Cafe',
    },
    {
      src: imagePath('burgers_and_fries_placeholder.webp'),
      alt: 'Burger special with fries',
    },
    {
      src: imagePath('steak_dinner_placeholder.webp'),
      alt: 'Grilled steak lunch special',
    },
    {
      src: imagePath('table_with_food_placeholder.webp'),
      alt: 'Family platter special for sharing',
    },
  ],
  functions: {
    src: imagePath('function_elegant_dinner_table_placeholder.webp'),
    alt: 'Elegant restaurant function setup for private and club events',
  },
  history: {
    src: imagePath('rand_airport_sign_biplane.webp'),
    alt: 'Rand Airport heritage sign with biplane artwork',
  },
  airshow: {
    src: imagePath('saaf_harvard_trainer_7024.webp'),
    alt: 'SAAF Harvard trainer aircraft for aviation events at Rand Airport',
  },
  contact: {
    src: imagePath('rand_airport_control_tower_landside.webp'),
    alt: 'Rand Airport control tower exterior for The Harvard Cafe location',
  },
  gallery: [
    {
      src: imagePath('table_with_food_placeholder.webp'),
      alt: 'Restaurant table with food for sharing',
      title: 'Food',
      category: 'Food',
    },
    {
      src: imagePath('north_american_harvard_iia_7111.webp'),
      alt: 'North American Harvard aircraft at Rand Airport',
      title: 'Harvard Aircraft',
      category: 'Aircraft',
    },
    {
      src: imagePath('hero_rand_airport_observation_deck.webp'),
      alt: 'Observation deck view over Rand Airport',
      title: 'Apron View',
      category: 'Apron',
    },
    {
      src: imagePath('function_elegant_dinner_table_placeholder.webp'),
      alt: 'Elegant function dinner table setup',
      title: 'Functions',
      category: 'Events',
    },
    {
      src: imagePath('rand_airport_control_tower_airside.webp'),
      alt: 'Rand Airport control tower from the airside',
      title: 'Rand Airport',
      category: 'Location',
    },
    {
      src: imagePath('saa_museum_boeing_747_lebombo.webp'),
      alt: 'SAA Museum Boeing 747 Lebombo aircraft',
      title: 'Aviation Heritage',
      category: 'History',
    },
  ],
}
