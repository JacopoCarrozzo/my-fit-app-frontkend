import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MealCategory } from '@/src/types/nutrition';
import { useAppSelector } from '@/src/hooks/reduxHooks';
import { selectTodayMeals } from '@/src/features/nutrition/nutritionSlice';

interface Props {
  category: MealCategory;
  onPress: () => void;
}

const CATEGORY_CONFIG: Record<MealCategory, { label: string; icon: string }> = {
  BREAKFAST: { label: 'Colazione', icon: '🌅' },
  LUNCH: { label: 'Pranzo', icon: '🍝' },
  DINNER: { label: 'Cena', icon: '🥗' },
  SNACK: { label: 'Spuntini', icon: '🍎' },
};

export const MealCategoryCard = ({ category, onPress }: Props) => {
  const meals = useAppSelector(selectTodayMeals);

  const categoryCalories = meals.filter((m) => m.category === category).reduce((sum, m) => sum + m.calories, 0);

  const { label, icon } = CATEGORY_CONFIG[category];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View>
          <Text style={styles.label}>{label} →</Text>
          {categoryCalories > 0 && <Text style={styles.calories}>{categoryCalories} kcal</Text>}
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MealCategoryCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  calories: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 22,
    color: '#fff',
    lineHeight: 26,
  },
});
