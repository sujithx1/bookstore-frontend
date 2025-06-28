import { configureStore } from '@reduxjs/toolkit'
import userreducer from "../reducers/user/userslice"
export const store = configureStore({
  reducer: {
    user:userreducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
