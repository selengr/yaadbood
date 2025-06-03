'use client';
import React from 'react';
import { uniqueId } from 'lodash-es';
import { IconButton, ListItemIcon } from '@mui/material';
// components
import { OptionIcon } from '@/components/atoms';
//style
import { StyledMenu, StyledMenuItem, StyledListItemText, StyledDotPulse } from './dropdownMenu';

type MenuItemType = {
  sx?: object;
  label: string;
  isLoading? : boolean
  icon?: React.ReactNode;
  onClick?: () => void | Promise<void>;
};

type IProps = {
  items: MenuItemType[];
  children?: React.ReactNode;
};

  const DropdownMenu = React.forwardRef<{ closeMenu: () => void }, IProps>(({ items, children }, ref) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  React.useImperativeHandle(ref, () => ({
    closeMenu: handleClose
  }));

  const handleSelectItem = (onClick?: () => void | Promise<void>) => async (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    try { 
      await onClick?.();
    } finally {
      handleClose();
    }
  };

  return (
    <>
      {children ? (
        <div onClick={handleClick}>{children}</div>
      ) : (
        <IconButton onClick={handleClick}>
          <OptionIcon />
        </IconButton>
      )}
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items?.map(({ label, icon, onClick, isLoading, sx }) => (
          <StyledMenuItem key={uniqueId()} onClick={handleSelectItem(onClick)} disabled={isLoading}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            {isLoading && <StyledDotPulse />}
            {!isLoading && <StyledListItemText sx={sx}>{label}</StyledListItemText>}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
});

export default DropdownMenu;
