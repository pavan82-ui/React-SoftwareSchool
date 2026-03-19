import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem('cartItems')
    if (!savedItems) {
      return []
    }

    try {
      return JSON.parse(savedItems)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ]
    })
  }

  function updateQuantity(productId, nextQuantity) {
    if (nextQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    )
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setCartItems([])
  }

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}

export { CartProvider, useCart }
