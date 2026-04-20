import { Macros } from './nutrition'

export type Goal = 'LOSE_WEIGHT' | 'GAIN_MUSCLE' | 'MAINTAIN';
export type Gender = 'MALE' | 'FEMALE';
export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;


export interface UserStats {
  goal: Goal;
  weight: number;    
  height: number;    
  gender: Gender;
  age: number;       
  activityLevel: ActivityLevel;
  name: string;
}

export interface UserProfile extends UserStats {
  dailyCalories: number;
  macros: Macros;
}

export interface UserProfileContextValue {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  isLoading: boolean;
}