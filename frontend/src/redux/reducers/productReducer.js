import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    products: null,
    error: false,
    product: null
}

const productReducer = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productListStart: (state, action) => {
            state.loading = true
            state.products = []
            state.error = null
        },
        productListSuccess: (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = null
        },
        productListFailure: (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.payload
        },
        productDetailStart: (state, action) => {
            state.loading = true
            state.product = {}
            state.error = null
        },
        productDetailSuccess: (state, action) => {
            state.loading = false
            state.product = action.payload
            state.error = null
        },
        productDetailFailure: (state, action) => {
            state.loading = false
            state.product = {}
            state.error = action.payload
        },
    }
});

export const {
    productListStart,
    productListSuccess,
    productListFailure,
    productDetailStart,
    productDetailSuccess,
    productDetailFailure
} = productReducer.actions

export default productReducer.reducer