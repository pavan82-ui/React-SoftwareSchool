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
  const [savedItems, setSavedItems] = useState(() => {
    const savedForLater = localStorage.getItem('savedItems')
    if (!savedForLater) {
      return []
    }

    try {
      return JSON.parse(savedForLater)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems))
  }, [savedItems])

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

  function saveForLater(product) {
    setSavedItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id)
      if (exists) {
        return prevItems
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        },
      ]
    })

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== product.id))
  }

  function removeFromSaved(productId) {
    setSavedItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  function moveSavedToCart(productId) {
    const savedProduct = savedItems.find((item) => item.id === productId)
    if (!savedProduct) {
      return
    }

    addToCart(savedProduct)
    removeFromSaved(productId)
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
    savedItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    saveForLater,
    removeFromSaved,
    moveSavedToCart,
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
