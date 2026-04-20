import { DismissKeyboardView } from '@/src/components/ui/DismissKeyboardView';
import { useAppDispatch, useAppSelector } from '@/src/hooks/reduxHooks';
import { clearUser, updateName } from '@/src/features/user/userSlice';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserProfile } from '@/src/context/UserContext';

export default function ProfilePage() {
  const { setProfile } = useUserProfile();
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.stats?.name);

  const [inputValue, setInputValue] = useState('');

  const handleUpdateName = () => {
    if (inputValue.trim() === '') return;
    dispatch(updateName(inputValue.trim()));
    setInputValue('');
  };

  const handleReset = async () => {
    dispatch(clearUser());
    await AsyncStorage.removeItem('@user_profile');
    setProfile(null);
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <Text style={styles.label}>Nome attuale:</Text>
        <Text style={styles.value}>{name ?? 'Nessun nome impostato'}</Text>

        <TextInput style={styles.input} placeholder="Nuovo nome..." value={inputValue} onChangeText={setInputValue} />

        <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
          <Text style={styles.buttonText}>Aggiorna nome</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReset}>
          <Text>Reset dati</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
