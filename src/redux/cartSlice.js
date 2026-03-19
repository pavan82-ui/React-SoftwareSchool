import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  savedItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCartState(state, action) {
      state.cartItems = action.payload?.cartItems || []
      state.savedItems = action.payload?.savedItems || []
    },
    addToCart(state, action) {
      const product = action.payload
      const existingItem = state.cartItems.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cartItems.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        })
      }
    },
    updateQuantity(state, action) {
      const { productId, nextQuantity } = action.payload
      const existingItem = state.cartItems.find((item) => item.id === productId)

      if (!existingItem) {
        return
      }

      if (nextQuantity <= 0) {
        state.cartItems = state.cartItems.filter((item) => item.id !== productId)
      } else {
        existingItem.quantity = nextQuantity
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== productId)
    },
    clearCart(state) {
      state.cartItems = []
    },
    saveForLater(state, action) {
      const product = action.payload
      const exists = state.savedItems.some((item) => item.id === product.id)

      if (!exists) {
        state.savedItems.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        })
      }

      state.cartItems = state.cartItems.filter((item) => item.id !== product.id)
    },
    removeFromSaved(state, action) {
      const productId = action.payload
      state.savedItems = state.savedItems.filter((item) => item.id !== productId)
    },
    moveSavedToCart(state, action) {
      const productId = action.payload
      const savedProduct = state.savedItems.find((item) => item.id === productId)

      if (!savedProduct) {
        return
      }

      const existingCartItem = state.cartItems.find((item) => item.id === productId)

      if (existingCartItem) {
        existingCartItem.quantity += 1
      } else {
        state.cartItems.push({
          id: savedProduct.id,
          title: savedProduct.title,
          price: savedProduct.price,
          thumbnail: savedProduct.thumbnail,
          quantity: 1,
        })
      }

      state.savedItems = state.savedItems.filter((item) => item.id !== productId)
    },
  },
})

export const {
  hydrateCartState,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  saveForLater,
  removeFromSaved,
  moveSavedToCart,
} = cartSlice.actions

export default cartSlice.reducer
