import { lightColors } from './colors';

export const input = {
  styleOverrides: {
    root: {
      borderRadius: '8px',
      backgroundColor: lightColors.gray['100'],
      ':hover': {
        backgroundColor: lightColors.gray['100']
      },
      ':before': {
        borderBottom: 'none !important'
      },
      ':after': {
        borderBottom: 'none'
      }
    }
  }
} as const;
