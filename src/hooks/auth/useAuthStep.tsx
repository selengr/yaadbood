'use client';

import { GENERAL_MESSAGES } from '@/constants';
import { AuthSteps, UserData } from '@/types/auth';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useMemo, useState, useCallback } from 'react';

export default function useAuthStep(manualStep?: AuthSteps) {
  const [step, setStep] = useState<AuthSteps>(manualStep || AuthSteps.login);
  const { data: session } = useSession();

  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
    location: '',
    gender: '',
    first_name: '',
    last_name: '',
    birthdate: '',
    otp: ''
  });

  const onBackStep = useMemo(() => {
    switch (step) {
      case AuthSteps.login:
        return undefined;
      case AuthSteps.forgetPassNew:
        return () => setStep(AuthSteps.login);
      case AuthSteps.forgotPassOtp:
        return () => setStep(AuthSteps.login);
      case AuthSteps.otp:
        return () => setStep(AuthSteps.login);
      case AuthSteps.gender:
        return undefined;
      case AuthSteps.birthdate:
        return () => setStep(AuthSteps.gender);
      case AuthSteps.location:
        return () => setStep(AuthSteps.birthdate);
      default:
        return undefined;
    }
  }, [step]);

  const authModalTitle = () => {
    const user = session?.user;
    console.log('authModalTitle',user?.email);
    console.log('authModalTitle',user?.gender);
    
    switch (step) {
      case AuthSteps.login:
        return (
          <Typography
            fontSize="20px"
            fontWeight={500}
            display="flex"
            gap={1} // Adds spacing between child elements
            sx={(theme) => ({
              color: theme.palette.mode === 'light' ? theme.palette.gray['700'] : '#fff'
            })}
          >
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              {GENERAL_MESSAGES.ACTIONS.LOGIN}
            </Box>
            <Typography component="span" sx={{ fontWeight: 'normal', color: 'red', fontSize: '20px' }}>
              {String(GENERAL_MESSAGES.ACTIONS.OR).toLowerCase()}
            </Typography>
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              {GENERAL_MESSAGES.ACTIONS.SIGN_UP}
            </Box>
          </Typography>
        );
      case AuthSteps.forgotPassOtp:
        return GENERAL_MESSAGES.ACTIONS.VERIFICATION_CODE;
      case AuthSteps.forgetPassNew:
        return GENERAL_MESSAGES.ACTIONS.SET_NEW_PASSWORD;
      case AuthSteps.otp:
        return GENERAL_MESSAGES.ACTIONS.VERIFICATION_CODE;
      case AuthSteps.birthdate:
        return user?.gender;
      case AuthSteps.location:
        return user?.email || GENERAL_MESSAGES.ACTIONS.BACK_TO_EMAIL_PAGE;
      case AuthSteps.gender:
        return user?.email || GENERAL_MESSAGES.ACTIONS.BACK_TO_EMAIL_PAGE;
      default:
        return '';
    }
  };

  const onChangeStep = useCallback((newStep: AuthSteps) => {
    setStep(newStep);
  }, []);

  return { step, onChangeStep, userData, setUserData, authModalTitle, onBackStep };
}
