import { updateBookingStatus } from '../api/client'

const statuses = ['accepted', 'rejected', 'suggested_time']

function BookingsPanel({ bookings, onUpdated }) {
  const pendingBookings = bookings.filter((booking) => booking.status === 'pending')

  async function setStatus(bookingId, status) {
    const staffNote = status === 'suggested_time' ? window.prompt('Suggested time / staff note') || '' : ''
    await updateBookingStatus(bookingId, status, staffNote)
    onUpdated()
  }

  return (
    <section className={pendingBookings.length > 0 ? 'admin-panel wide pending-alert-area' : 'admin-panel wide'}>
      <div className="panel-head">
        <h2>Booking Requests</h2>
        <span>{pendingBookings.length} pending</span>
      </div>
      {bookings.length === 0 ? (
        <p className="muted">No bookings returned yet.</p>
      ) : (
        bookings.map((booking) => (
          <article className={booking.status === 'pending' ? 'admin-record pending-alert-record' : 'admin-record'} key={booking.id}>
            <div className="record-main">
              <h3>{booking.customer_name}</h3>
              <p>
                <a href={`https://wa.me/${String(booking.customer_phone).replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                  Open WhatsApp
                </a>{' '}
                - Phone: {booking.customer_phone}
              </p>
              <p>
                {booking.booking_date} at {booking.booking_time} - Guests: {booking.guests}
              </p>
              <p>
                Seating: {booking.seating_preference || 'not set'} - Occasion: {booking.occasion || 'not set'}
              </p>
              <p>
                Status: <span className="status-chip">{booking.status}</span>
              </p>
              {booking.notes && <p>Notes: {booking.notes}</p>}
            </div>
            <div className="button-stack">
              {statuses.map((status) => (
                <button key={status} type="button" onClick={() => setStatus(booking.id, status)}>
                  {status}
                </button>
              ))}
            </div>
          </article>
        ))
      )}
    </section>
  )
}

export default BookingsPanel
