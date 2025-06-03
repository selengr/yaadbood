import { Box, useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/atoms/Button/Button';
import UserIcon from '@/components/atoms/Icon/icons/UserIcon';
import { AuthModal } from '@/components/auth/AuthModal';
import { useLogout } from '@/hooks/auth/useLogout';
import { RootState } from '@/redux/store';
import { AuthSteps } from '@/types/auth';
import { getLoginTimestamp, storePartialStep } from '@/utils/auth/authUtils';

const HeaderSigninButton = () => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [forceLogin, setForceLogin] = useState(false);
  const [manualStep, setManualStep] = useState<AuthSteps>(AuthSteps.login);
  const isLoginModalOpen = searchParams.get('login') === 'true';

  const theme = useTheme();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const logoutMutate = useLogout({
    onSuccess: () => {
      console.log('Logout successful');
      signOut({ redirect: false }); // Sign out without redirecting
      setShowLoginModal(true); // Open the modal after logout
      setForceLogin(true); // Force the user to log in
      setManualStep(AuthSteps.login); // Set the modal to start at the login step
      storePartialStep(AuthSteps.login);
    },
    onError: () => {
      console.log('Logout error');
      signOut({ redirect: false }); // Sign out even if there's an error
      setShowLoginModal(true); // Open the modal after logout
      setForceLogin(true); // Force the user to log in
      setManualStep(AuthSteps.login); // Set the modal to start at the login step
      storePartialStep(AuthSteps.login);
    }
  });

  function isSessionExpired(session: any) {
    if (!session || !session.expires) return false;
    const expiration = new Date(session.expires).getTime();
    return Date.now() > expiration;
  }

  useEffect(() => {
    if (isLoginModalOpen && !showLoginModal) {
      setShowLoginModal(true);
    }
  }, [isLoginModalOpen]);

  useEffect(() => {
    const savedShowLoginModal = localStorage.getItem('showLoginModal');
    const savedForceLogin = localStorage.getItem('forceLogin');
    const savedManualStep = localStorage.getItem('manualStep');

    if (savedShowLoginModal) {
      setShowLoginModal(JSON.parse(savedShowLoginModal));
    }
    if (savedForceLogin) {
      setForceLogin(JSON.parse(savedForceLogin));
    }
    if (savedManualStep) {
      setManualStep(savedManualStep as AuthSteps);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showLoginModal', JSON.stringify(showLoginModal));
    localStorage.setItem('forceLogin', JSON.stringify(forceLogin));
    localStorage.setItem('manualStep', manualStep);
  }, [showLoginModal, forceLogin, manualStep]);

  useEffect(() => {
    if (!isLoginModalOpen) {
      if (status === 'authenticated') {
        const expired = isSessionExpired(session);
        if (expired && session.user?.wasLoggedIn) {
          setForceLogin(true);
          setShowLoginModal(true); // Force modal open
        } else {
          setForceLogin(false);
          setShowLoginModal(false);
        }
      } else if (status === 'unauthenticated' && session) {
        setForceLogin(true); // Force login for previously logged-in users
        setShowLoginModal(true);
      } else {
        setForceLogin(false); // Allow optional modal for new users
      }
    }
  }, [status, session, isLoginModalOpen]);

  // Force logout and open modal after 2 seconds ONLY if the user is logged in
  useEffect(() => {
    if (status === 'authenticated') {
      const loginTimestamp = getLoginTimestamp();
      if (loginTimestamp) {
        const timer = setTimeout(
          () => {
            logoutMutate.mutate({ refreshToken: session?.user?.refreshToken }); // Trigger logout
          },
          10 * 60 * 60 * 1000
        );

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
      }
    }
  }, []);

  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          [theme.breakpoints.down('sm')]: {
            gap: '4px'
          }
        })}>
        <Button
          icon
          sx={{
            width: { xs: '32px', sm: '32px', md: '40px' },
            height: { xs: '32px', sm: '32px', md: '40px' },
            minHeight: '0px'
          }}
          variant={theme.palette.mode === 'light' ? 'outlined' : 'contained'}
          onClick={() => setShowLoginModal(true)}
          color={
            theme.palette.mode === 'light' ? theme.palette.gray['200'] : theme.palette.neutrals['content']
          }>
          <Box
            sx={{
              stroke: theme.palette.mode === 'light' ? theme.palette.gray['700'] : theme.palette.gray['400'],
              display: 'flex',
              alignItems: 'center'
            }}>
            <UserIcon />
          </Box>
        </Button>
      </Box>
      {showLoginModal && (
        <AuthModal
          forceLogin={forceLogin}
          showLoginModal={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          manualStep={manualStep}
        />
      )}
    </>
  );
};

export default HeaderSigninButton;
