import { lightColors } from '@/themes/colors';
import { Components } from '@mui/material';

const buttons: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      textTransform: 'none',
      borderRadius: '12px',
      padding: '0.75rem 1rem',
      fontWeight: '600',
      minHeight: '40px'
    },
    containedPrimary: {
      background: lightColors.primary['500'],
      color: 'white',
      boxShadow: 'none',
      border: `1px solid ${lightColors.primary['500']}`,
      ':hover': {
        boxShadow: 'none'
      },
      ':disabled': {
        border: `1px solid ${lightColors.primary['500']}`,
        background: lightColors.primary['500'],
        color: 'white',
        opacity: '50%'
      }
    },
    outlinedPrimary: {
      color: lightColors.gray['700'],
      boxShadow: 'none',
      border: `1px solid ${lightColors.gray['200']}`,
      ':hover': {
        boxShadow: 'none',
        border: `1px solid ${lightColors.gray['200']}`
      }
    },
    outlinedSecondary: {
      color: lightColors.primary['500'],
      boxShadow: 'none',
      border: `1px solid ${lightColors.gray['200']}`,
      ':hover': {
        boxShadow: 'none',
        border: `1px solid ${lightColors.gray['100']}`
      }
    }
  },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        backgroundColor: lightColors.primary['500'],
        color: 'white'
      }
    },
    {
      props: { variant: 'secondary' },
      style: {
        backgroundColor: lightColors.gray['500'],
        color: '#fff',
        '&:hover': {
          backgroundColor: lightColors.gray['400']
        }
      }
    }
  ]
} as const;
export default buttons;
