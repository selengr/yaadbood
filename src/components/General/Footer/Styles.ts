import { styled } from '@mui/material';
import Link from 'next/link';

import { lightColors } from '@/themes/colors';

export const liStyle = styled('li')(({ theme }) => ({
  listStyleType: 'none',
  paddingLeft: '10px',
  position: 'relative',
  '&::before': {
    content: '"•"',
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-60%)',
    fontSize: '12px',
    marginRight: '0',
    color: lightColors.gray['500']
  }
}));

export const LinkStyle = styled(Link)(({ theme }) => ({
  color: lightColors.gray['200'],
  textDecoration: 'none'
}));
