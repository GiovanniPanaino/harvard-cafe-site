import { updateOrderStatus } from '../api/client'
import { formatRand } from '../data/placeholderData'

const statuses = ['accepted', 'rejected', 'preparing', 'ready', 'collected']

function OrdersPanel({ orders, onUpdated }) {
  const pendingOrders = orders.filter((order) => order.status === 'pending')

  async function setStatus(orderId, status) {
    await updateOrderStatus(orderId, status)
    onUpdated()
  }

  return (
    <section className={pendingOrders.length > 0 ? 'admin-panel wide pending-alert-area' : 'admin-panel wide'}>
      <div className="panel-head">
        <h2>Incoming Orders</h2>
        <span>{pendingOrders.length} pending</span>
      </div>
      {orders.length === 0 ? (
        <p className="muted">No orders returned yet.</p>
      ) : (
        orders.map((order) => (
          <article className={order.status === 'pending' ? 'admin-record pending-alert-record' : 'admin-record'} key={order.id}>
            <div className="record-main">
              <h3>{order.order_number || `Order #${order.id}`}</h3>
              <p>
                <strong>{order.customer_name}</strong> -{' '}
                <a href={`https://wa.me/${String(order.customer_phone).replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                  Open WhatsApp
                </a>
              </p>
              <p>
                Phone: {order.customer_phone} - Collection: {order.collection_time || 'not set'} -{' '}
                {formatRand(order.subtotal_cents)}
              </p>
              <p>
                Status: <span className="status-chip">{order.status}</span>
              </p>
              {order.items?.length > 0 && (
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.qty} x {item.item_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="button-stack">
              {statuses.map((status) => (
                <button key={status} type="button" onClick={() => setStatus(order.id, status)}>
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

export default OrdersPanel
