import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserProfile, UserStats } from '@/src/types/user'
import { RootState } from '@/src/store'

interface UserState {
  stats: UserStats | null
  profile: UserProfile | null
  isOnboarded: boolean
}

const initialState: UserState = {
  stats: null,
  profile: null,
  isOnboarded: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<{ stats: UserStats; profile: UserProfile }>) => {
      state.stats = action.payload.stats
      state.profile = action.payload.profile
      state.isOnboarded = true
    },
    updateName: (state, action: PayloadAction<string>) => {
        if (state.stats) state.stats.name = action.payload
      },
    clearUser: (state) => {
      state.stats = null
      state.profile = null
      state.isOnboarded = false
    },
  },
})

export const { setUserProfile, clearUser, updateName } = userSlice.actions
export default userSlice.reducer

export const selectUserStats = (state: RootState) => state.user.stats
export const selectUserProfile = (state: RootState) => state.user.profile
export const selectIsOnboarded = (state: RootState) => state.user.isOnboarded
export const selectUserName = (state: RootState) => state.user.stats?.name ?? null

