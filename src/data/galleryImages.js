import outsideBarImage from '../images/OutsideBar.webp'
import outsideBarTwoImage from '../images/OutsideBar2.webp'
import nightGardenImage from '../images/NightGarden.webp'
import gardenDiningImage from '../images/GardenDining.webp'
import functionImage from '../images/Function15.webp'
import pizzaImage from '../images/Pizza2.webp'
import prawnsImage from '../images/Prawns.webp'
import ribsImage from '../images/Ribs.webp'
import sushiImage from '../images/Sushi.webp'
import harvardPlaneImage from '../images/HrvardPlane.webp'
import northAmericanHarvardImage from '../images/north_american_harvard_iia_7111.webp'
import aerialViewImage from '../images/AerialView.webp'
import saaMuseumImage from '../images/saa_museum_boeing_747_lebombo.webp'

export const defaultGalleryImages = [
  { id: 'gallery-1', title: 'Food', size: 'wide' },
  { id: 'garden', src: gardenDiningImage, alt: 'Outdoor garden dining at The Harvard Café', title: 'Garden Dining' },
  { id: 'pizza', src: pizzaImage, alt: 'Fresh pizza at The Harvard Café', title: 'Pizza' },
  { id: 'gallery-6', title: 'Functions', size: 'wide' },
  { id: 'night-garden', src: nightGardenImage, alt: 'The Harvard Café garden in the evening', title: 'Night Garden', size: 'wide' },
  { id: 'prawns', src: prawnsImage, alt: 'Prawns served at The Harvard Café', title: 'Prawns' },
  { id: 'outside-bar', src: outsideBarImage, alt: 'Outside bar counter and beer taps', title: 'Outside Bar', size: 'wide' },
  { id: 'gallery-10', title: 'Aviation Heritage' },
  { id: 'ribs', src: ribsImage, alt: 'Ribs served at The Harvard Café', title: 'Ribs' },
  { id: 'function-table', src: functionImage, alt: 'Guests at a decorated function table beside the apron', title: 'Gather Together', size: 'wide' },
  { id: 'bar-atmosphere', src: outsideBarTwoImage, alt: 'The Harvard Café outside bar and drinks area', title: 'Bar Atmosphere' },
  { id: 'sushi', src: sushiImage, alt: 'Sushi platter at The Harvard Café', title: 'Sushi', size: 'wide' },
]

export const aviationCarouselImages = [
  { src: harvardPlaneImage, alt: 'Harvard aircraft at Rand Airport' },
  { src: northAmericanHarvardImage, alt: 'North American Harvard IIA aircraft at Rand Airport' },
  { src: aerialViewImage, alt: 'Aerial view of the Rand Airport apron' },
  { src: saaMuseumImage, alt: 'SAA Museum Boeing 747 Lebombo aircraft' },
]
