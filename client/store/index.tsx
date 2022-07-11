import { configureStore } from "@reduxjs/toolkit"
import React from "react"
import { Provider } from "react-redux"
import postSlice from "./postSlice"
import userSlice from "./userSlice"
// ...

export const store = configureStore({
  reducer: {
    users: userSlice,
    posts : postSlice
  },
})





const StoreProvider = (props: any) => {


  return <Provider store={store}>{props.children}</Provider>
}

export default StoreProvider


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: { users: UsersState}
export type AppDispatch = typeof store.dispatch
