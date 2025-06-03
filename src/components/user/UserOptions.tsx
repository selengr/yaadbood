'use client';

import { Box, IconButton, Popover, Typography } from '@mui/material';
import moment from 'moment';
import { MouseEvent, useState } from 'react';

import { UserState } from '@/types/auth';

import Icon from '../atoms/Icon';
import Modal from '../atoms/Modal/Modal';

const UserOptions = ({ userData }: { userData: UserState }) => {
  const [contactModal, setContactModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          flexShrink: 0,
          aspectRatio: '1/1',
          width: '28px',
          height: '28px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'gray.200'
        }}>
        <Icon name='option' w={16} h={32} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        sx={{
          '& .MuiPaper-rounded': {
            borderRadius: '6px',
            boxShadow: '0px 16px 24px 0px #94A3B83D'
          }
        }}
        transformOrigin={{
          vertical: 'top', // Align the top of the popover with the bottom of the button
          horizontal: 'left' // Center the popover horizontally
        }}
        classes={{
          paper: 'flex flex-col gap-4 p-4 items-center rounded-lg mt-4'
        }}>
        <Box
          onClick={() => setContactModal(true)}
          sx={(theme) => ({
            fontSize: '14px',
            cursor: 'pointer',
            color: theme.palette.gray['600'],
            width: '220px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            fontWeight: 500
          })}>
          About
        </Box>
      </Popover>
      <Modal open={contactModal} onClose={() => setContactModal(false)} title='About this profile'>
        <Box
          sx={{
            width: { xs: '100%', md: '420px' }
          }}>
          <Typography
            sx={(theme) => ({
              fontSize: '18px',
              fontWeight: '500',
              color: theme.palette.gray['700'],
              wordBreak: 'break-word',
              whiteSpace: 'wrap'
            })}>
            {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
          </Typography>
          <Box sx={{ mt: '12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography
                sx={(theme) => ({ color: theme.palette.gray['700'], fontWeight: 600, fontSize: '14px' })}>
                Joined
              </Typography>
              <Typography
                sx={(theme) => ({ color: theme.palette.gray['500'], fontSize: '12px', fontWeight: '500' })}>
                {moment(userData?.createdAt).format('MMMM YYYY')}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={(theme) => ({ color: theme.palette.gray['700'], fontWeight: 600, fontSize: '14px' })}>
                Contact information
              </Typography>
              <Typography
                sx={(theme) => ({ color: theme.palette.gray['500'], fontSize: '12px', fontWeight: '500' })}>
                Updated {moment(userData?.updatedAt).fromNow()}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={(theme) => ({ color: theme.palette.gray['700'], fontWeight: 600, fontSize: '14px' })}>
                Profile photo
              </Typography>
              <Typography
                sx={(theme) => ({ color: theme.palette.gray['500'], fontSize: '12px', fontWeight: '500' })}>
                Updated {moment(userData?.profilePhoto_updated).fromNow()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserOptions;
