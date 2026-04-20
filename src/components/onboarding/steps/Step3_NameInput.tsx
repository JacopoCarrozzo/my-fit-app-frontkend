import React, { useState } from 'react';
import { StepProps } from '@/src/types/onboarding';
import { BackButton } from '@/src/components/ui/BackButton';
import { PrimaryButton } from '@/src/components/onboarding/ui/PrimaryButton';
import { StepTitle } from '@/src/components/onboarding/ui/Title';
import { Strings } from '@/src/constants/Strings';
import { StepContainer } from '@/src/components/onboarding/ui/StepContainer';
import { Input } from '@/src/components/onboarding/ui/InputText';

export default function Step3_NameInput({ onNext, onBack }: StepProps) {
  const [selection, setSelection] = useState('');

  return (
    <StepContainer>
      <BackButton onPress={onBack} />
      <StepTitle children={Strings.onboarding.name} />
      <Input value={selection} placeholder={Strings.onboarding.name2} onChangeText={setSelection} />
      <PrimaryButton text={Strings.onboarding.next} disabled={!selection} onPress={() => onNext({ name: selection! })} />
    </StepContainer>
  );
}
