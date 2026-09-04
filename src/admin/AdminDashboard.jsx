import GalleryManager from './GalleryManager'

function AdminDashboard({ onLogout }) {
  function logout() {
    sessionStorage.removeItem('harvard_gallery_access')
    onLogout()
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="eyebrow">Gallery access</p>
          <h1>Harvard Gallery Command Deck</h1>
          <p>Replace selected gallery images used on the public website.</p>
        </div>
        <div className="admin-actions">
          <button className="btn ghost" type="button" onClick={logout}>Logout</button>
        </div>
      </header>
      {/* TODO production: replace demo storage with server-side login, PHP upload endpoint, /uploads/gallery/,
          file validation, image compression/resizing, JSON or database references, and proper authentication. */}
      <GalleryManager />
    </main>
  )
}

export default AdminDashboard
