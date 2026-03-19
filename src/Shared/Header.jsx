import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext.jsx'

function Header() {
  const [isNavShowing, setIsNavShowing] = useState(false)
  const { cartCount } = useCart()

  function handleNavToggle() {
    setIsNavShowing(!isNavShowing)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          Software School
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavToggle}
          aria-controls="navbarNav"
          aria-expanded={isNavShowing}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavShowing ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart
                {cartCount > 0 ? (
                  <span className="badge bg-warning text-dark ms-2">{cartCount}</span>
                ) : null}
              </Link>
            </li>
            <li className="nav-item">
              <a href="#courses" className="nav-link">
                Courses
              </a>
            </li>
            <li className="nav-item">
              <Link to="/update-profile" className="nav-link">
                Update Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Create Account
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
