import { Stack } from '@mui/material';
import { RefObject } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller } from 'react-hook-form';

import Input from '@/components/atoms/Input';
import { PasswordField } from '@/components/atoms/PasswordField';
import { ReCaptcha } from '@/components/atoms/ReCaptcha';
import { AUTH_MESSAGES } from '@/constants';

type LoginFormErrors = {
  email?: { message?: string };
  password?: { message?: string };
};

interface LoginFormProps {
  control: any;
  errors: LoginFormErrors;
  recaptchaRef: RefObject<ReCAPTCHA | null>;
  handleRecaptchaChange: (token: string | null) => void;
}

export const LoginForm = ({ control, errors, recaptchaRef, handleRecaptchaChange }: LoginFormProps) => (
  <>
    <Controller
      control={control}
      name='email'
      render={({ field }) => (
        <Input
          label={AUTH_MESSAGES.GENERAL.EMAIL}
          required
          placeholder={AUTH_MESSAGES.GENERAL.EMAIL_PLACEHOLDER}
          errorMessage={errors.email?.message}
          error={!!errors.email}
          aria-required='true'
          aria-invalid={!!errors.email}
          autoComplete='email'
          {...field}
        />
      )}
    />
    {/* <Controller
      control={control}
      name='password'
      render={({ field }) => (
        <PasswordField
          label={AUTH_MESSAGES.GENERAL.PASSWORD}
          required
          errorMessage={errors.password?.message}
          error={!!errors.password}
          placeholder={AUTH_MESSAGES.GENERAL.PASSWORD_PLACEHOLDER}
          aria-required='true'
          aria-invalid={!!errors.password}
          {...field}
        />
      )}
    />{' '} */}
    <Stack alignItems='center' width='100%'>
      <ReCaptcha ref={recaptchaRef} handleRecaptchaChange={handleRecaptchaChange} />
    </Stack>
  </>
);
