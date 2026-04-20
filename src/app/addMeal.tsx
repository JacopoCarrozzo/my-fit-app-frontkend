import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppDispatch } from '@/src/hooks/reduxHooks';
import { addMeal } from '@/src/features/nutrition/nutritionSlice';
import { Meal, MealCategory } from '@/src/types/nutrition';
import { BackButton } from '@/src/components/ui/BackButton';

const MOCK_FOODS: Omit<Meal, 'id' | 'category'>[] = [
  { name: 'Pasta al pomodoro', calories: 350, macros: { proteins: 12, carbs: 65, fats: 6 } },
  { name: 'Pasta al pesto', calories: 420, macros: { proteins: 14, carbs: 62, fats: 14 } },
  { name: 'Riso con pollo', calories: 380, macros: { proteins: 32, carbs: 48, fats: 6 } },
  { name: 'Latte e avena', calories: 310, macros: { proteins: 10, carbs: 52, fats: 7 } },
  { name: 'Uova strapazzate', calories: 220, macros: { proteins: 18, carbs: 2, fats: 15 } },
  { name: 'Insalata di tonno', calories: 250, macros: { proteins: 28, carbs: 8, fats: 10 } },
  { name: 'Yogurt greco', calories: 130, macros: { proteins: 12, carbs: 8, fats: 4 } },
  { name: 'Petto di pollo', calories: 165, macros: { proteins: 31, carbs: 0, fats: 4 } },
];

export default function AddMealScreen() {
  const dispatch = useAppDispatch();
  const { category } = useLocalSearchParams<{ category: MealCategory }>();
  const [search, setSearch] = useState('');

  const filteredFoods = MOCK_FOODS.filter((food) => food.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddMeal = (food: Omit<Meal, 'id' | 'category'>) => {
    dispatch(
      addMeal({
        id: Date.now().toString(),
        category,
        ...food,
      }),
    );
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <Text style={styles.title}>Add Meal</Text>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search for a food..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.foodCard} onPress={() => handleAddMeal(item)}>
              <View>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodMacros}>
                  P: {item.macros.proteins}g · C: {item.macros.carbs}g · F: {item.macros.fats}g
                </Text>
              </View>
              <Text style={styles.foodCalories}>{item.calories} kcal</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 50,
    marginTop: 20,
  },
  searchBar: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 15,
    marginBottom: 16,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  foodMacros: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  foodCalories: {
    fontSize: 15,
    fontWeight: '600',
    color: '#aaa',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#333',
  },
});
