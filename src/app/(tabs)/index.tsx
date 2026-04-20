import { StyleSheet, Text, View } from 'react-native';
import { useUserProfile } from '@/src/context/UserContext';
import { DismissKeyboardView } from '@/src/components/ui/DismissKeyboardView';
import { StepTitle } from '@/src/components/onboarding/ui/Title';
import { Strings } from '@/src/constants/Strings';
import { CaloriesCard } from '@/src/components/diary/CaloriesCard';
import { useAppSelector } from '@/src/hooks/reduxHooks';

export default function TabOneScreen() {
  const name = useAppSelector((state) => state.user.stats?.name);
  const { profile } = useUserProfile();
  if (!profile) {
    return (
      <View>
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <DismissKeyboardView>
      <StepTitle style={styles.welcomeText}>{Strings.tabs.welcomeText + ' ' + name + '!'}</StepTitle>
      <CaloriesCard />
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'left',
    marginTop: 0,
  },
});
