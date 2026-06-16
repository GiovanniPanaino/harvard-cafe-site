import { useState } from 'react'
import { submitBooking } from '../api/client'

function BookingForm() {
  const initial = {
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    booking_date: '',
    booking_time: '',
    guests: '',
    seating_preference: 'Apron view if available',
    occasion: '',
    notes: '',
  }
  const [form, setForm] = useState(initial)
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    try {
      await submitBooking(form)
      setMessage('Your booking request has been sent and is awaiting restaurant confirmation.')
      setForm(initial)
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <section className="section split-section" id="bookings">
      <div>
        <p className="eyebrow">Reserve Your Apron Seat</p>
        <h2>Booking requests land as pending until staff confirm.</h2>
        <p>
          This MVP keeps reservations practical: customers request a table, and the Harvard Command Deck
          lets staff accept, reject, or suggest a new time.
        </p>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Book a table</h3>
        <label>Name<input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} /></label>
        <label>Phone<input required value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} /></label>
        <label>Email optional<input type="email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} /></label>
        <div className="two-col">
          <label>Date<input type="date" required value={form.booking_date} onChange={(e) => setForm({ ...form, booking_date: e.target.value })} /></label>
          <label>Time<input type="time" required value={form.booking_time} onChange={(e) => setForm({ ...form, booking_time: e.target.value })} /></label>
        </div>
        <label>Number of guests<input type="number" min="1" required value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} /></label>
        <label>Seating preference<select value={form.seating_preference} onChange={(e) => setForm({ ...form, seating_preference: e.target.value })}>
          <option>Apron view if available</option>
          <option>Inside restaurant</option>
          <option>Outside / patio</option>
          <option>No preference</option>
        </select></label>
        <label>Occasion<input value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} /></label>
        <label>Notes<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
        <button className="btn primary full" type="submit">Send booking request</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  )
}

export default BookingForm
