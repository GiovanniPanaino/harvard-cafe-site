import { useEffect, useMemo, useState } from 'react'
import { getMenu, submitOrder } from '../api/client'
import { formatRand } from '../data/placeholderData'

function TakeawayForm({ cart, setCart, updateQty, standalone = false }) {
  const initial = { customer_name: '', customer_phone: '', customer_email: '', collection_time: '', notes: '' }
  const [form, setForm] = useState(initial)
  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const subtotal = cart.reduce((total, item) => total + item.price_cents * item.qty, 0)

  useEffect(() => {
    if (!standalone) return
    getMenu().then((data) => {
      setCategories(data.categories || [])
      setItems(data.items || [])
    })
  }, [standalone])

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const categoryMatch = activeCategory === 'all' || Number(item.category_id) === Number(activeCategory)
      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.description || '').toLowerCase().includes(query)
      return categoryMatch && searchMatch
    })
  }, [activeCategory, items, search])

  function addToOrder(item) {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return current.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem))
      }
      return [...current, { ...item, qty: 1 }]
    })
  }

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

  const cartSummary = (
    <div className="order-summary">
      {cart.length === 0 ? (
        <p className="muted">Add items to build a takeaway order.</p>
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
  )

  const detailsForm = (
    <form className="form-card order-details-form" id="order-details" onSubmit={handleSubmit}>
      <h3>Collection details</h3>
      <label>Name<input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} /></label>
      <label>Phone<input required value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} /></label>
      <label>Email optional<input type="email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} /></label>
      <label>Collection time<input type="time" required value={form.collection_time} onChange={(e) => setForm({ ...form, collection_time: e.target.value })} /></label>
      <label>Notes<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
      <p className="payment-note">Payment method: Pay on collection</p>
      <button className="btn btn-primary full" type="submit">Send order</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  )

  if (standalone) {
    return (
      <>
        <header className="order-topbar">
          <a className="brand" href="#/" aria-label="Back to The Harvard Cafe home">
            <span className="brand-logo-slot"><span className="brand-mark">HC</span></span>
            <span className="brand-copy">
              <strong>The Harvard Cafe</strong>
              <small>Order Take Away</small>
            </span>
          </a>
          <a className="btn btn-outline btn-small" href="#/">Home</a>
        </header>
        <section className="order-app" id="order">
          <div className="order-menu">
            <div className="order-intro">
              <p className="eyebrow">Mobile ordering</p>
              <h1>Take away, fast.</h1>
            </div>
            <label className="search-label">
              <span>Search menu</span>
              <input
                type="search"
                placeholder="Search breakfast, burgers, coffee..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <div className="category-chips" role="tablist" aria-label="Order categories">
              <button className={activeCategory === 'all' ? 'active' : ''} type="button" onClick={() => setActiveCategory('all')}>
                All
              </button>
              {categories.map((category) => (
                <button
                  className={Number(activeCategory) === Number(category.id) ? 'active' : ''}
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="order-item-list">
              {filteredItems.map((item) => (
                <article className="order-item-row" key={item.id}>
                  <div>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <strong>{formatRand(item.price_cents)}</strong>
                  </div>
                  <button className="btn btn-primary btn-small" disabled={!item.available} type="button" onClick={() => addToOrder(item)}>
                    Add
                  </button>
                </article>
              ))}
            </div>
          </div>
          <aside className="order-cart">
            <h2>Your order</h2>
            {cartSummary}
            {detailsForm}
          </aside>
        </section>
        <div className="sticky-cart-bar">
          <span>{cart.reduce((total, item) => total + item.qty, 0)} items</span>
          <strong>{formatRand(subtotal)}</strong>
          <a href="#order-details">Checkout</a>
        </div>
      </>
    )
  }

  return (
    <section className="section split-section" id="takeaway">
      <div>
        <p className="eyebrow">Order Take Away</p>
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
      {detailsForm}
    </section>
  )
}

export default TakeawayForm
