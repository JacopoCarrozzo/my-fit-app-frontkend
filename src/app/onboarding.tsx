import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserStats } from '@/src/types/user';
import { useUserProfile } from '@/src/context/UserContext';
import Step0_Welcome from '@/src/components/onboarding/steps/Step0_Welcome';
import Step1_GoalSelection from '@/src/components/onboarding/steps/Step1_GoalSelection';
import Step2_GenderSelection from '@/src/components/onboarding/steps/Step2_GenderSelection';
import Step3_NameInput from '@/src/components/onboarding/steps/Step3_NameInput';
import Step4_HeightInput from '@/src/components/onboarding/steps/Step4_HeightInput';
import Step5_WeightInput from '@/src/components/onboarding/steps/Step5_WeightInput';
import Step6_AgeInput from '@/src/components/onboarding/steps/Step6_AgeInput';
import Step7_ActivitySelection from '@/src/components/onboarding/steps/Step7_ActivitySelection';
import { finalizeNutritionProfile } from '@/src/utils/nutrition/index';
import Colors from '@/src/constants/Colors';
import { ProgressBar } from '../components/onboarding/ui/ProgressBar';
import { useAppDispatch } from '@/src/hooks/reduxHooks';
import { setUserProfile } from '@/src/features/user/userSlice';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserStats>>({});
  const { setProfile } = useUserProfile();
  const TOTAL_STEPS = 7;

  const dispatch = useAppDispatch();

  const handleNext = async (newData?: Partial<UserStats>) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);

    if (step === TOTAL_STEPS) {
      const finalProfile = finalizeNutritionProfile(updatedData as UserStats);

      dispatch(
        setUserProfile({
          stats: updatedData as UserStats,
          profile: finalProfile,
        }),
      );

      await setProfile(finalProfile); // Context — per ora lo teniamo per la navigazione
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    const props = { onNext: handleNext, onBack: handleBack };

    switch (step) {
      case 0:
        return <Step0_Welcome {...props} />; //... fast way to pass the props
      case 1:
        return <Step1_GoalSelection {...props} />;
      case 2:
        return <Step2_GenderSelection {...props} />;
      case 3:
        return <Step3_NameInput {...props} />;
      case 4:
        return <Step4_HeightInput {...props} />;
      case 5:
        return <Step5_WeightInput {...props} />;
      case 6:
        return <Step6_AgeInput {...props} />;
      case 7:
        return <Step7_ActivitySelection {...props} />;
      default:
        return <Step0_Welcome {...props} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {step > 0 && <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />}
      <View style={styles.content}>{renderStep()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background },
  content: { flex: 1, backgroundColor: Colors.light.background },
});
