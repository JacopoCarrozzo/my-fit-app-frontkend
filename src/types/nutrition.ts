export type MealCategory = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK'

export interface Macros {
    proteins: number
    carbs: number
    fats: number
  }

export interface Meal {
    id: string
    name: string
    category: MealCategory
    calories: number
    macros: Macros
  }

  export interface DailyLog {
    date: string
    meals: Meal[]
    totalCalories: number
    totalMacros: Macros
  }