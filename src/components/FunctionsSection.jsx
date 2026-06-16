import { useState } from 'react'
import { submitFunctionEnquiry } from '../api/client'
import { imageMap } from '../data/imageMap'

const functionTypes = ['Birthdays', 'Corporate Events', 'Aviation Clubs', 'Biker Breakfasts', 'Car Clubs', 'Year-End Functions', 'Private Events']

function FunctionsSection() {
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    event_date: '',
    guest_count: '',
    function_type: 'Birthdays',
    budget_range: '',
    notes: '',
  })

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    try {
      await submitFunctionEnquiry(form)
      setMessage('Your function enquiry has been sent. The restaurant team can follow up from the Command Deck.')
      setForm({ ...form, customer_name: '', customer_phone: '', customer_email: '', event_date: '', guest_count: '', budget_range: '', notes: '' })
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <section className="section split-section" id="functions">
      <div>
        <p className="eyebrow">Functions</p>
        <h2>Reserve the apron mood for your group.</h2>
        <p>
          The Harvard Cafe MVP supports enquiries for aviation clubs, family occasions, corporate lunches,
          car clubs, biker breakfasts, year-end functions, and private events.
        </p>
        <div className="pill-list">
          {functionTypes.map((type) => <span key={type}>{type}</span>)}
        </div>
        <figure className="section-image-card">
          <img src={imageMap.functions.src} alt={imageMap.functions.alt} loading="lazy" />
        </figure>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Function enquiry</h3>
        <label>Name<input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} /></label>
        <label>Phone<input required value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} /></label>
        <label>Email<input type="email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} /></label>
        <div className="two-col">
          <label>Event date<input type="date" required value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} /></label>
          <label>Guests<input type="number" required min="1" value={form.guest_count} onChange={(e) => setForm({ ...form, guest_count: e.target.value })} /></label>
        </div>
        <label>Function type<select value={form.function_type} onChange={(e) => setForm({ ...form, function_type: e.target.value })}>{functionTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
        <label>Budget range<input value={form.budget_range} onChange={(e) => setForm({ ...form, budget_range: e.target.value })} placeholder="Placeholder: R150-R250 per guest" /></label>
        <label>Notes<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
        <button className="btn primary full" type="submit">Send enquiry</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  )
}

export default FunctionsSection
