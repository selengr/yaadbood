import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ClockIcon from '@/components/atoms/Icon/icons/ClockIcon';
import { OtpInput } from '@/components/atoms/OtpInput';
import { useResendCode } from '@/hooks/auth/useResendCode';
import { useVerifyOtp } from '@/hooks/auth/useVerifyOtp';
import useTimer from '@/hooks/util/useTimer';
import { otpSchema } from '@/lib/validation/auth';
import apiService from '@/networks/core/api-service';
import { AuthSteps, IAuthStepProps } from '@/types/auth';
import { handleChangeCode, resendCode } from '@/utils/auth/otpUtils'; // Import utility functions
import { AUTH_MESSAGES } from '@/constants/auth';
import { useLoginMutation } from '@/hooks/auth';
import { useSession } from 'next-auth/react';
import { storePartialStep } from '@/utils/auth/authUtils';
import { ROUTES } from '@/constants';

interface OTPForm {
  otp: string;
}

const RegisterOtpStep = ({ userData, onSubmit }: IAuthStepProps) => {
  const theme = useTheme();
  const { time, seconds, minutes, resetTimer } = useTimer(120);
  const {
    getValues,
    setValue,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<OTPForm>({
    resolver: yupResolver(otpSchema) as Resolver<OTPForm>
  });

  const { mutate, isPending } = useLoginMutation((res) => {
    resetTimer()
  })

  interface UserSession {
    firstName?: string | null;
    lastName?: string | null;
    gender?: string | null;
    country?: string | null;
    city?: string | null;
  }

  const { data: session } = useSession()

  const handleConfirm = () => {
    mutate(userData?.email);
  };

  const onStepUpdate = () => {
    if (session?.user) {
      const { firstName, lastName, gender, city, country } = session.user as UserSession;
      const iscomplete = firstName || lastName || gender || city || country;

      if (iscomplete) {
        toast.success(AUTH_MESSAGES.AUTH.WELCOME_TRADIDO);
        setTimeout(() => {
          window.location.href = ROUTES.PROFILE.INDEX;
        }, 1500);
      } else {
        toast.success(AUTH_MESSAGES.REGISTRATION.COMPLETE)
      }
    }

    // onSubmit({ ...userData }, detectedStep, false);
  }
  return (
    <Box
      sx={() => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        marginBottom: 2
      })}>
      <Typography
        width='80%'
        textAlign='center'
        sx={(theme) => ({
          color: theme.palette.gray['600'],
          fontWeight: 400,
          lineHeight: '24px'
        })}>
        {AUTH_MESSAGES.OTP.ENTER_CODE} {userData?.email}
      </Typography>
      <OtpInput
        value={getValues('otp')}
        onChange={(code: string) => {
          handleChangeCode(code, setValue, clearErrors, userData?.email, setError, onStepUpdate); // Use utility function
        }}
        errorMessage={errors.otp?.message}
      />

      <Stack
        alignItems='center'
        flexDirection={'row'}
        justifyContent={'center'}
        gap='9px'
        height={(theme) => theme.spacing(4)}>
        {!errors.otp?.message ? (
          <>
            <ClockIcon />
            <Typography
              sx={(theme) => ({
                color: theme.palette.gray['600'],
                fontWeight: 500,
                fontSize: '12px'
              })}>
              {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
            </Typography>
          </>
        ) : (
          <Typography
            variant='caption'
            sx={(theme) => ({
              color: theme.palette.red['500'],
              fontSize: '12px'
            })}>
            {errors.otp?.message}
          </Typography>
        )}
      </Stack>

      <Stack alignItems={'center'} justifyContent={'center'} height={(theme) => theme.spacing(4)}>
        {time === 0 && (
          <Typography
            onClick={handleConfirm}
            sx={(theme) => ({
              cursor: 'pointer',
              color: theme.palette.primary['main'],
              fontWeight: 500,
              fontSize: '14px'
            })}>
            {AUTH_MESSAGES.OTP.RESEND}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default RegisterOtpStep;
