// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UserData = {
  name: string
  email: string
  userID: string
  isAdmin: boolean
}

export type UserState = {
  data: UserData | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
  isAuthenticated: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.data = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    setName(state, action: PayloadAction<{newName: string}>) {
      if (state.data) {
        state.data.name = action.payload.newName
      }
    },
    clearUser(state) {
      state.isAuthenticated = false
      state.data = null
      state.error = null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    }
  }
})

export const { setUser, clearUser, setLoading, setError, setName } = userSlice.actions
export default userSlice.reducer