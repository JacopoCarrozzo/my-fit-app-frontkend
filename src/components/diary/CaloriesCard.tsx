import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Colors from '@/src/constants/Colors';
import { useUserProfile } from '@/src/context/UserContext';
import { Strings } from '@/src/constants/Strings';

export const CaloriesCard = () => {
  const { profile } = useUserProfile();
  if (!profile) return null;

  return (
    <View>
      <View style={styles.caloriesCard}>
        <Text style={styles.cardLabel}>{Strings.tabs.goal}</Text>
        <Text style={styles.caloriesValue}>{profile.dailyCalories + ' kcal'}</Text>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.macroValue}>{profile.macros.proteins + 'g'}</Text>
        </View>

        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.macroValue}>{profile.macros.carbs + 'g'}</Text>
        </View>

        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Fats</Text>
          <Text style={styles.macroValue}>{profile.macros.fats + 'g'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caloriesCard: {
    backgroundColor: Colors.light.lightBlue,
    borderColor: Colors.light.blue,
    borderWidth: 1.5,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: Colors.light.blue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 20,
    marginTop: 0,
  },
  cardLabel: {
    fontSize: 17,
    color: Colors.light.heavyBlue,
    fontWeight: '800',
  },
  caloriesValue: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.light.heavyBlue,
    marginVertical: 8,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  macroBox: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: Colors.light.lightBlue,
    borderColor: Colors.light.blue,
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 4,
    color: Colors.light.heavyBlue,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.light.heavyBlue,
  },
});
