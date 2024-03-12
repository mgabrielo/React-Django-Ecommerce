import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    currentUser: null,
    error: null
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpStart: (state, action) => {
            state.loading = true
            state.currentUser = {}
            state.error = null
        },
        signUpSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = null
        },
        signUpFailure: (state, action) => {
            state.loading = false
            state.currentUser = {}
            state.error = action.payload
        },
        signInStart: (state, action) => {
            state.loading = true
            state.currentUser = {}
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.currentUser = {}
            state.error = action.payload
        },
        signOutStart: (state, action) => {
            state.loading = true
            state.error = null
        },
        signOutSuccess: (state, action) => {
            state.loading = false
            state.currentUser = null
            state.error = null
        },
        signOutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
});

export const { signUpSuccess, signUpStart, signUpFailure, signInStart, signInSuccess, signInFailure, signOutStart, signOutSuccess, signOutFailure } = userReducer.actions

export default userReducer.reducer