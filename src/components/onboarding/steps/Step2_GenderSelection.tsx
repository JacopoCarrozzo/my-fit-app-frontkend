import React, { useState } from 'react';
import { StepProps } from '@/src/types/onboarding';
import { BackButton } from '@/src/components/ui/BackButton';
import { PrimaryButton } from '@/src/components/onboarding/ui/PrimaryButton';
import { StepTitle } from '@/src/components/onboarding/ui/Title';
import { Strings } from '@/src/constants/Strings';
import { StepContainer } from '@/src/components/onboarding/ui/StepContainer';
import { Card } from '@/src/components/onboarding/ui/Card';
import { Gender } from '@/src/types/user';

export default function Step2_GenderSelection({ onNext, onBack }: StepProps) {
  const [selection, setSelection] = useState<Gender | null>(null);

  const genders: { label: string; value: Gender }[] = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
  ];

  return (
    <StepContainer>
      <BackButton onPress={onBack} />
      <StepTitle children={Strings.onboarding.gender} />

      {genders.map((g) => (
        <Card key={g.value} label={g.label} isSelected={selection === g.value} onSelect={() => setSelection(g.value)} />
      ))}

      <PrimaryButton text={Strings.onboarding.next} disabled={!selection} onPress={() => onNext({ gender: selection! })} />
    </StepContainer>
  );
}
