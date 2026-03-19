import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'
import { useCart } from '../Context/CartContext.jsx'

function CartPage() {
  const {
    cartItems,
    savedItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    moveSavedToCart,
    removeFromSaved,
    clearCart,
  } = useCart()

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Cart</h1>
          {cartItems.length > 0 && (
            <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="alert alert-info">Your cart is empty.</div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            width="56"
                            height="56"
                            style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                          />
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Quantity controls">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <button className="btn btn-outline-secondary btn-sm" disabled>
                            {item.quantity}
                          </button>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <div className="card border-0 shadow-sm" style={{ minWidth: '260px' }}>
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <p className="mb-2">Items: {cartItems.length}</p>
                  <p className="fw-bold mb-0">Grand Total: ${cartTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-5">
          <h2 className="h5 mb-3">Saved for Later</h2>
          {savedItems.length === 0 ? (
            <div className="alert alert-secondary mb-0">No saved items yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            width="56"
                            height="56"
                            style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                          />
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => moveSavedToCart(item.id)}
                          >
                            Move to Cart
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => removeFromSaved(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CartPage
