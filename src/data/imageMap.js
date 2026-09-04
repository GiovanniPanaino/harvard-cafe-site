import nightGardenHero from '../images/NightGarden.jpg'
import outsideBarAtmosphereImage from '../images/OutsideBar.jpg'
import outsideBarImage from '../images/OutsideBar2.jpg'
import gardenDiningImage from '../images/GardenDining.jpg'
import harvardPlaneImage from '../images/HrvardPlane.jpg'
import aerialViewImage from '../images/AerialView.avif'
import breakfastPlateImage from '../images/breakfast_plate_placeholder.webp'
import burgersImage from '../images/burgers_and_fries_placeholder.webp'
import coffeeImage from '../images/coffee_latte_art_placeholder.webp'
import cocktailsImage from '../images/cocktails_happy_hour_placeholder.webp'
import fishImage from '../images/fish_and_chips_placeholder.webp'
import functionsTableImage from '../images/function_elegant_dinner_table_placeholder.webp'
import heroObservationDeckImage from '../images/hero_rand_airport_observation_deck.webp'
import northAmericanHarvardImage from '../images/north_american_harvard_iia_7111.webp'
import pizzaImage from '../images/pizza_placeholder.webp'
import controlTowerAirsideImage from '../images/rand_airport_control_tower_airside.webp'
import controlTowerLandsideImage from '../images/rand_airport_control_tower_landside.webp'
import randAirportFoyerImage from '../images/rand_airport_foyer.webp'
import randAirportSignImage from '../images/rand_airport_sign_biplane.webp'
import saaMuseumImage from '../images/saa_museum_boeing_747_lebombo.webp'
import steakImage from '../images/steak_dinner_placeholder.webp'
import tableFoodImage from '../images/table_with_food_placeholder.webp'

export const imageMap = {
  hero: {
    src: nightGardenHero,
    alt: 'Harvard Cafe night garden atmosphere',
  },
  offerings: {
    breakfast: {
      src: breakfastPlateImage,
      alt: 'Breakfast plate served at an aviation-themed restaurant',
    },
    burgers: {
      src: outsideBarImage,
      alt: 'Harvard Cafe outside bar and drinks area',
    },
    coffee: {
      src: coffeeImage,
      alt: 'Fresh coffee with latte art for cafe guests',
    },
    family: {
      src: tableFoodImage,
      alt: 'Shared family meal on a restaurant table',
    },
    aviation: {
      src: northAmericanHarvardImage,
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
      src: functionsTableImage,
      alt: 'Elegant dinner table setup for a restaurant function',
    },
  },
  menu: {
    breakfast: breakfastPlateImage,
    burger: burgersImage,
    steak: steakImage,
    coffee: coffeeImage,
    fish: fishImage,
    pizza: pizzaImage,
    function: tableFoodImage,
  },
  specials: [
    {
      src: breakfastPlateImage,
      alt: 'Breakfast special at The Harvard Cafe',
    },
    {
      src: burgersImage,
      alt: 'Burger special with fries',
    },
    {
      src: steakImage,
      alt: 'Grilled steak lunch special',
    },
    {
      src: tableFoodImage,
      alt: 'Family platter special for sharing',
    },
  ],
  menuFeature: {
    src: tableFoodImage,
    alt: 'A Harvard Cafe table set with food and drinks before a visit',
  },
  functions: {
    src: functionsTableImage,
    alt: 'Elegant restaurant function setup for private and club events',
  },
  history: {
    src: randAirportSignImage,
    alt: 'Rand Airport heritage sign with biplane artwork',
  },
  contact: {
    src: controlTowerLandsideImage,
    alt: 'Rand Airport control tower exterior for The Harvard Cafe location',
  },
  gallery: [
    {
      src: tableFoodImage,
      alt: 'Restaurant table with food for sharing',
      title: 'Food',
      category: 'Food',
    },
    {
      src: breakfastPlateImage,
      alt: 'Breakfast plate served at The Harvard Cafe',
      title: 'Breakfast',
      category: 'Food',
    },
    {
      src: coffeeImage,
      alt: 'Coffee served for cafe visitors',
      title: 'Coffee',
      category: 'Venue',
    },
    {
      src: northAmericanHarvardImage,
      alt: 'North American Harvard aircraft at Rand Airport',
      title: 'Harvard Aircraft',
      category: 'Aircraft',
    },
    {
      src: heroObservationDeckImage,
      alt: 'Observation deck view over Rand Airport',
      title: 'Apron View',
      category: 'Apron',
    },
    {
      src: functionsTableImage,
      alt: 'Elegant function dinner table setup',
      title: 'Functions',
      category: 'Events',
    },
    {
      src: harvardPlaneImage,
      alt: 'Aircraft atmosphere near the Harvard Cafe at Rand Airport',
      title: 'Aircraft',
      category: 'Aircraft',
    },
    {
      src: aerialViewImage,
      alt: 'Apron-side restaurant atmosphere at Rand Airport',
      title: 'Apron Energy',
      category: 'Apron View',
    },
    {
      src: controlTowerAirsideImage,
      alt: 'Rand Airport control tower from the airside',
      title: 'Rand Airport',
      category: 'Location',
    },
    {
      src: saaMuseumImage,
      alt: 'SAA Museum Boeing 747 Lebombo aircraft',
      title: 'Aviation Heritage',
      category: 'History',
    },
    {
      src: gardenDiningImage,
      alt: 'Event atmosphere at The Harvard Cafe',
      title: 'Event Days',
      category: 'Events',
    },
    {
      src: randAirportFoyerImage,
      alt: 'Rand Airport venue detail and aviation atmosphere',
      title: 'Venue',
      category: 'Venue',
    },
  ],
}
