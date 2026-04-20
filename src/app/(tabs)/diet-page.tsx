import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { MealCategory } from '@/src/types/nutrition';
import { MealCategoryCard } from '@/src/components/diet/MealsCard';
import { router } from 'expo-router';

import { selectTodayCalories, selectTodayMacros } from '@/src/features/nutrition/nutritionSlice';
import { useAppSelector } from '@/src/hooks/reduxHooks';

export default function DietPage() {
  const CATEGORIES: MealCategory[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'];

  const totalCalories = useAppSelector(selectTodayCalories);
  const totalMacros = useAppSelector(selectTodayMacros);

  console.log('Calories di oggi: ', totalCalories);
  console.log('Macro di oggi: ', totalMacros);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Meals</Text>
        </View>
        <View>
          {CATEGORIES.map((category) => (
            <MealCategoryCard key={category} category={category} onPress={() => router.push(`/addMeal?category=${category}`)} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightblue',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
