import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import './Navbar.css'

function Navbar({ cartCount }) {
  const [user, setUser] = useState(null)
  const name = user?.user_metadata?.full_name || user?.email

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-jb">JB</span>
        <span className="logo-jewelry">JEWELRY</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/repair">Repair</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="nav-user">Hi, {name}</span>
            {user.email === 'grandpa@jbjewelry.com' && (
              <Link to="/admin" className="nav-admin">Admin</Link>
            )}
            <Link to="/orders" className="nav-orders">My Orders</Link>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn-login">Login</button></Link>
            <Link to="/signup"><button className="btn-signup">Sign Up</button></Link>
          </>
        )}
        <Link to="/cart" className="cart-icon">
         🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </ Link> 
        <span className="theme-toggle">🌙</span>
      </div>
    </nav>
  )
}

export default Navbar