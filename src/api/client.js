import { dailySpecials } from '../data/placeholderData'
import { getMenuData, getMenuItems } from '../data/menuStore'

export const API_BASE = import.meta.env.VITE_API_BASE || '/api'

const ORDER_KEY = 'harvard_demo_orders'
const BOOKING_KEY = 'harvard_demo_bookings'
const FUNCTION_KEY = 'harvard_demo_function_enquiries'

function readLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function sortPendingFirst(items) {
  return [...items].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1
    if (a.status !== 'pending' && b.status === 'pending') return 1
    return String(b.created_at || '').localeCompare(String(a.created_at || ''))
  })
}

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  const data = await response.json().catch(() => ({ success: false, message: 'Invalid JSON response' }))
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

export async function getMenu() {
  // GitHub Pages demo reads localStorage first. Replace with GET /api/menu_list.php when shared backend menu storage is live.
  const menuData = getMenuData()
  return { success: true, categories: menuData.categories, items: menuData.items, demo: true }
}

export async function getSpecials() {
  try {
    return await request('get_specials.php')
  } catch {
    return { success: true, specials: dailySpecials }
  }
}

export async function submitOrder(orderData) {
  try {
    return await request('submit_order.php', { method: 'POST', body: JSON.stringify(orderData) })
  } catch {
    const orders = readLocal(ORDER_KEY)
    const orderId = Date.now()
    const items = (orderData.items || []).map((line, index) => {
      const menuItem = getMenuItems().find((item) => String(item.id) === String(line.menu_item_id))
      const qty = Math.max(1, Number(line.qty || 1))
      const unitPrice = menuItem?.price_cents || 0
      return {
        id: `${orderId}-${index}`,
        order_id: orderId,
        menu_item_id: line.menu_item_id,
        item_name: menuItem?.name || 'Menu item',
        qty,
        unit_price_cents: unitPrice,
        line_total_cents: unitPrice * qty,
      }
    })
    const subtotal = items.reduce((total, item) => total + item.line_total_cents, 0)
    const orderNumber = `HC-DEMO-${String(orderId).slice(-6)}`
    const order = {
      id: orderId,
      order_number: orderNumber,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      customer_email: orderData.customer_email || '',
      collection_time: orderData.collection_time,
      notes: orderData.notes || '',
      status: 'pending',
      payment_method: orderData.payment_method || 'Pay on collection',
      subtotal_cents: subtotal,
      created_at: new Date().toISOString(),
      items,
    }
    writeLocal(ORDER_KEY, [order, ...orders])
    return { success: true, order_id: orderId, order_number: orderNumber, demo: true }
  }
}

export async function getOrders(status = '') {
  try {
    return await request(`get_orders.php${status ? `?status=${encodeURIComponent(status)}` : ''}`)
  } catch {
    const orders = readLocal(ORDER_KEY)
    const filtered = status ? orders.filter((order) => order.status === status) : orders
    return { success: true, orders: sortPendingFirst(filtered), demo: true }
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    return await request('update_order_status.php', { method: 'POST', body: JSON.stringify({ order_id: orderId, status }) })
  } catch {
    const orders = readLocal(ORDER_KEY).map((order) =>
      Number(order.id) === Number(orderId) ? { ...order, status, updated_at: new Date().toISOString() } : order,
    )
    writeLocal(ORDER_KEY, orders)
    return { success: true, demo: true }
  }
}

export async function submitBooking(bookingData) {
  try {
    return await request('submit_booking.php', { method: 'POST', body: JSON.stringify(bookingData) })
  } catch {
    const bookings = readLocal(BOOKING_KEY)
    const bookingId = Date.now()
    const booking = {
      id: bookingId,
      ...bookingData,
      status: 'pending',
      created_at: new Date().toISOString(),
    }
    writeLocal(BOOKING_KEY, [booking, ...bookings])
    return { success: true, booking_id: bookingId, demo: true }
  }
}

export async function getBookings(status = '') {
  try {
    return await request(`get_bookings.php${status ? `?status=${encodeURIComponent(status)}` : ''}`)
  } catch {
    const bookings = readLocal(BOOKING_KEY)
    const filtered = status ? bookings.filter((booking) => booking.status === status) : bookings
    return { success: true, bookings: sortPendingFirst(filtered), demo: true }
  }
}

export async function updateBookingStatus(bookingId, status, staffNote = '') {
  try {
    return await request('update_booking_status.php', {
      method: 'POST',
      body: JSON.stringify({ booking_id: bookingId, status, staff_note: staffNote }),
    })
  } catch {
    const bookings = readLocal(BOOKING_KEY).map((booking) =>
      Number(booking.id) === Number(bookingId)
        ? { ...booking, status, staff_note: staffNote, updated_at: new Date().toISOString() }
        : booking,
    )
    writeLocal(BOOKING_KEY, bookings)
    return { success: true, demo: true }
  }
}

export async function submitFunctionEnquiry(data) {
  try {
    return await request('submit_function_enquiry.php', { method: 'POST', body: JSON.stringify(data) })
  } catch {
    const enquiries = readLocal(FUNCTION_KEY)
    const enquiryId = Date.now()
    writeLocal(FUNCTION_KEY, [{ id: enquiryId, ...data, status: 'pending', created_at: new Date().toISOString() }, ...enquiries])
    return { success: true, enquiry_id: enquiryId, demo: true }
  }
}

export async function getFunctionEnquiries() {
  try {
    return await request('get_function_enquiries.php')
  } catch {
    return { success: true, enquiries: sortPendingFirst(readLocal(FUNCTION_KEY)), demo: true }
  }
}
