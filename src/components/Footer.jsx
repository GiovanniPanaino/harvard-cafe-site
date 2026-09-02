import { contactDetails } from '../data/contact'

function Footer() {
  return (
    <footer className="site-footer reveal-on-scroll reveal-up">
      <p>
        Harvard Cafe at Rand Airport -{' '}
        <a href={contactDetails.phonePrimary.href}>{contactDetails.phonePrimary.label}</a> /{' '}
        <a href={contactDetails.phoneSecondary.href}>{contactDetails.phoneSecondary.label}</a> -{' '}
        <a href={contactDetails.email.href}>{contactDetails.email.label}</a>
      </p>
      <a href="#/admin">Harvard Command Deck</a>
    </footer>
  )
}

export default Footer
