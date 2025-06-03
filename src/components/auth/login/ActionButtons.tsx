import { Stack } from '@mui/material';

import DotSpinner from '@/components/atoms/DotSpinner';
import { GENERAL_MESSAGES } from '@/constants';
import { AUTH_MESSAGES } from '@/constants';

import { ContinueButton, ForgotPasswordButton, StyledDotPulse } from './style';

export const ActionButtons = ({
  // forgotPassMutation,
  // loginMutation,
  // registerMutation,
  handleConfirm,
  emailInput,
  isValid,
  errors,
  captchaToken,
  isPending
}: {
  // forgotPassMutation: any;
  // loginMutation: any;
  // registerMutation: any;
  handleConfirm: () => void;
  emailInput: string;
  isValid: boolean;
  errors: any;
  captchaToken: string | null;
  isPending: boolean
}) => {


  const isContinueButtonDisabled = !emailInput || errors.email?.message || isPending || !captchaToken;

  function handleContinue() {
    if (isContinueButtonDisabled) return;
    handleConfirm();
  }


  function renderContinueButton() {
    if (isPending) {
      return <DotSpinner />;
    }
    return GENERAL_MESSAGES.ACTIONS.CONTINUE;
  }

  return (
    <Stack flexDirection='row' gap={{ xs: 1, sm: 1.5 }}>
      <ContinueButton variant='contained' onClick={handleContinue} disabled={isContinueButtonDisabled}>
        {renderContinueButton()}
      </ContinueButton>
    </Stack>
  );
};
