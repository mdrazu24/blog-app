import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import type { RootState } from "./index"

// Define a type for the slice state
interface userData {
  user?: {
    id: number
    fullName: string
    email: string
  } | null
  isLogin?: boolean
}

// Define the initial state using that type
const initialState: userData = {
  user: null,
  isLogin: false,
}

export const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>
    ) => {
      state.user = action.payload.user
      state.isLogin = true
    },
    register: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>
    ) => {
      state.user = action.payload.user
      state.isLogin = true
    },
    logout: (state: typeof initialState) => {
      state.user = null
      state.isLogin = false
    },
    changeState: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>
    ) => {
      state.isLogin = action.payload.isLogin
     
    },
  },
})

export const { login, register, logout, changeState } = usersReducer.actions

export default usersReducer.reducer
