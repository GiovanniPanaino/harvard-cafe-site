function AdminPlaceholderPanel({ title, body }) {
  return (
    <section className="admin-panel placeholder-panel">
      <h2>{title}</h2>
      <p>{body}</p>
    </section>
  )
}

export default AdminPlaceholderPanel
