import { Input } from '@/components/atoms';
import { Box, IconButton, styled } from '@mui/material';

export const UsernameFieldStyled = styled(Input)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: 'primary.500'
  },
  '& .Mui-disabled.MuiInputBase-input': {
    color: 'primary.500',
    WebkitTextFillColor: theme.palette?.primary[500],
    opacity: 0.5
  },

  '& input': { pl: '0px !important', pr: '20px !important' }
}));

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  width: '28px',
  height: '28px',
  mt: 0.25,
  flexShrink: 0,
  svg: {
    width: 20,
    height: 20,
    fill: 'none'
  },
  pointerEvents: 'none'
}));

export const BoxContainerSpin = styled(Box)(({ theme }) => ({
  padding: 0,
  margin: 0,
  animation: 'spin 1s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '23px',
  height: '23px'
}));

export const CloseIconButtonStyled = styled(IconButton)(({ theme }) => ({
  width: '28px',
  height: '32px',
  flexShrink: 0,
  svg: {
    width: 16,
    height: 16,
    fill: 'none',
    stroke: theme.palette.red[500]
  }
}));

//remove theme

export const EditIconButtonStyled = styled(IconButton)`
  width: 28px;
  height: 28px;
  flexshrink: 0;
  & svg {
    width: 16px;
    height: 16px;
    fill: none;
  }
`;
