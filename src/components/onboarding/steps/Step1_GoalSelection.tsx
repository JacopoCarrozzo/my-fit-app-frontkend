import React, { useState } from 'react';
import { Goal } from '@/src/types/user';
import { StepProps } from '@/src/types/onboarding';
import { BackButton } from '@/src/components/ui/BackButton';
import { PrimaryButton } from '@/src/components/onboarding/ui/PrimaryButton';
import { StepTitle } from '@/src/components/onboarding/ui/Title';
import { Strings } from '@/src/constants/Strings';
import { StepContainer } from '@/src/components/onboarding/ui/StepContainer';
import { Card } from '@/src/components/onboarding/ui/Card';

export default function Step1_GoalSelection({ onNext, onBack }: StepProps) {
  const [selection, setSelection] = useState<Goal | null>(null);

  const goals: { label: string; value: Goal }[] = [
    { label: 'Lose Weight', value: 'LOSE_WEIGHT' },
    { label: 'Eat Healthy', value: 'MAINTAIN' },
    { label: 'Gain Muscle', value: 'GAIN_MUSCLE' },
  ];

  return (
    <StepContainer>
      <BackButton onPress={onBack} />
      <StepTitle children={Strings.onboarding.goal} />

      {goals.map((g) => (
        <Card key={g.value} label={g.label} isSelected={selection === g.value} onSelect={() => setSelection(g.value)} />
      ))}

      <PrimaryButton text={Strings.onboarding.next} disabled={!selection} onPress={() => onNext({ goal: selection! })} />
    </StepContainer>
  );
}
