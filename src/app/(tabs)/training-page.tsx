import { DismissKeyboardView } from '@/src/components/ui/DismissKeyboardView';
import { StyleSheet, Text, View } from 'react-native';

export default function TrainingPage() {
  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Text style={styles.title}>Training Schedule</Text>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
