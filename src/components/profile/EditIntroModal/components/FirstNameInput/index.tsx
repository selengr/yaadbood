import React from 'react';
import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
//components
import { Input } from '@/components/atoms';
//types
import { EditIntroForm } from '@/types/profile';

interface IProps {
  form: UseFormReturn<EditIntroForm>;
}

const FirstNameInput = ({ form }: IProps) => {
  const renderFirstNameInput = ({ field }: { field: ControllerRenderProps<EditIntroForm, 'firstName'> }) => {
    return (
      <Input
        label={EDIT_INTRO_MODAL.FIRST_NAME.LABEL}
        placeholder={EDIT_INTRO_MODAL.FIRST_NAME.PLACEHOLDER}
        errorMessage={form.formState.errors.firstName?.message}
        {...field}
      />
    );
  };

  return (
    <Controller
      control={form.control}
      name={EDIT_INTRO_MODAL.FIRST_NAME.NAME}
      render={renderFirstNameInput}
    />
  );
};

export default FirstNameInput;
