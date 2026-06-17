import { formatRand } from '../data/menuStore'

function CartPanel({ cart, isOpen, onClose, updateQty }) {
  const subtotal = cart.reduce((total, item) => total + item.price_cents * item.qty, 0)

  return (
    <aside className={`cart-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="cart-panel-head">
        <h2>Flight Tray</h2>
        <button type="button" onClick={onClose} aria-label="Close cart">
          x
        </button>
      </div>
      {cart.length === 0 ? (
        <p className="muted">Your flight tray is empty. Choose a category above to begin.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-line" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.qty} x {formatRand(item.price_cents)}
                </span>
              </div>
              <div className="qty-control">
                <button type="button" onClick={() => updateQty(item.id, item.qty - 1)} aria-label={`Remove one ${item.name}`}>
                  -
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => updateQty(item.id, item.qty + 1)} aria-label={`Add one ${item.name}`}>
                  +
                </button>
              </div>
              <strong>{formatRand(item.price_cents * item.qty)}</strong>
            </div>
          ))}
          <div className="cart-total">
            <span>Order Tally</span>
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
