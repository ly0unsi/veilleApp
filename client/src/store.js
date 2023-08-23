import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './user/slices/AuthSlice'
import UserSlice from './admin/slices/UserSlice'

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        adminUser: UserSlice
    },
})