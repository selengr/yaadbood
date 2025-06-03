'use client';
import { Stack } from '@mui/material';

import Button from '@/components/atoms/Button/Button';
import Confirmation from '@/components/atoms/Confirmation';
import DotSpinner from '@/components/atoms/DotSpinner';
import { PasswordInput } from '@/components/molecules/PasswordInput';
import { AUTH_MESSAGES, GENERAL_MESSAGES } from '@/constants';
import { useForgotPassNewPassStep } from '@/hooks/auth/useForgotPassNewPassStep';
import { AuthSteps, IAuthStepProps } from '@/types/auth';

const ForgotPassNewPassStep = ({ userData, onSubmit }: IAuthStepProps) => {
  const {
    showDiscardModal,
    control,
    errors,
    isValid,
    handleSubmit,
    debouncedFormSubmit,
    resetPassMutation,
    handleClose
  } = useForgotPassNewPassStep(userData, onSubmit);

  return (
    <>
      <Confirmation
        open={showDiscardModal}
        title={AUTH_MESSAGES.PASSWORD.DISCARD_TITLE}
        description={AUTH_MESSAGES.PASSWORD.DISCARD_DESCRIPTION}
        cancelText={GENERAL_MESSAGES.ACTIONS.GO_BACK}
        submitText={GENERAL_MESSAGES.ACTIONS.DISCARD}
        handleClose={handleClose}
        handleSubmit={() => onSubmit(userData, AuthSteps.login, true)}
      />
      <Stack
        component='form'
        spacing={3}
        onSubmit={handleSubmit(debouncedFormSubmit)}
        aria-labelledby='reset-password-title'>
        <PasswordInput
          control={control}
          name='newPass'
          label={AUTH_MESSAGES.PASSWORD.NEW}
          errorMessage={errors.newPass?.message}
          aria-required='true'
        />
        <PasswordInput
          control={control}
          name='confirmPass'
          label={AUTH_MESSAGES.PASSWORD.CONFIRM}
          errorMessage={errors.confirmPass?.message as string}
          aria-required='true'
        />
        <Button
          type='submit'
          disabled={resetPassMutation.isPending || !isValid}
          aria-busy={resetPassMutation.isPending ? 'true' : 'false'}>
          {resetPassMutation.isPending ? (
            <DotSpinner aria-label='Processing...' />
          ) : (
            AUTH_MESSAGES.PASSWORD.SAVE
          )}
        </Button>
      </Stack>
    </>
  );
};

export default ForgotPassNewPassStep;
