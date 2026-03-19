import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { hydrateCartState } from './cartSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

const persistedState = localStorage.getItem('reduxCartState')
if (persistedState) {
  try {
    store.dispatch(hydrateCartState(JSON.parse(persistedState)))
  } catch {
    localStorage.removeItem('reduxCartState')
  }
}

store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem(
    'reduxCartState',
    JSON.stringify({
      cartItems: state.cart.cartItems,
      savedItems: state.cart.savedItems,
    }),
  )
})

export default store
