import { createSlice, PayloadAction, createSelector  } from '@reduxjs/toolkit'
import { DailyLog, Meal } from '@/src/types/nutrition'
import { RootState } from '@/src/store'

interface NutritionState {
    dailyLogs: DailyLog[]
    todayLog: DailyLog | null
}

const initialState: NutritionState = {
    dailyLogs: [],
    todayLog: null,
  } 

const nutritionSlice = createSlice({
    name: 'nutrition',
    initialState,
    reducers: {
        addMeal: (state, action: PayloadAction<Meal>) => {
            if (!state.todayLog) {
                state.todayLog = {
                    date: new Date().toISOString().split('T')[0],
                    meals: [],
                    totalCalories: 0,
                    totalMacros: { proteins: 0, carbs: 0, fats: 0 },
                }
            }
            state.todayLog.meals.push(action.payload)
            state.todayLog.totalCalories += action.payload.calories
            state.todayLog.totalMacros.proteins += action.payload.macros.proteins
            state.todayLog.totalMacros.carbs += action.payload.macros.carbs
            state.todayLog.totalMacros.fats += action.payload.macros.fats
        
        },
        removeMeal: (state, action: PayloadAction<string>) => {
            if (!state.todayLog) return
            
            const meal = state.todayLog.meals.find(m => m.id === action.payload)
            if (!meal) return
        
            state.todayLog.meals = state.todayLog.meals.filter(m => m.id !== action.payload)
            state.todayLog.totalCalories -= meal.calories
            state.todayLog.totalMacros.proteins -= meal.macros.proteins
            state.todayLog.totalMacros.carbs -= meal.macros.carbs
            state.todayLog.totalMacros.fats -= meal.macros.fats
        },
               
    },
  })

export const { addMeal, removeMeal } = nutritionSlice.actions
export default nutritionSlice.reducer

export const selectTodayLog = (state: RootState) => state.nutrition.todayLog
export const selectTodayMeals = createSelector(
    selectTodayLog,
    (todayLog) => todayLog?.meals ?? []
  )
  export const selectTodayCalories = createSelector(
    selectTodayLog,
    (todayLog) => todayLog?.totalCalories ?? 0
  )
  
  export const selectTodayMacros = createSelector(
    selectTodayLog,
    (todayLog) => todayLog?.totalMacros ?? { proteins: 0, carbs: 0, fats: 0 }
  )
export const selectDailyLogs = (state: RootState) => state.nutrition.dailyLogs
