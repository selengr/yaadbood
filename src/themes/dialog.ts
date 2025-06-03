import { createTheme } from '@mui/material';

const theme = createTheme();

export const dialog = {
  styleOverrides: {
    paper: {
      minWidth: '420px'
    },
    paperFullScreen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      height: 'max-content',
      position: 'absolute',
      bottom: 0,
      [theme.breakpoints.up('md')]: {
        // borderBottomLeftRadius: '16px',
        // borderBottomRightRadius: '16px',
        height: 'max-content',
        width: 'max-content',
        position: 'relative'
      }
    }
  }
} as const;
