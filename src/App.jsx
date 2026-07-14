import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './Login.jsx'
import { CartProvider } from './CartContext'
import ProductList from './ProductList'
import Cart from './Cart'

function App() {

  return (
    <CartProvider>
      <div className="app">
        <h1>Shopping App</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  )
}

export default App
