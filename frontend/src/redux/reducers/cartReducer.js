import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    qty: null,
    totalQuantity: 0,
}

const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existingItem = state.cartItems.find((product) => product.id === item.id)
            if (!existingItem) {
                state.cartItems.push({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    totalPrice: item.price,
                    stockCount: item.stockCount,
                    qty: item.qty
                })
                state.totalQuantity++
            } else {
                existingItem.qty++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(item.price)
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload
            state.cartItems.filter((product) => product.id !== itemId)
        }
    }
});

export const {
    addToCart, removeFromCart
} = cartReducer.actions

export default cartReducer.reducer