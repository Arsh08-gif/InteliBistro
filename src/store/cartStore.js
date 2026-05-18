// This file is like Redux store in react. 
import { create } from 'zustand'

/*
state — the data (cart)
actions — functions that change the data (addItem, removeItem etc)

set — updates the state
get — reads the current state inside another function
*/

// store (one object) : {cart, addItem, removeItem, updateQty,clearCart},{},{}..
const useCartStore = create((set, get) => ({
    // initial cart state  : cart : [{},{},{}],
    cart: [],
    reservations: [],

    // actions to be performed over that state.
    addItem: (item, qty = 1) => {
        const existing = get().cart.find(c => c.id === item.id)
        if (existing) {
            set(state => ({
                cart: state.cart.map(c => c.id === item.id ? { ...c, qty: c.qty + qty } : c)
                // cart : [...state.cart, {...item, qty : item.qty + 1}]
            }))
        }
        else {
            set(state => ({
                cart: [...state.cart, { ...item, qty: qty }]
            }))
        }
    },

    removeItem: (itemId) => {
        set(state => ({
            cart: state.cart.filter(c => c.id != itemId)
        }))
    },

    updateQty: (itemId, qty) => {
        if (qty <= 0) {
            get().removeItem(itemId)
            return
        }

        set(state => ({
            cart: state.cart.map(c => c.id === itemId ? { ...c, qty: qty } : c)
        }))
    },

    addReservation: (reservation) => {
        set(state => ({
            reservations: [reservation, ...state.reservations]
        }))
    },
    cancelReservation: (id) => {
        set(state => ({
            reservations: state.reservations.filter(r => r.id !== id)
        }));
    },

    clearCart: () => set({ cart: [] })

}))

export default useCartStore