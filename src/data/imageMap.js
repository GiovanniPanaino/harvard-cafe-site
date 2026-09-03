import nightGardenHero from '../images/NightGarden.jpg'
import outsideBarAtmosphereImage from '../images/OutsideBar.jpg'
import outsideBarImage from '../images/OutsideBar2.jpg'
import harvardPlaneImage from '../images/HrvardPlane.jpg'

const imagePath = (filename) => `/assets/images/${filename}`

export const imageMap = {
  hero: {
    src: nightGardenHero,
    alt: 'Harvard Cafe night garden atmosphere',
  },
  offerings: {
    breakfast: {
      src: imagePath('breakfast_plate_placeholder.webp'),
      alt: 'Breakfast plate served at an aviation-themed restaurant',
    },
    burgers: {
      src: outsideBarImage,
      alt: 'Harvard Cafe outside bar and drinks area',
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
    outsideBar: {
      src: outsideBarAtmosphereImage,
      alt: 'Harvard Cafe outside bar atmosphere at Rand Airport',
    },
    harvardPlane: {
      src: harvardPlaneImage,
      alt: 'Harvard aeroplane at Rand Airport',
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
  menuFeature: {
    src: imagePath('table_with_food_placeholder.webp'),
    alt: 'A Harvard Cafe table set with food and drinks before a visit',
  },
  functions: {
    src: imagePath('function_elegant_dinner_table_placeholder.webp'),
    alt: 'Elegant restaurant function setup for private and club events',
  },
  history: {
    src: imagePath('rand_airport_sign_biplane.webp'),
    alt: 'Rand Airport heritage sign with biplane artwork',
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
      src: imagePath('breakfast_plate_placeholder.webp'),
      alt: 'Breakfast plate served at The Harvard Cafe',
      title: 'Breakfast',
      category: 'Food',
    },
    {
      src: imagePath('coffee_latte_art_placeholder.webp'),
      alt: 'Coffee served for cafe visitors',
      title: 'Coffee',
      category: 'Venue',
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
      src: imagePath('gallery-aircraft-01.webp'),
      alt: 'Aircraft atmosphere near the Harvard Cafe at Rand Airport',
      title: 'Aircraft',
      category: 'Aircraft',
    },
    {
      src: imagePath('gallery-apron-01.webp'),
      alt: 'Apron-side restaurant atmosphere at Rand Airport',
      title: 'Apron Energy',
      category: 'Apron View',
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
    {
      src: imagePath('gallery-event-01.webp'),
      alt: 'Event atmosphere at The Harvard Cafe',
      title: 'Event Days',
      category: 'Events',
    },
    {
      src: imagePath('rand_airport_foyer.webp'),
      alt: 'Rand Airport venue detail and aviation atmosphere',
      title: 'Venue',
      category: 'Venue',
    },
  ],
}
