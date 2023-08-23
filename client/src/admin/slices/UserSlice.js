import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    demandes: [],
}

export const UserSlice = createSlice({
    name: 'adminUser',
    initialState,
    reducers: {
        getDemandes: (state, action) => {

            state.demandes = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { getDemandes } = UserSlice.actions

export default UserSlice.reducer