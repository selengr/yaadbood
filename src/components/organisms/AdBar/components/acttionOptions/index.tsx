'use client';

import { MouseEvent, useState } from 'react';
//components
import { OptionIcon } from '@/components/atoms';
//styles
import { IconButtonStyled, PopoverItemStyled, PopoverStyled } from './ActionOptions.styled';
//constants
import { AD } from '@/constants';

const ActionOptions = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const {
    ACTION_OPTIONS: { REPORT, NOT_INTERESTED }
  } = AD;

  return (
    <>
      <IconButtonStyled onClick={handleClick}>
        <OptionIcon />
      </IconButtonStyled>
      <PopoverStyled
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <PopoverItemStyled>{REPORT}</PopoverItemStyled>
        <PopoverItemStyled>{NOT_INTERESTED}</PopoverItemStyled>
      </PopoverStyled>
    </>
  );
};

export default ActionOptions;
