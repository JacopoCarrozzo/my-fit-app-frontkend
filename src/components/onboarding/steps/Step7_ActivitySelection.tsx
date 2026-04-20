import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StepProps } from '@/src/types/onboarding';
import { BackButton } from '@/src/components/ui/BackButton';
import { PrimaryButton } from '@/src/components/onboarding/ui/PrimaryButton';
import { StepTitle } from '@/src/components/onboarding/ui/Title';
import { Strings } from '@/src/constants/Strings';
import { StepContainer } from '@/src/components/onboarding/ui/StepContainer';
import { Card } from '@/src/components/onboarding/ui/Card';
import { ActivityLevel } from '@/src/types/user';

export default function Step7_ActivitySelection({ onNext, onBack }: StepProps) {
  const [selection, setSelection] = useState<ActivityLevel | null>(null);

  const levels: { label: string; desc: string; val: ActivityLevel }[] = [
    { label: 'Sedentary', desc: 'Office job, little to no exercise', val: 1.2 },
    { label: 'Lightly Active', desc: '1-2 workouts per week', val: 1.375 },
    { label: 'Moderately Active', desc: '3-5 workouts per week', val: 1.55 },
    { label: 'Very Active', desc: 'Daily intense exercise', val: 1.725 },
    { label: 'Athlete', desc: 'Physical job & intense training', val: 1.9 },
  ];

  return (
    <StepContainer>
      <BackButton onPress={onBack} />
      <StepTitle style={styles.title} children={Strings.onboarding.activity} />

      {levels.map((l) => (
        <Card
          style={styles.card}
          key={l.val}
          desc={l.desc}
          label={l.label}
          isSelected={selection === l.val}
          onSelect={() => setSelection(l.val)}
        />
      ))}

      <PrimaryButton text={Strings.onboarding.final} disabled={!selection} onPress={() => onNext({ activityLevel: selection! })} />
    </StepContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    marginTop: 30,
    marginBottom: 10,
  },

  card: {
    padding: 20,
  },
});
