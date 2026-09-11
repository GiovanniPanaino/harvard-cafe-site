import { contactDetails } from '../data/contact'

function Footer() {
  return (
    <footer className="site-footer" data-reveal="fade-up">
      <p>
        Harvard Café at Rand Airport -{' '}
        <a href={contactDetails.phonePrimary.href}>{contactDetails.phonePrimary.label}</a> /{' '}
        <a href={contactDetails.phoneSecondary.href}>{contactDetails.phoneSecondary.label}</a> -{' '}
        <a href={contactDetails.email.href}>{contactDetails.email.label}</a>
      </p>
    </footer>
  )
}

export default Footer
