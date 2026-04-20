import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { Strings } from '@/src/constants/Strings';

interface Props {
  onPress: () => void;
}

export const BackButton = ({ onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Ionicons name="chevron-back" size={24} color={Colors.light.blue} />
    <Text style={styles.text}>{Strings.onboarding.back}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.lightBlue,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.light.black,
    alignSelf: 'flex-start',
    marginTop: 20,
  },

  text: {
    color: Colors.light.blue,
    fontSize: 16,
    fontWeight: '500',
  },
});
