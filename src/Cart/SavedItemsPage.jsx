import { useDispatch, useSelector } from 'react-redux'
import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'
import { moveSavedToCart, removeFromSaved } from '../redux/cartSlice'

function SavedItemsPage() {
  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.cart.savedItems)

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Saved Items</h1>
          <span className="badge bg-secondary">{savedItems.length}</span>
        </div>

        {savedItems.length === 0 ? (
          <div className="alert alert-secondary">No saved items yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
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
                          onClick={() => dispatch(moveSavedToCart(item.id))}
                        >
                          Move to Cart
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => dispatch(removeFromSaved(item.id))}
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
      </main>
      <Footer />
    </>
  )
}

export default SavedItemsPage
