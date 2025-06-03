import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AUTH_MESSAGES } from '@/constants';
import { useForgotPass } from '@/hooks/auth/useForgotPass';
import { useVerifyOtp } from '@/hooks/auth/useVerifyOtp';
import useTimer from '@/hooks/util/useTimer';
import apiService from '@/networks/core/api-service';
import { AuthSteps, UserData } from '@/types/auth';
import { handleChangeCode, resendCode } from '@/utils/auth/authUtils';
import { otpSchema } from '@/validation/validation';

interface OTPForm {
  otp: string;
}

interface OnSubmit {
  (data: UserData, step: AuthSteps, isClose?: boolean): void;
  (arg0: any, arg1: AuthSteps): void;
}

export const useForgotPassOtpStep = (userData: UserData, onSubmit: OnSubmit) => {
  const { time, seconds, minutes, resetTimer } = useTimer(120);
  const {
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<OTPForm>({
    resolver: zodResolver(otpSchema)
  });

  const forgotPassMutation = useForgotPass({
    onSuccess: () => toast.success(AUTH_MESSAGES.OTP.SENT)
  });

  const verifyMutation = useVerifyOtp({
    onSuccess: (data) => {
      const otp = getValues('otp');
      const authData = data?.data?.data;
      apiService.setAuthorizationHeader(authData?.accessToken);
      onSubmit({ ...userData, otp }, AuthSteps.forgetPassNew);
    },
    onError: (error) => {
      const otp = getValues('otp');
      if (error.message === AUTH_MESSAGES.AUTH_ERRORS.USER_ALREADY_VERIFIED) {
        onSubmit({ ...userData, otp }, AuthSteps.forgetPassNew);
      }
      setError('otp', { type: 'manual', message: error?.message || AUTH_MESSAGES.OTP.INVALID });
    }
  });

  const handleOtpChange = (code: string) => {
    handleChangeCode(code, setValue, clearErrors, verifyMutation.mutate, userData?.email);
  };

  const handleResendCode = () => {
    resendCode(resetTimer, forgotPassMutation.mutate, userData?.email, setValue, clearErrors);
  };

  return { otp: getValues('otp'), errors, handleOtpChange, time, minutes, seconds, handleResendCode };
};
