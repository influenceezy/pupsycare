'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/products'

export interface CartItem {
  cartItemId: string   // `${product.id}-${packChews}${isSubscription ? '-sub' : ''}`
  product: Product
  quantity: number
  packChews: number
  packLabel: string    // e.g. "30 Chews"
  packPrice: number
  isSubscription: boolean
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, packChews: number, packPrice: number, isSubscription?: boolean) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, packChews, packPrice, isSubscription = false) => {
        const cartItemId = `${product.id}-${packChews}${isSubscription ? '-sub' : ''}`
        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === cartItemId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                cartItemId,
                product,
                quantity: 1,
                packChews,
                packLabel: `${packChews} Chews`,
                packPrice,
                isSubscription,
              },
            ],
          }
        })
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }))
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (open) => set({ isOpen: open }),

      total: () => {
        return get().items.reduce((sum, i) => sum + i.packPrice * i.quantity, 0)
      },

      itemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
    }),
    {
      name: 'pupsy-cart',
    }
  )
)
