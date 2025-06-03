'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Resolver, useForm } from 'react-hook-form';

import Icon from '@/components/atoms/Icon';
import { useLoginMutation, useReCaptcha } from '@/hooks/auth';
import { loginSchema } from '@/lib/validation/auth';
import { AuthSteps, IAuthStepProps } from '@/types/auth';
import { getErrorMessage } from '@/utils/auth/authUtils';

import { ActionButtons } from './ActionButtons';
import { LoginForm } from './LoginForm';
import { OAuthLogin } from './OAuthLogin';
import { loginWithEmail } from '@/networks/auth';
import useMutateApi from '@/hooks/core/useAppMutation';

type LoginForm = {
  email: string;
  password: string;

};

const ErrorMessage = ({ error }: { error: string | null }) => {
  if (!error) return null;
  return (
    <Typography variant='body2' fontWeight={500} color='red.500' role='alert' aria-live='assertive'>
      {getErrorMessage(error)}
    </Typography>
  );
};

const LoginStep = ({
  onSubmit,
  forceLogin,

}: Partial<Omit<IAuthStepProps, 'userData'>> & { forceLogin: boolean }) => {
  const { captchaToken, setCaptchaToken, recaptchaRef, resetReCaptcha } = useReCaptcha();

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema) as Resolver<LoginForm>,
    mode: 'onChange'
  });

  const searchParams = useSearchParams();
  const error = searchParams?.get('error-text') || 'default';
  const emailInput = watch('email');
  const passInput = watch('password');

  const { mutate, isPending } = useLoginMutation((res) => {
    onSubmit?.({ email: emailInput, password: passInput }, AuthSteps.otp);
  })

  const handleConfirm = () => {
    mutate(emailInput); 
  };
  return (
    <Stack alignItems='center' gap={4} component='main' role='main' aria-labelledby='login-section-title'>
      <ErrorMessage error={searchParams?.get('callback-error') ? error : null} />
      {forceLogin && <Icon name='logo' view='0 0 110 29' w={96} h={24} />}
      <Stack alignItems='center' width='100%' gap={1.5}>
        <OAuthLogin />
        <Stack component='form' width='100%' gap={3} onSubmit={handleConfirm} noValidate aria-label='Login form'>
          <LoginForm
            control={control}
            errors={errors}
            recaptchaRef={recaptchaRef}
            handleRecaptchaChange={(token) => setCaptchaToken(token)}
          />
          <ActionButtons
            {...{ handleConfirm, emailInput, isValid, errors, captchaToken ,isPending}}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginStep;
