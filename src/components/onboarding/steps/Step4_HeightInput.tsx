import React, { useState } from 'react';
import { StepProps } from '@/src/types/onboarding';
import { BackButton } from '@/src/components/ui/BackButton';
import { PrimaryButton } from '@/src/components/onboarding/ui/PrimaryButton';
import { StepTitle } from '@/src/components/onboarding/ui/Title';
import { Strings } from '@/src/constants/Strings';
import { StepContainer } from '@/src/components/onboarding/ui/StepContainer';
import { Input } from '@/src/components/onboarding/ui/InputText';

export default function Step4_HeightInput({ onNext, onBack }: StepProps) {
  const [selection, setSelection] = useState('');

  return (
    <StepContainer>
      <BackButton onPress={onBack} />

      <StepTitle children={Strings.onboarding.tall} />

      <Input
        value={selection}
        unit="cm"
        placeholder={Strings.onboarding.tall2}
        onChangeText={(text) => setSelection(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />

      <PrimaryButton text={Strings.onboarding.next} disabled={!selection} onPress={() => onNext({ height: parseInt(selection, 10) })} />
    </StepContainer>
  );
}
