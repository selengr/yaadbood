import { AppBar, styled } from '@mui/material';

interface progressBarType {
  width: string;
}

export const AppBarStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  padding: '12px 48px',
  '--Paper-overlay': 'none !important',
  [theme.breakpoints.down('sm')]: {
    padding: '12px 18px'
  }
}));

export const progressBar = styled('div')<progressBarType>(({ theme, width }) => ({
  width: '100%',
  position: 'absolute',
  bottom: '0',
  left: '0',
  transform: 'translateY(100%)',
  height: '4px',
  backgroundColor: theme.palette.primary['50'],
  '& span': {
    minWidth: width,
    maxWidth: width,
    transition: 'all 1s',
    backgroundColor: theme.palette.primary['500'],
    height: '100%',
    borderRadius: '99px',
    display: width === '0%' ? 'none' : 'block'
  }
}));
