import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import React from 'react';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
//components
import { Input } from '@/components/atoms';
//types
import { EditIntroForm } from '@/types/profile';

interface IProps {
  form: UseFormReturn<EditIntroForm>;
}

const LastNameInput = ({ form }: IProps) => {
  const renderLastNameInput = ({ field }: { field: ControllerRenderProps<EditIntroForm, 'lastName'> }) => {
    return (
      <Input
        label={EDIT_INTRO_MODAL.LAST_NAME.LABEL}
        placeholder={EDIT_INTRO_MODAL.LAST_NAME.PLACEHOLDER}
        errorMessage={form.formState.errors.lastName?.message}
        {...field}
      />
    );
  };

  return (
    <Controller control={form.control} name={EDIT_INTRO_MODAL.LAST_NAME.NAME} render={renderLastNameInput} />
  );
};

export default LastNameInput;
