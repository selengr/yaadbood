import React from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
//constants
import { EDIT_ABOUT } from '@/constants';
//styles
import { CustomTextFieldStyle, EditAboutTitle } from './customTextField.style';

interface IProps {
  form: UseFormReturn<FieldValues>;
}

const CustomTextField: React.FC<IProps> = ({ form }) => {
  const error = form.formState.errors.description;
  return (
    <>
      <EditAboutTitle>{EDIT_ABOUT.DESCRIPTION}</EditAboutTitle>
      <Controller
        name='description'
        control={form.control}
        render={({ field }) => (
          <CustomTextFieldStyle
            placeholder={EDIT_ABOUT.PLACEHOLDER}
            multiline
            rows={6}
            error={!!error}
            errorMessage={error?.message?.toString()}
            {...field}
          />
        )}
      />
    </>
  );
};

export default CustomTextField;
