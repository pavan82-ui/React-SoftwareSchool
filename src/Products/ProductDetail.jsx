import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'
import { useCart } from '../Context/CartContext.jsx'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cartMessage, setCartMessage] = useState('')
  const { addToCart, removeFromCart, saveForLater, removeFromSaved, cartItems, savedItems } = useCart()

  useEffect(() => {
    getSingleProductData()
  }, [id])

  async function getSingleProductData() {
    try {
      setLoading(true)
      const apiResponse = await fetch(`https://dummyjson.com/products/${id}`)
      const apiData = await apiResponse.json()
      setProduct(apiData)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load product details')
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container py-5">
          <div className="alert alert-info text-center">Loading product details...</div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="container py-5">
          <div className="alert alert-danger">
            {error || 'Product not found'}
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const inCart = cartItems.some((item) => item.id === product.id)
  const inSaved = savedItems.some((item) => item.id === product.id)

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row">
          {/* Product Image */}
          <div className="col-12 col-md-6 mb-4">
            <div
              style={{
                height: '400px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="mt-3">
                <small className="text-muted d-block mb-2">Additional Images:</small>
                <div className="row g-2">
                  {product.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="col-3">
                      <div
                        style={{
                          height: '100px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <img
                          src={img}
                          alt={`${product.title} ${idx + 1}`}
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="col-12 col-md-6">
            <h1 className="h2 mb-2">{product.title}</h1>
            <p className="text-muted mb-3">{product.brand || 'Brand not available'}</p>

            {/* Rating and Price */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div>
                <span className="badge bg-success fs-6">{product.rating}⭐ Rating</span>
              </div>
              <div>
                <h3 className="mb-0">${product.price}</h3>
              </div>
              {product.discountPercentage && (
                <div>
                  <span className="badge bg-danger">{product.discountPercentage}% OFF</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <h5 className="mb-2">Description</h5>
              <p className="text-muted">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              <h5 className="mb-2">Availability</h5>
              <p className="mb-0">
                <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </p>
            </div>

            {/* Category */}
            {product.category && (
              <div className="mb-4">
                <h5 className="mb-2">Category</h5>
                <p className="mb-0">{product.category}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-grid gap-2">
              <button
                className={`btn btn-lg ${inCart ? 'btn-outline-danger' : 'btn-primary'}`}
                disabled={product.stock === 0}
                onClick={() => {
                  if (inCart) {
                    removeFromCart(product.id)
                    setCartMessage('Product removed from cart')
                  } else {
                    addToCart(product)
                    setCartMessage('Product added to cart')
                  }
                }}
              >
                {product.stock > 0 ? (inCart ? 'Remove from Cart' : 'Add to Cart') : 'Out of Stock'}
              </button>
              <button
                className={`btn btn-lg ${inSaved ? 'btn-outline-danger' : 'btn-outline-secondary'}`}
                onClick={() => {
                  if (inSaved) {
                    removeFromSaved(product.id)
                    setCartMessage('Removed from saved items')
                  } else {
                    saveForLater(product)
                    setCartMessage('Product saved for later')
                  }
                }}
              >
                {inSaved ? 'Remove Saved Item' : 'Save for Later'}
              </button>
            </div>
            {cartMessage ? <div className="alert alert-success mt-3 mb-0">{cartMessage}</div> : null}

            {/* Additional Info */}
            {product.warranty || product.return_policy && (
              <div className="mt-4 p-3 bg-light rounded">
                {product.warranty && (
                  <p className="mb-2 small">
                    <strong>Warranty:</strong> {product.warranty}
                  </p>
                )}
                {product.return_policy && (
                  <p className="mb-0 small">
                    <strong>Return Policy:</strong> {product.return_policy}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="mb-4">Customer Reviews</h3>
              <div className="row g-3">
                {product.reviews.slice(0, 3).map((review, idx) => (
                  <div key={idx} className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="card-subtitle">{review.reviewerName}</h6>
                          <span className="badge bg-warning text-dark">{review.rating}★</span>
                        </div>
                        <p className="card-text small text-muted">{review.comment}</p>
                        <small className="text-muted">{review.date}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default ProductDetail
