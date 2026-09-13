import outsideBarAtmosphereImage from '../images/OutsideBar.webp'
import outsideBarImage from '../images/OutsideBar2.webp'
import harvardPlaneImage from '../images/HrvardPlane.webp'
import burgersImage from '../images/burgers_and_fries_placeholder.webp'
import coffeeImage from '../images/coffee_latte_art_placeholder.webp'
import fishImage from '../images/fish_and_chips_placeholder.webp'
import functionsTableImage from '../images/Function10.webp'
import northAmericanHarvardImage from '../images/north_american_harvard_iia_7111.webp'
import pizzaImage from '../images/pizza_placeholder.webp'
import controlTowerLandsideImage from '../images/rand_airport_control_tower_landside.webp'
import randAirportSignImage from '../images/rand_airport_sign_biplane.webp'
import steakImage from '../images/steak_dinner_placeholder.webp'
import { defaultGalleryImages } from './galleryImages'

export const imageMap = {
  offerings: {
    burgers: {
      src: outsideBarImage,
      alt: 'Harvard Café outside bar and drinks area',
    },
    coffee: {
      src: coffeeImage,
      alt: 'Fresh coffee with latte art for cafe guests',
    },
    aviation: {
      src: northAmericanHarvardImage,
      alt: 'North American Harvard aircraft at Rand Airport',
    },
    outsideBar: {
      src: outsideBarAtmosphereImage,
      alt: 'Harvard Café outside bar atmosphere at Rand Airport',
    },
    harvardPlane: {
      src: harvardPlaneImage,
      alt: 'Harvard aeroplane at Rand Airport',
    },
    functions: {
      src: functionsTableImage,
      alt: 'Function tables with flowers and green runners beside the apron',
    },
  },
  menu: {
    burger: burgersImage,
    steak: steakImage,
    coffee: coffeeImage,
    fish: fishImage,
    pizza: pizzaImage,
  },
  specials: [
    {
      src: burgersImage,
      alt: 'Burger special with fries',
    },
    {
      src: steakImage,
      alt: 'Grilled steak lunch special',
    },
  ],
  functions: {
    src: functionsTableImage,
    alt: 'Function tables with flowers and green runners beside the apron',
  },
  history: {
    src: randAirportSignImage,
    alt: 'Rand Airport heritage sign with biplane artwork',
  },
  contact: {
    src: controlTowerLandsideImage,
    alt: 'Rand Airport control tower exterior for The Harvard Café location',
  },
  gallery: defaultGalleryImages,
}
