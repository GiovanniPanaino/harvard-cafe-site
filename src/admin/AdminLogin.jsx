import { useState } from 'react'

// Demo-only access control for GitHub Pages.
// Production must use server-side authentication before allowing uploads.
const DEMO_ACCESS_CODE = import.meta.env.VITE_GALLERY_ACCESS_CODE || 'change-this-before-production'

function AdminLogin({ onLogin }) {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (accessCode !== DEMO_ACCESS_CODE) {
      setError('Access code not recognised.')
      return
    }

    sessionStorage.setItem('harvard_gallery_access', 'true')
    onLogin()
  }

  return (
    <main className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Gallery access</p>
        <h1>Harvard Gallery Command Deck</h1>
        <p>
          Demo-only access for one authorised person. Frontend access codes are not secure; production must use
          server-side authentication.
        </p>
        <label>
          Access code
          <input
            required
            value={accessCode}
            placeholder="Enter access code"
            type="password"
            onChange={(event) => setAccessCode(event.target.value)}
          />
        </label>
        {error ? <p className="admin-error">{error}</p> : null}
        <button className="btn primary full" type="submit">Open Command Deck</button>
      </form>
    </main>
  )
}

export default AdminLogin
