import { Box, styled } from '@mui/material';
import { ElementType } from 'react';

export const AboutWrapper = styled(Box)<{ component: ElementType }>(({ theme }) => ({
  backgroundColor: theme.palette.neutrals['content'],
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '18px',
  borderRadius: '6px'
}));
