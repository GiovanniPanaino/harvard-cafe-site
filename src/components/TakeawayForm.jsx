import { useState } from 'react'
import { submitOrder } from '../api/client'
import { formatRand } from '../data/placeholderData'

function TakeawayForm({ cart, setCart, updateQty }) {
  const initial = { customer_name: '', customer_phone: '', customer_email: '', collection_time: '', notes: '' }
  const [form, setForm] = useState(initial)
  const [message, setMessage] = useState('')
  const subtotal = cart.reduce((total, item) => total + item.price_cents * item.qty, 0)

  async function handleSubmit(event) {
    event.preventDefault()
    if (cart.length === 0) {
      setMessage('Please add at least one menu item before sending an order.')
      return
    }
    setMessage('')
    try {
      await submitOrder({
        ...form,
        payment_method: 'Pay on collection',
        items: cart.map((item) => ({ menu_item_id: item.id, qty: item.qty })),
      })
      setMessage('Your order has been sent and is awaiting restaurant confirmation.')
      setForm(initial)
      setCart([])
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <section className="section dark-band split-section" id="takeaway">
      <div>
        <p className="eyebrow">Order Takeaway</p>
        <h2>Ready for takeoff, paid on collection.</h2>
        <div className="order-summary">
          {cart.length === 0 ? (
            <p className="muted">Add items from the menu above to build a takeaway order.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-line compact" key={item.id}>
                <div><strong>{item.name}</strong><span>{formatRand(item.price_cents)}</span></div>
                <div className="qty-control">
                  <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>
            ))
          )}
          <div className="cart-total"><span>Subtotal</span><strong>{formatRand(subtotal)}</strong></div>
        </div>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Collection details</h3>
        <label>Name<input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} /></label>
        <label>Phone<input required value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} /></label>
        <label>Email optional<input type="email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} /></label>
        <label>Collection time<input type="time" required value={form.collection_time} onChange={(e) => setForm({ ...form, collection_time: e.target.value })} /></label>
        <label>Notes<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
        <p className="payment-note">Payment method: Pay on collection</p>
        <button className="btn primary full" type="submit">Send order</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  )
}

export default TakeawayForm
