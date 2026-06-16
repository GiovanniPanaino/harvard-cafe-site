function FunctionsPanel({ enquiries }) {
  const pendingEnquiries = enquiries.filter((item) => item.status === 'pending')

  return (
    <section className={pendingEnquiries.length > 0 ? 'admin-panel pending-alert-area' : 'admin-panel'}>
      <div className="panel-head">
        <h2>Function Enquiries</h2>
        <span>{pendingEnquiries.length} pending</span>
      </div>
      {enquiries.length === 0 ? (
        <p className="muted">No function enquiries returned yet.</p>
      ) : (
        enquiries.slice(0, 5).map((item) => (
          <article className={item.status === 'pending' ? 'mini-record pending-alert-record' : 'mini-record'} key={item.id}>
            <strong>{item.customer_name}</strong>
            <span>
              {item.function_type} - {item.guest_count} guests
            </span>
            <a href={`https://wa.me/${String(item.customer_phone).replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
              Open WhatsApp
            </a>
          </article>
        ))
      )}
    </section>
  )
}

export default FunctionsPanel
