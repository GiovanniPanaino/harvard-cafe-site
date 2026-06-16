import { formatRand } from '../data/placeholderData'

function CartPanel({ cart, isOpen, onClose, updateQty }) {
  const subtotal = cart.reduce((total, item) => total + item.price_cents * item.qty, 0)

  return (
    <aside className={`cart-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="cart-panel-head">
        <h2>Takeaway Cart</h2>
        <button type="button" onClick={onClose} aria-label="Close cart">×</button>
      </div>
      {cart.length === 0 ? (
        <p className="muted">Your cart is ready for its first passenger.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-line" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>{formatRand(item.price_cents)}</span>
              </div>
              <div className="qty-control">
                <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>{formatRand(subtotal)}</strong>
          </div>
          <a className="btn primary full" href="#takeaway" onClick={onClose}>
            Continue to order
          </a>
        </>
      )}
    </aside>
  )
}

export default CartPanel
