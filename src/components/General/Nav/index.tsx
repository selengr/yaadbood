'use client';

import { Box, IconButton, Link, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/atoms/Button/Button';
import GlobalSearch from '@/components/atoms/GlobalSearch';
import ArrowLeftIcon from '@/components/atoms/Icon/icons/ArrowLeftIcon';
import LogoIcon from '@/components/atoms/Icon/icons/LogoIcon';
import MoonIcon from '@/components/atoms/Icon/icons/MoonIcon';
import Notification from '@/components/atoms/Icon/icons/NotificationIcon';
import Setting2Icon from '@/components/atoms/Icon/icons/Setting2Icon';
import SunIcon from '@/components/atoms/Icon/icons/SunIcon';
import { AuthModal } from '@/components/auth/AuthModal';
import { useLogout } from '@/hooks/auth/useLogout';
import { useAppDispatch } from '@/hooks/util/redux.hooks';
import { toggleMode } from '@/redux/slices/themeSlice';
import { RootState } from '@/redux/store';
import { AuthSteps } from '@/types/auth';
import { getLoginTimestamp } from '@/utils/auth/authUtils';

import UserModal from '../UserModal';
import CreateContent from './CreateContent';
import * as S from './Styles';

const HeaderSigninButton = dynamic(() => import('./HeaderSigninButton').then((module) => module.default), {
  ssr: false
});

export const Nav = ({
  Reversible,
  showPathname,
  setting,
  onSettingClick
}: {
  Reversible?: boolean;
  showPathname?: boolean;
  setting?: boolean;
  onSettingClick?: () => void;
}) => {
  const [progressWidth, setProgressWidth] = useState('0%');
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [forceLogin, setForceLogin] = useState(false);
  const progressStatus = useSelector((state: RootState) => state.progress.status);
  const iconColor = useSelector((state: RootState) => state.iconColor.color);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useAppDispatch();
  const [manualStep, setManualStep] = useState<AuthSteps>(AuthSteps.login);

  const logoutMutate = useLogout({
    onSuccess: () => {
      console.log('Logout successful');
      signOut({ redirect: false }); // Sign out without redirecting
      setShowLoginModal(true); // Open the modal after logout
      setForceLogin(true); // Force the user to log in
      setManualStep(AuthSteps.login); // Set the modal to start at the login step
    },
    onError: () => {
      console.log('Logout error');
      signOut({ redirect: false }); // Sign out even if there's an error
      setShowLoginModal(true); // Open the modal after logout
      setForceLogin(true); // Force the user to log in
      setManualStep(AuthSteps.login); // Set the modal to start at the login step
    }
  });

  // Handle the progress bar
  useEffect(() => {
    if (progressStatus) {
      setProgressWidth('.00001%');
      setTimeout(() => {
        setProgressWidth('80%');
      }, 100);
    } else {
      setProgressWidth('100%');
      setTimeout(() => {
        setProgressWidth('0%');
      }, 1000);
    }
  }, [progressStatus]);

  // Sync Tailwind dark class with Redux theme
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  // Force logout and open modal after 2 seconds ONLY if the user is logged in
  useEffect(() => {
    if (session) {
      const loginTimestamp = getLoginTimestamp();
      if (loginTimestamp) {
        const timer = setTimeout(
          () => {
            console.log('2 seconds passed, forcing logout...');
            logoutMutate.mutate({ refreshToken: session?.user?.refreshToken }); // Trigger logout
          },
          10 * 60 * 60 * 1000
        );

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
      }
    }
  }, [session, logoutMutate]);

  return (
    <>
      <S.AppBarStyle
        sx={{
          backgroundColor: {
            xs: theme.palette.neutrals['content'],
            sm: theme.palette.neutrals['content'],
            md: theme.palette.neutrals['page']
          }
        }}>
        {/* Mobile layout */}
        {Reversible ? (
          <Box
            sx={{
              display: { xs: 'flex', sm: 'flex', md: 'none' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}>
            <IconButton
              sx={{
                stroke: theme.palette.gray['700'],
                padding: '0px'
              }}
              onClick={() => router.back()}>
              <ArrowLeftIcon width={20} height={20} />
            </IconButton>

            {showPathname ? (
              <Typography
                sx={(theme) => ({
                  color: theme.palette.gray['700'],
                  fontSize: '18px',
                  fontWeight: 500
                })}>
                {pathname.split('/')[pathname.split('/').length - 1]}
              </Typography>
            ) : (
              <GlobalSearch
                value='[Full name]'
                textColor={theme.palette.gray['700']}
                backgroundColor={
                  theme.palette.mode === 'light'
                    ? theme.palette.neutrals['page']
                    : theme.palette.neutrals['content']
                }
              />
            )}

            {showPathname && <span style={{ width: '20px', display: 'block' }} />}
            {!showPathname && setting && (
              <Box
                onClick={onSettingClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <Setting2Icon />
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              display: { xs: 'flex', sm: 'flex', md: 'none' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}>
            <Box component={Link} href='/' sx={{ display: 'flex', textDecoration: 'none' }}>
              <Box sx={{ width: '64px', height: '16px' }}>
                <LogoIcon />
              </Box>
              {session && (
                <Typography
                  sx={(theme) => ({
                    mb: '4px',
                    ml: '4px',
                    fontSize: '12px',
                    color: theme.palette.gray['500']
                  })}>
                  {`${session?.user.country?.[0]?.toUpperCase()}${session?.user.country?.[1]?.toUpperCase()}`}
                </Typography>
              )}
            </Box>

            <GlobalSearch
              textColor={theme.palette.gray['400']}
              backgroundColor={
                theme.palette.mode === 'light'
                  ? theme.palette.neutrals['page']
                  : theme.palette.neutrals['content']
              }
            />
            {session && (
              <Box
                sx={{
                  stroke:
                    theme.palette.mode === 'light' ? theme.palette.gray['700'] : theme.palette.gray['400'],
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <Notification />
              </Box>
            )}
            {session && <UserModal AvatarWidth={32} AvatarHeight={32} />}
            {!session && <HeaderSigninButton />}
          </Box>
        )}

        {/* Desktop layout */}
        <>
          <Box
            sx={() => ({
              margin: 'auto',
              display: { xs: 'none', sm: 'none', md: 'flex' },
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: theme.spacing(1)
            })}>
            <Box component={Link} href='/' sx={{ display: 'flex', textDecoration: 'none' }}>
              <Box sx={{ width: '96px', height: '24px' }}>
                <LogoIcon />
              </Box>
              {session && (
                <Typography
                  sx={(theme) => ({
                    mb: '4px',
                    ml: '4px',
                    fontSize: '14px',
                    color: theme.palette.gray['500']
                  })}>
                  {`${session?.user.country?.[0]?.toUpperCase()}${session?.user.country?.[1]?.toUpperCase()}`}
                </Typography>
              )}
            </Box>

            <GlobalSearch
              textColor={theme.palette.gray['400']}
              backgroundColor={
                theme.palette.mode === 'light'
                  ? theme.palette.neutrals['page']
                  : theme.palette.neutrals['content']
              }
            />

            {session ? (
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  [theme.breakpoints.down('sm')]: {
                    gap: '4px'
                  }
                })}>
                <Box
                  sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                      display: 'none'
                    }
                  })}>
                  <CreateContent />
                </Box>
                <Button
                  icon
                  variant={theme.palette.mode === 'light' ? 'outlined' : 'contained'}
                  color={
                    theme.palette.mode === 'light'
                      ? theme.palette.gray['200']
                      : theme.palette.neutrals['content']
                  }>
                  <Box
                    sx={{
                      stroke:
                        theme.palette.mode === 'light'
                          ? theme.palette.gray['700']
                          : theme.palette.gray['400'],
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <Notification />
                  </Box>
                </Button>
                <UserModal />
                <Button
                  onClick={() => dispatch(toggleMode())}
                  icon
                  variant={theme.palette.mode === 'light' ? 'outlined' : 'contained'}
                  color={
                    theme.palette.mode === 'light'
                      ? theme.palette.gray['200']
                      : theme.palette.neutrals['content']
                  }>
                  {theme.palette.mode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Box>
            ) : (
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  [theme.breakpoints.down('sm')]: {
                    gap: '4px'
                  }
                })}>
                <HeaderSigninButton />
                <Button
                  onClick={() => dispatch(toggleMode())}
                  icon
                  variant={theme.palette.mode === 'light' ? 'outlined' : 'contained'}
                  color={
                    theme.palette.mode === 'light'
                      ? theme.palette.gray['200']
                      : theme.palette.neutrals['content']
                  }>
                  {theme.palette.mode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Box>
            )}
          </Box>

          {progressWidth !== '0%' && (
            <S.progressBar width={progressWidth}>
              <span />
            </S.progressBar>
          )}
        </>
      </S.AppBarStyle>
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

export default Nav;
