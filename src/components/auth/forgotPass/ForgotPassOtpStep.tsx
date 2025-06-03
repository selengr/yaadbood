import { Stack, Typography } from '@mui/material';

import Button from '@/components/atoms/Button/Button';
import { OtpInput } from '@/components/atoms/OtpInput';
import { AUTH_MESSAGES } from '@/constants';
import { useForgotPassOtpStep } from '@/hooks/auth/useForgetPassOtpStep';
import { IAuthStepProps } from '@/types/auth';

import { TimerDisplay } from './TimerDisplay';

const ForgotPassOtpStep = ({ userData, onSubmit }: IAuthStepProps) => {
  const { otp, errors, handleOtpChange, time, minutes, seconds, handleResendCode } = useForgotPassOtpStep(
    userData,
    onSubmit
  );

  return (
    <Stack alignItems='center' gap={3} mb={2} component='section' aria-labelledby='otp-verification-title'>
      <Typography width='80%' textAlign='center' id='otp-verification-title' variant='body1'>
        {AUTH_MESSAGES.OTP.ENTER_CODE} {userData?.email}
      </Typography>
      <OtpInput
        value={otp}
        onChange={handleOtpChange}
        errorMessage={errors.otp?.message}
        aria-label='Enter 6-digit verification code'
        aria-required='true'
      />
      <TimerDisplay errors={errors} minutes={minutes} seconds={seconds} />
      <Stack alignItems='center' justifyContent='center' height={60}>
        {time === 0 && (
          <Button onClick={handleResendCode} variant='text' aria-label='Resend verification code'>
            {AUTH_MESSAGES.OTP.RESEND}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ForgotPassOtpStep;
