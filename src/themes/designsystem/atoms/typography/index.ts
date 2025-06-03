import { Components } from '@mui/material';
import { lightColors } from '../../../colors';

const typography: Components['MuiTypography'] = {
  variants: [
    {
      props: { variant: 'h1' },
      style: {
        fontSize: '30px',
        fontWeight: '700',
        lineHeight: '40px',
        letterSpacing: '-0.02em'
      }
    },
    {
      props: { variant: 'h2' },
      style: {
        fontSize: '24px',
        fontWeight: '700',
        lineHeight: '32px',
        letterSpacing: '-0.02em',
        color: lightColors.gray['700']
      }
    },
    {
      props: { variant: 'h3' },
      style: {
        fontSize: '20px',
        fontWeight: '700',
        lineHeight: '28px',
        letterSpacing: '-0.02em',
        color: lightColors.gray['700']
      }
    },
    {
      props: { variant: 'h4' },
      style: {
        fontSize: '180px',
        fontWeight: '700'
      }
    }
  ]
} as const;

export default typography;
