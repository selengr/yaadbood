import { Controller } from 'react-hook-form';

import { PasswordField } from '@/components/atoms/PasswordField';

interface PasswordInputProps {
  control: any;
  name: string;
  label: string;
  errorMessage?: string;
}

export const PasswordInput = ({ control, name, label, errorMessage }: PasswordInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <PasswordField
        required
        label={label}
        errorMessage={errorMessage}
        onChange={field.onChange}
        placeholder={label}
        autoComplete={false}
      />
    )}
  />
);
