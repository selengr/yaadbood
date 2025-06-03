import { DotPulse } from '@/components/atoms';
import { EDIT_INTRO_MODAL } from '@/constants';
import { EditIntroForm } from '@/types/profile';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SaveButtonStyled } from './SaveButton.style';

interface IProps {
  isPending: boolean;
  onSaveIsDisabled: boolean;
  onSubmit: (data: any) => void;
  form: UseFormReturn<EditIntroForm>;
}

const SaveButton = ({ isPending, onSaveIsDisabled, onSubmit, form }: IProps) => {
  return (
    <SaveButtonStyled type='submit' onClick={form.handleSubmit(onSubmit)} disabled={onSaveIsDisabled}>
      {isPending ? <DotPulse /> : EDIT_INTRO_MODAL.SAVE_BUTTON.LABEL}
    </SaveButtonStyled>
  );
};

export default SaveButton;
