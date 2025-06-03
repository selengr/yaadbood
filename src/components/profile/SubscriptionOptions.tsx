"use client"
import { IconButton, Popover } from '@mui/material';
import { MouseEvent, useState } from 'react';
import NotinterestedBtn from './NotinterestedBtn';
import ReportUserModal from './ReportUserModal';
import OptionIcon from '../atoms/Icon/icons/OptionIcon';

const SubscriptionOptions = ({
  userData
}: {
  userData:
    | {
        photos: string[];
        username: string;
        profilePhoto: string;
        displayName: string | null;
        id: string;
        firstName: string;
        lastName: string;
        job: string;
      }
    | {
        username: string;
        createdAt: string;
        firstName: string;
        lastName: string;
        id: string;
        job: string;
        profilePhoto: string;
        profilePhoto_updated: string;
      };
}) => {
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
        sx={{ flexShrink: 0, aspectRatio: '1/1', width: '40px', height: '40px' }}>
        <OptionIcon />
      </IconButton>
      <Popover
        disablePortal
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        sx={{
          '& .MuiPaper-rounded': {
            borderRadius: '6px',
            boxShadow: '0px 16px 24px 0px #94A3B83D'
          }
        }}
        transformOrigin={{
          vertical: 'top', // Align the top of the popover with the bottom of the button
          horizontal: 'right' // Center the popover horizontally
        }}
        classes={{
          paper: 'flex flex-col gap-4 p-4 items-center rounded-lg mt-4'
        }}>
        <ReportUserModal username={userData?.username} />
        <NotinterestedBtn username={userData?.username} />
      </Popover>
    </>
  );
};

export default SubscriptionOptions;
