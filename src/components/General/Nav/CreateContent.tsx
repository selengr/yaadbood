'use client';

import { Box, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Confirmation from '@/components/atoms/Confirmation';
import CreateNewTweet from '@/components/post/CreateNewTweet';
import { useLogout } from '@/hooks/auth/useLogout';
import Edit2Icon from '@/components/atoms/Icon/icons/Edit2Icon';
import LampChargeIcon from '@/components/atoms/Icon/icons/LampChargeIcon';
import AddIcon from '@/components/atoms/Icon/icons/AddIcon';
import { storePartialStep } from '@/utils/auth/authUtils';
import { AuthSteps } from '@/types/auth';

const CreateContent = ({ AvatarWidth, AvatarHeight }: { AvatarWidth?: number; AvatarHeight?: number }) => {
  const [menuStatus, setMenuStatus] = useState<null | HTMLDivElement>(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [openNewTweet, setOpenNewTweet] = useState(false);
  const open = Boolean(menuStatus);
  const { data: session } = useSession();
  const theme = useTheme();

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
  const handleToggleNewTweet = () => setOpenNewTweet(!openNewTweet);

  return (
    <>
      <Box
        onMouseEnter={(e) => {
          clearTimeout(timeoutId);
          setMenuStatus(e.currentTarget);
        }}
        onMouseLeave={() => {
          timeoutId = setTimeout(() => setMenuStatus(null), 300);
        }}
        sx={{ cursor: 'pointer', display: 'inline-block' }}>
        <Button
          icon
          variant={theme.palette.mode === 'light' ? 'outlined' : 'contained'}
          color={
            theme.palette.mode === 'light' ? theme.palette.gray['200'] : theme.palette.neutrals['content']
          }>
          <Box
            sx={{
              stroke: theme.palette.mode === 'light' ? theme.palette.gray['700'] : theme.palette.gray['400'],
              display: 'flex',
              alignItems: 'center'
            }}>
            <AddIcon />
          </Box>
        </Button>
      </Box>
      <CreateNewTweet open={openNewTweet} onClose={handleToggleNewTweet} />

      <Menu
        sx={(theme) => ({
          '& .MuiPaper-root': {
            borderRadius: '16px',
            backgroundColor: theme.palette.neutrals['content'],
            boxShadow: '0px 12px 12px 0px #00000014',
            marginTop: '20px',
            width: '120px'
          },
          '& .MuiList-root': {
            padding: '6px 0px'
          }
        })}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        anchorEl={menuStatus}
        open={open}
        onClose={() => setMenuStatus(null)}
        onMouseEnter={() => clearTimeout(timeoutId)}
        onMouseLeave={() => {
          timeoutId = setTimeout(() => setMenuStatus(null), 300);
        }}>
        <MenuItem
          onClick={() => {
            setMenuStatus(null);
            handleToggleNewTweet();
          }}
          sx={(theme) => ({
            padding: '12px 16px',
            stroke: theme.palette.gray['600'],
            alignItems: 'center',
            gap: '12px'
          })}>
          <Edit2Icon />
          <Typography
            sx={{
              fontSize: '14px',
              color: theme.palette.gray['600'],
              lineHeight: '14px',
              fontWeight: 500
            }}>
            Tweet
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setMenuStatus(null)}
          sx={(theme) => ({
            padding: '12px 16px',
            fontSize: '14px',
            color: theme.palette.gray['600'],
            stroke: theme.palette.gray['600'],
            fontWeight: 500,
            alignItems: 'center',
            gap: '12px'
          })}>
          <LampChargeIcon />
          <Typography
            sx={{
              fontSize: '14px',
              color: theme.palette.gray['600'],

              lineHeight: '14px',
              fontWeight: 500
            }}>
            Chart
          </Typography>
        </MenuItem>
      </Menu>

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

export default CreateContent;
