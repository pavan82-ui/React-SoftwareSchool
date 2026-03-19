import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Login from './Auth/Login.jsx'
import Signup from './Auth/Signup.jsx'
import ResetPword from './Auth/ResetPword.jsx'
import ProductsList from './Products/ProductsList.jsx'
import ProductDetail from './Products/ProductDetail.jsx'
import UpdateProfile from './Profile/UpdateProfile.jsx'
import CartPage from './Cart/CartPage.jsx'
import SavedItemsPage from './Cart/SavedItemsPage.jsx'
import UsersPage from './Users/UsersPage.jsx'
import { CartProvider } from './Context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpword" element={<ResetPword />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/saved-items" element={<SavedItemsPage />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
