import { useState } from 'react'
import { submitOrder } from '../api/client'
import { formatRand } from '../data/menuStore'

function TakeawayForm({ cart, setCart, updateQty }) {
  const initial = { customer_name: '', customer_phone: '', collection_time: '', notes: '' }
  const [form, setForm] = useState(initial)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const subtotal = cart.reduce((total, item) => total + item.price_cents * item.qty, 0)

  function showMessage(text, type = 'success') {
    setMessage(text)
    setMessageType(type)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (cart.length === 0) {
      showMessage('Your flight tray is empty. Choose a category above to begin.', 'error')
      return
    }

    if (!form.customer_name.trim()) {
      showMessage('Please add your name so the restaurant knows who the order is for.', 'error')
      return
    }

    if (!form.customer_phone.trim()) {
      showMessage('Please add a phone number so Harvard Cafe can confirm your collection time.', 'error')
      return
    }

    const orderPayload = {
      ...form,
      customer_email: '',
      payment_method: 'Pay on collection',
      items: cart.map((cartItem) => ({ menu_item_id: cartItem.id, qty: cartItem.qty })),
    }

    try {
      // Connect the live takeaway API here when the restaurant backend is available.
      const result = await submitOrder(orderPayload)
      if (result.demo) {
        console.log('Mock takeaway order prepared for sending:', { ...orderPayload, total_cents: subtotal })
        showMessage('Your takeaway order has been prepared for sending. The restaurant must still confirm availability and collection time.')
      } else {
        showMessage('Your order has been sent and is awaiting restaurant confirmation.')
      }
      setForm(initial)
      setCart([])
    } catch (error) {
      showMessage(error.message || 'Sorry, the order could not be prepared. Please try again.', 'error')
    }
  }

  return (
    <section className="section dark-band split-section takeaway-order-section" id="takeaway">
      <div>
        <p className="eyebrow">Flight Tray</p>
        <h2>Order Tally</h2>
        <div className="order-summary">
          {cart.length === 0 ? (
            <p className="empty-flight-tray">Your flight tray is empty. Choose a category above to begin.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-line compact tally-line" key={item.id}>
                <div className="tally-item-main">
                  <strong>{item.name}</strong>
                  <span>
                    {item.qty} x {formatRand(item.price_cents)}
                  </span>
                </div>
                <div className="tally-controls">
                  <div className="qty-control" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" onClick={() => updateQty(item.id, item.qty - 1)} aria-label={`Remove one ${item.name}`}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.id, item.qty + 1)} aria-label={`Add one ${item.name}`}>
                      +
                    </button>
                  </div>
                  <button className="remove-line" type="button" onClick={() => updateQty(item.id, 0)}>
                    Remove
                  </button>
                  <strong>{formatRand(item.price_cents * item.qty)}</strong>
                </div>
              </div>
            ))
          )}
          <div className="cart-total tally-total">
            <span>Total order amount</span>
            <strong>{formatRand(subtotal)}</strong>
          </div>
        </div>
      </div>

      <form className="form-card takeaway-details-card" onSubmit={handleSubmit}>
        <h3>Customer details</h3>
        <label>
          Customer name
          <input value={form.customer_name} onChange={(event) => setForm({ ...form, customer_name: event.target.value })} />
        </label>
        <label>
          Phone number
          <input inputMode="tel" value={form.customer_phone} onChange={(event) => setForm({ ...form, customer_phone: event.target.value })} />
        </label>
        <label>
          Preferred collection time
          <input type="time" value={form.collection_time} onChange={(event) => setForm({ ...form, collection_time: event.target.value })} />
        </label>
        <label>
          Notes / special instructions
          <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
        </label>
        <p className="payment-note">Payment method: Pay on collection</p>
        <button className="btn primary full" type="submit">
          Send Order Request
        </button>
        {message && <p className={messageType === 'error' ? 'form-message error' : 'form-message'}>{message}</p>}
      </form>
    </section>
  )
}

export default TakeawayForm
