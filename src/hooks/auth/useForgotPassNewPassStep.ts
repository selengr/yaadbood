import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AUTH_MESSAGES } from '@/constants';
import { ROUTES } from '@/constants';
import { useResetPass } from '@/hooks/auth/useResetPass';
import { AuthSteps, IAuthStepProps } from '@/types/auth';
import { removePartialRegistration, removePartialStep } from '@/utils/auth/authUtils';
import { debounceSubmit } from '@/utils/formUtils';
import { ForgotPassFormData, forgotPassNewPassStepSchema } from '@/validation/validation';

export const useForgotPassNewPassStep = (
  userData: IAuthStepProps['userData'],
  onSubmit: IAuthStepProps['onSubmit']
) => {
  const router = useRouter();
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const {
    formState: { errors, isValid },
    control,
    handleSubmit
  } = useForm<ForgotPassFormData>({
    resolver: zodResolver(forgotPassNewPassStepSchema) as Resolver<ForgotPassFormData>,
    mode: 'onChange'
  });

  const resetPassMutation = useResetPass({
    onSuccess: () => {
      onSubmit(userData, AuthSteps.login);
      toast.success(AUTH_MESSAGES.SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS);
      // removePartialRegistration();
      // removePartialStep();
      router.replace(ROUTES.AUTH.LOGIN_DEFAULT_TRUE);
    },
    onError: (error) => toast.error(error?.message)
  });

  const handleFormSubmit = (data: ForgotPassFormData) => {
    resetPassMutation.mutate({
      email: userData?.email,
      newPassword: data.newPass,
      otp: userData?.otp || ''
    });
  };

  const debouncedFormSubmit = debounceSubmit(handleFormSubmit, 30);

  const handleClose = () => {
    setShowDiscardModal(false);
    // removePartialRegistration();
    // removePartialStep();
  };

  return {
    showDiscardModal,
    control,
    errors,
    isValid,
    handleSubmit,
    debouncedFormSubmit,
    resetPassMutation,
    handleClose
  };
};
