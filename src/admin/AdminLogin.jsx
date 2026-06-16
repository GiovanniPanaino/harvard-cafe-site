function AdminLogin({ onLogin }) {
  function handleSubmit(event) {
    event.preventDefault()
    localStorage.setItem('harvard_admin_unlocked', 'true')
    onLogin()
  }

  return (
    <main className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Staff access placeholder</p>
        <h1>Harvard Command Deck</h1>
        <p>Use this temporary screen to enter the restaurant dashboard. Replace with real authentication before launch.</p>
        <label>Staff PIN<input required minLength="3" placeholder="1234" /></label>
        <button className="btn primary full" type="submit">Open Command Deck</button>
      </form>
    </main>
  )
}

export default AdminLogin
