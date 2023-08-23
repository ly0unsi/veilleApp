import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {

            state.user = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setUser } = AuthSlice.actions

export default AuthSlice.reducer