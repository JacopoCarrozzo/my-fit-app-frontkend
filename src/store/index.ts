import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/src/features/user/userSlice'
import nutritionReducer from '@/src/features/nutrition/nutritionSlice'

export const store = configureStore({
    reducer: {
      user: userReducer,
      nutrition: nutritionReducer,
      // workout: workoutReducer,
      // ui: uiReducer,
    },
  })

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch