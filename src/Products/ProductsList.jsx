import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'
import {
  addToCart,
  removeFromCart,
  saveForLater,
  removeFromSaved,
} from '../redux/cartSlice'

function ProductsList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toggledStars, setToggledStars] = useState(new Set())
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const savedItems = useSelector((state) => state.cart.savedItems)

  useEffect(() => {
    getProductsList()
  }, [])

  async function getProductsList() {
    try {
      setLoading(true)
      const apiResponse = await fetch('https://dummyjson.com/products')
      const apiData = await apiResponse.json()
      setProducts(apiData.products)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  function toggleStar(productId) {
    setToggledStars((prevToggled) => {
      const newToggled = new Set(prevToggled)
      if (newToggled.has(productId)) {
        newToggled.delete(productId)
      } else {
        newToggled.add(productId)
      }
      return newToggled
    })
  }

  function formatPrice(price) {
    return `$${Number(price).toFixed(2)}`
  }

  function truncateDescription(description) {
    if (!description) {
      return ''
    }

    if (description.length <= 60) {
      return description
    }

    return `${description.substring(0, 60)}...`
  }

  function isProductInCart(productId) {
    return cartItems.some((item) => item.id === productId)
  }

  function isProductSaved(productId) {
    return savedItems.some((item) => item.id === productId)
  }

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="h3 mb-0">Products</h1>
          </div>
        </div>

        {loading && (
          <div className="alert alert-info text-center">
            Loading products...
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="row g-4">
            {products.map((product) => {
              const inCart = isProductInCart(product.id)
              const inSaved = isProductSaved(product.id)

              return (
                <div key={product.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div
                      style={{
                        height: '200px',
                        overflow: 'hidden',
                        backgroundColor: '#f5f5f5',
                      }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-truncate">{product.title}</h5>
                      <p className="card-text text-muted small">
                        {truncateDescription(product.description)}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h6 fw-bold mb-0">{formatPrice(product.price)}</span>
                        <span
                          className={`badge cursor-pointer ${
                            toggledStars.has(product.id) ? 'bg-danger' : 'bg-success'
                          }`}
                          onClick={() => toggleStar(product.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          {product.rating}⭐
                        </span>
                      </div>
                    </div>
                    <div className="card-footer bg-light border-0 d-grid gap-2">
                      <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm w-100">
                        View Details
                      </Link>
                      <button
                        className={`btn btn-sm w-100 ${inCart ? 'btn-outline-danger' : 'btn-outline-primary'}`}
                        onClick={() => {
                          if (inCart) {
                            dispatch(removeFromCart(product.id))
                          } else {
                            dispatch(addToCart(product))
                          }
                        }}
                      >
                        {inCart ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                      <button
                        className={`btn btn-sm w-100 ${inSaved ? 'btn-outline-danger' : 'btn-outline-secondary'}`}
                        onClick={() => {
                          if (inSaved) {
                            dispatch(removeFromSaved(product.id))
                          } else {
                            dispatch(saveForLater(product))
                          }
                        }}
                      >
                        {inSaved ? 'Remove Saved Item' : 'Save for Later'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="alert alert-warning text-center">
            No products found.
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default ProductsList



