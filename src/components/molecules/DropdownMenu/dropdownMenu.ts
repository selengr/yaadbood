import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import {
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
// components
import { DotPulse } from '@/components/atoms';

export const StyledIconButton = styled(IconButton)({
  padding: 10,
  flexShrink: 0,    
  display: 'flex',
  alignSelf: 'start',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)' 
  }
});

export const StyledMenu = styled(Menu)({
  '& .MuiPaper-rounded': {
    width: '121px',
    overflow: 'hidden',
    borderRadius: '6px',
    boxShadow: '0px 16px 24px 0px #94A3B83D'
  },
  '& .MuiMenu-list': {
    paddingTop : '0px',
    paddingBottom : '0px',
  }
});


export const StyledMenuItem = styled(MenuItem)(({ theme }) => [
  {
    margin: '4px',
    height: '38px',
    display: 'flex',
    cursor: 'pointer',
    fontSize: '14px',
    minHeight: '38px',
    padding: '0px 12px',
    fontWeight: 'normal',
    alignItems: 'center',
    borderRadius: '10px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover, 
    },
  },
  theme.applyStyles('dark', {
    '&:hover': {
      backgroundColor: theme.palette.action.hover, 
    },
  }),
]);

export const StyledListItemText = styled(Typography)(({ theme }) => [
  {
    fontSize: '14px',
    color: theme.palette.gray[600], 
  },
  theme.applyStyles('dark', {
    color: theme.palette.gray[300], 
  }),
]);

export const StyledDangerMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.red[500],
}));

export const StyledDotPulse = styled(DotPulse)(({ theme }) => ({
  marginLeft : '20px',
  color: theme.palette.primary.main,
  '&::before': {
    color: theme.palette.primary.main
  },
  '&::after': {
    color: theme.palette.primary.main
  }
}));