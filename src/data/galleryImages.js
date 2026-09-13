import outsideBarImage from '../images/OutsideBar.webp'
import outsideBarTwoImage from '../images/OutsideBar2.webp'
import nightGardenImage from '../images/NightGarden.webp'
import aerialViewImage from '../images/AerialView.webp'
import coffeeImage from '../images/coffee_latte_art_placeholder.webp'
import functionsTableImage from '../images/Function10.webp'
import gardenDiningImage from '../images/GardenDining.webp'
import harvardPlaneImage from '../images/HrvardPlane.webp'
import northAmericanHarvardImage from '../images/north_american_harvard_iia_7111.webp'
import saaMuseumImage from '../images/saa_museum_boeing_747_lebombo.webp'
import pizzaImage from '../images/Pizza2.webp'

export const defaultGalleryImages = [
  {
    id: 'gallery-1',
    src: pizzaImage,
    alt: 'Freshly prepared pizza at The Harvard Café',
    title: 'Food',
    category: 'Food',
  },
  {
    id: 'gallery-6',
    src: functionsTableImage,
    alt: 'Function tables with flowers and green runners beside the apron',
    title: 'Functions',
    category: 'Events',
  },
  {
    id: 'gallery-9',
    src: outsideBarImage,
    alt: 'Bar counter and beer taps overlooking the apron',
    title: 'Garden & Bar Atmosphere',
    category: 'Venue',
  },
  {
    id: 'gallery-10',
    src: saaMuseumImage,
    alt: 'SAA Museum Boeing 747 Lebombo aircraft',
    title: 'Aviation Heritage',
    category: 'History',
  },
  {
    id: 'gallery-3',
    src: coffeeImage,
    alt: 'Coffee served for cafe visitors',
    title: 'Coffee',
    category: 'Venue',
  },
]

export const aviationCarouselImages = [
  { src: harvardPlaneImage, alt: 'Harvard aircraft at Rand Airport' },
  { src: northAmericanHarvardImage, alt: 'North American Harvard IIA aircraft at Rand Airport' },
  { src: aerialViewImage, alt: 'Aerial view of the Rand Airport apron' },
  { src: saaMuseumImage, alt: 'SAA Museum Boeing 747 Lebombo aircraft' },
]

export const atmosphereCarouselImages = [
  { src: outsideBarImage, alt: 'Outside bar counter and beer taps at The Harvard Café' },
  { src: outsideBarTwoImage, alt: 'Outside bar and drinks area at The Harvard Café' },
  { src: gardenDiningImage, alt: 'Guests enjoying garden dining at The Harvard Café' },
  { src: nightGardenImage, alt: 'Evening garden atmosphere at The Harvard Café' },
]
