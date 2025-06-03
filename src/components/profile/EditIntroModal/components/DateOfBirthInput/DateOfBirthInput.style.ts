import { IconButton, styled } from '@mui/material';

export const CalenderButtonStyled = styled(IconButton)(({ theme }) => ({
  width: '28px',
  height: '32px',
  flexShrink: 0,
  svg: {
    width: 16,
    height: 16,
    fill: 'none',
    stroke: 'none'
  }
}));
