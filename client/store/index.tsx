import { configureStore } from "@reduxjs/toolkit"
import React, {  useEffect } from "react"
import { Provider } from "react-redux"
import userSlice, { login } from "./userSlice"
// ...

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
})





const StoreProvider = (props: any) => {


  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (userData) {
      const user = JSON.parse(userData) as {
        id: number
        fullName: string
        email: string
      }
      store.dispatch(login({ user: user }))
    }

  }, [])

  return <Provider store={store}>{props.children}</Provider>
}

export default StoreProvider


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: { users: UsersState}
export type AppDispatch = typeof store.dispatch
