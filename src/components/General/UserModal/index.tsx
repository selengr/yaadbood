'use client';

import { Box, Dialog, Divider, IconButton, Link, Typography, useTheme } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import Avatar from '@/components/atoms/Avatar';
import Confirmation from '@/components/atoms/Confirmation';

import { useLogout } from '@/hooks/auth/useLogout';
import { useAppDispatch } from '@/hooks/util/redux.hooks';
import { toggleMode } from '@/redux/slices/themeSlice';

import * as S from './Styles';
import ArrowLeft from '@/components/atoms/Icon/icons/ArrowLeftIcon';
import MoonIcon from '@/components/atoms/Icon/icons/MoonIcon';
import SunIcon from '@/components/atoms/Icon/icons/SunIcon';
import { storePartialStep } from '@/utils/auth/authUtils';
import { AuthSteps } from '@/types/auth';

const UserModal = ({ AvatarWidth, AvatarHeight }: { AvatarWidth?: number; AvatarHeight?: number }) => {
  const [menuStatus, setMenuStatus] = useState<null | HTMLDivElement>(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const open = Boolean(menuStatus);
  const { data: session } = useSession();
  const userData = session?.user;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const logoutMutate = useLogout({
    onSuccess: () => {
      storePartialStep(AuthSteps.login);
      signOut();
      setConfirmModal(false);
    },
    onError: () => {
      signOut();
    }
  });

  let timeoutId: NodeJS.Timeout;

  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
        }}
      >
        <Box
          onMouseEnter={(e) => {
            clearTimeout(timeoutId);
            setMenuStatus(e.currentTarget);
          }}
          onMouseLeave={() => {
            timeoutId = setTimeout(() => setMenuStatus(null), 300);
          }}
          sx={{
            cursor: 'pointer',
            display: 'inline-block',
          }}
        >
          <Avatar width={AvatarWidth || 40} height={AvatarHeight || 40} image={userData?.profilePhoto} />
        </Box>

        <S.MenuStyle
          anchorEl={menuStatus}
          open={open}
          onClose={() => setMenuStatus(null)}
          onMouseEnter={() => clearTimeout(timeoutId)}
          onMouseLeave={() => {
            timeoutId = setTimeout(() => setMenuStatus(null), 300);
          }}

        >
          <Box
            sx={{
              backgroundColor: theme.palette.neutrals.content,
              display: 'flex',
              alignItems: 'center',
              padding: '20px 16px',
              paddingBottom: '0px',
              gap: '12px'
            }}
          >
            <Avatar width={56} height={56} image={userData?.profilePhoto} />
            <Box sx={{ backgroundColor: theme.palette.neutrals.content }}>
              <Typography
                sx={{ color: theme.palette.gray[700], fontSize: '18px', fontWeight: 500 }}
              >
                {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
              </Typography>
              <Typography
                sx={{ color: theme.palette.gray[600], fontSize: '12px', fontWeight: 400 }}
              >
                {userData?.job}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              padding: '16px 12px',
              backgroundColor: theme.palette.neutrals.content
            }}
          >
            <Link
              href='/profile'
              onClick={() => setMenuStatus(null)}
              sx={{
                width: '100%',
                color: theme.palette.gray[700],
                fontWeight: '500',
                minHeight: '32px',
                height: '32px',
                '&:hover': { color: theme.palette.gray[700] },
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: theme.palette.gray[200],
                borderRadius: '9999px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none'
              }}
            >
              View your profile
            </Link>
          </Box>
          <S.MenuItemStyle
            onClick={() => setConfirmModal(true)}
            sx={{
              backgroundColor: theme.palette.neutrals.content,
              color: theme.palette.red[500],
              fontWeight: 500
            }}
          >
            Log out
          </S.MenuItemStyle>
          <Divider sx={{ margin: '0px !important' }} />
          <S.MenuItemStyle sx={{ backgroundColor: theme.palette.neutrals.content }}>
            Language: {userData?.language || 'English'}
          </S.MenuItemStyle>
          <S.MenuItemStyle sx={{ backgroundColor: theme.palette.neutrals.content }}>
            Location: {userData?.country}
          </S.MenuItemStyle>
        </S.MenuStyle>
      </Box>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'flex', md: 'none' },
          backgroundColor: theme.palette.neutrals.content
        }}
      >
        <Box
          onClick={() => {
            setMobileMenuOpen(true);
          }}
          sx={{
            cursor: 'pointer',
            display: 'inline-block',
            backgroundColor: theme.palette.neutrals.content
          }}
        >
          <Avatar width={AvatarWidth || 40} height={AvatarHeight || 40} image={userData?.profilePhoto} />
        </Box>

        <Dialog
          fullScreen
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            backgroundColor: theme.palette.neutrals.content,
            '& .MuiPaper-root': {
              backgroundColor: theme.palette.neutrals.page,
              height: '100%'
            },
            '& .MuiBox-root': {
              paddingY: '0px'
            }
          }}
        >
          <Box
            sx={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: theme.palette.neutrals.content
            }}
          >
            <Box
              sx={{
                width: '100%',
                backgroundColor: theme.palette.neutrals.content,
                textAlign: 'left',
                padding: '18px !important'
              }}
            >
              <IconButton
                sx={{
                  stroke: theme.palette.gray[700],
                  padding: '0px'
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowLeft width={20} height={20} />
              </IconButton>
            </Box>
            <Box
              sx={{
                padding: '12px 16px !important',
                backgroundColor: theme.palette.neutrals.content,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Avatar width={48} height={48} image={userData?.profilePhoto} />
              <Box sx={{ textAlign: 'left', backgroundColor: theme.palette.neutrals.content }}>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: theme.palette.gray[700]
                  }}
                >
                  {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '2px',
                    backgroundColor: theme.palette.neutrals.content
                  }}
                >
                  <Typography sx={{ fontSize: '12px', color: theme.palette.gray[500] }}>
                    {userData?.job}
                  </Typography>
                  {userData?.job && (
                    <Box
                      sx={{
                        position: 'relative',
                        fontSize: '12px',
                        bottom: '5px',
                        color: theme.palette.gray[500]
                      }}
                    >
                      .
                    </Box>
                  )}
                  <Link
                    href='/profile'
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{
                      fontSize: '12px',
                      textDecoration: 'none',
                      color: theme.palette.gray[500]
                    }}
                  >
                    View your profile
                  </Link>
                  <IconButton
                    sx={{
                      stroke: theme.palette.gray[700],
                      padding: '0px',
                      rotate: '180deg'
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ArrowLeft width={12} height={12} />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: '8px', backgroundColor: theme.palette.neutrals.content }}>
              <S.MenuItemStyle
                onClick={() => {
                  setConfirmModal(true);
                  setMobileMenuOpen(false);
                }}
                sx={{
                  color: theme.palette.red[500],
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '21.5px 16px',
                  backgroundColor: theme.palette.neutrals.content
                }}
              >
                Log out
              </S.MenuItemStyle>
            </Box>
            <Box
              sx={{
                mt: '8px',
                backgroundColor: theme.palette.neutrals.content
              }}
            >
              <S.MenuItemStyle
                onClick={() => dispatch(toggleMode())}
                sx={{
                  padding: '21.5px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: theme.palette.neutrals.content
                }}
              >
                <Box sx={{ display: 'flex', gap: '2px' }}>
                  <Typography sx={{ fontSize: '14px', color: theme.palette.gray[400] }}>
                    Appearance:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: theme.palette.gray[800],
                      fontWeight: 500
                    }}
                  >
                    {theme.palette.mode} mode
                  </Typography>
                </Box>
                {theme.palette.mode === 'light' ? <MoonIcon /> : <SunIcon />}
              </S.MenuItemStyle>
            </Box>
          </Box>
        </Dialog>
      </Box>
      <Confirmation
        open={confirmModal}
        title='Log out of Tradido'
        description='Are you sure you want to log out?'
        submitText='Yes, Log out'
        cancelText='Cancel'
        handleClose={() => setConfirmModal(false)}
        handleSubmit={() => logoutMutate.mutate({ refreshToken: session?.user?.refreshToken || '' })}
        loading={logoutMutate?.isPending}
      />
    </>
  );
};

export default UserModal;