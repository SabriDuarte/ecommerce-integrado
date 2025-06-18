import { create } from 'zustand'

// Obtener carrito desde localStorage
const getInitialCart = () => {
  const stored = localStorage.getItem('cart')
  return stored ? JSON.parse(stored) : []
}

export const useCartStore = create((set, get) => ({
  cart: getInitialCart(),

  addToCart: (product) => {
    const existing = get().cart.find(p => p._id === product._id)

    let updatedCart
    if (existing) {
      updatedCart = get().cart.map(p =>
        p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
      )
    } else {
      updatedCart = [...get().cart, { ...product, quantity: 1 }]
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    set({ cart: updatedCart })
  },

  removeFromCart: (id) => {
    const updatedCart = get().cart.filter(p => p._id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    set({ cart: updatedCart })
  },

  increaseQuantity: (id) => {
    const updatedCart = get().cart.map(p =>
      p._id === id ? { ...p, quantity: p.quantity + 1 } : p
    )
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    set({ cart: updatedCart })
  },

  decreaseQuantity: (id) => {
    const updatedCart = get().cart
      .map(p =>
        p._id === id ? { ...p, quantity: p.quantity - 1 } : p
      )
      .filter(p => p.quantity > 0) // Elimina si la cantidad llega a 0

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    set({ cart: updatedCart })
  },

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ cart: [] })
  }
}))
