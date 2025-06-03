'use client';

import { IconButton, Popover, SxProps, Theme } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';

import AppEmojiSelector from '../common/emoji';

const EmojiPicker = ({
  handleEmojiClick,
  sx
}: {
  handleEmojiClick: (emoji: string) => void;
  sx?: SxProps<Theme>;
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
      <IconButton sx={sx} onClick={handleClick}>
        <FaRegSmile />
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
            boxShadow: '0px 16px 24px 0px #94A3B83D',
            minWidth: '352px'
          }
        }}
        transformOrigin={{
          vertical: 'top', // Align the top of the popover with the bottom of the button
          horizontal: 'left' // Center the popover horizontally
        }}>
        <AppEmojiSelector
          onEmojiSelect={(emoji) => {
            handleEmojiClick(emoji);
            setAnchorEl(null);
          }}
        />
      </Popover>
    </>
  );
};

export default EmojiPicker;
