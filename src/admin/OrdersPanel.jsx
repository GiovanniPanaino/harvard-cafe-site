import { useMemo, useState } from 'react'
import { updateOrderStatus } from '../api/client'
import { formatRand } from '../data/menuStore'

const statuses = ['accepted', 'rejected', 'preparing', 'ready', 'collected']
const finalizedStatuses = ['collected', 'rejected']

function orderDate(order) {
  if (!order.created_at) return ''
  return String(order.created_at).slice(0, 10)
}

function OrderRecord({ order, onStatusChange, isLibrary = false }) {
  return (
    <article className={order.status === 'pending' ? 'admin-record pending-alert-record' : 'admin-record'}>
      <div className="record-main">
        <h3>{order.order_number || `Order #${order.id}`}</h3>
        <p>
          <strong>{order.customer_name}</strong> -{' '}
          <a href={`https://wa.me/${String(order.customer_phone).replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
            Open WhatsApp
          </a>
        </p>
        <p>
          Phone: {order.customer_phone} - Collection: {order.collection_time || 'not set'} - {formatRand(order.subtotal_cents)}
        </p>
        <p>
          Date: {orderDate(order) || 'not captured'} - Status: <span className="status-chip">{order.status}</span>
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
      {!isLibrary && (
        <div className="button-stack">
          {statuses.map((status) => (
            <button key={status} type="button" onClick={() => onStatusChange(order.id, status)}>
              {status}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}

function OrdersPanel({ orders, onUpdated }) {
  const [libraryCustomer, setLibraryCustomer] = useState('')
  const [libraryDate, setLibraryDate] = useState('')

  const currentOrders = useMemo(() => {
    return orders.filter((order) => !finalizedStatuses.includes(order.status))
  }, [orders])

  const pendingOrders = currentOrders.filter((order) => order.status === 'pending')

  const previousOrders = useMemo(() => {
    const customerQuery = libraryCustomer.trim().toLowerCase()

    return orders.filter((order) => {
      if (!finalizedStatuses.includes(order.status)) return false

      const matchesCustomer =
        !customerQuery ||
        `${order.customer_name || ''} ${order.customer_phone || ''} ${order.order_number || ''}`.toLowerCase().includes(customerQuery)
      const matchesDate = !libraryDate || orderDate(order) === libraryDate

      return matchesCustomer && matchesDate
    })
  }, [libraryCustomer, libraryDate, orders])

  async function setStatus(orderId, status) {
    await updateOrderStatus(orderId, status)
    onUpdated()
  }

  return (
    <section className={pendingOrders.length > 0 ? 'admin-panel wide pending-alert-area orders-panel' : 'admin-panel wide orders-panel'}>
      <div className="panel-head">
        <h2>Incoming Orders</h2>
        <span>
          {currentOrders.length} current / {pendingOrders.length} pending
        </span>
      </div>

      <div className="current-orders-list">
        {currentOrders.length === 0 ? (
          <p className="muted">No current orders. Finalized orders are available in the library below.</p>
        ) : (
          currentOrders.map((order) => <OrderRecord key={order.id} order={order} onStatusChange={setStatus} />)
        )}
      </div>

      <div className="order-library">
        <div className="panel-head order-library-head">
          <div>
            <h3>Previous Order Library</h3>
            <p>Search finalized orders by customer, phone, order number, or date.</p>
          </div>
          <span>{previousOrders.length} found</span>
        </div>

        <div className="order-library-toolbar">
          <label>
            Customer / phone
            <input value={libraryCustomer} onChange={(event) => setLibraryCustomer(event.target.value)} placeholder="Search customer or phone" />
          </label>
          <label>
            Order date
            <input type="date" value={libraryDate} onChange={(event) => setLibraryDate(event.target.value)} />
          </label>
          <button className="compact-button" type="button" onClick={() => { setLibraryCustomer(''); setLibraryDate('') }}>
            Clear
          </button>
        </div>

        <div className="previous-orders-list">
          {previousOrders.length === 0 ? (
            <p className="muted">No previous orders match this search.</p>
          ) : (
            previousOrders.map((order) => <OrderRecord key={order.id} order={order} onStatusChange={setStatus} isLibrary />)
          )}
        </div>
      </div>
    </section>
  )
}

export default OrdersPanel
