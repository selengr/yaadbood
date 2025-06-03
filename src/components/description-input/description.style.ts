import { Box, styled } from '@mui/material';
import { Editable } from 'slate-react';
import MentionItem from '../user-avatar';

export const StyledMentionBox = styled(Box)(({ theme }) => ({
  zIndex: 1000005,
  whiteSpace: 'nowrap',
  background: 'white',
  maxHeight: '180px',
  overflowY: 'auto',
  borderRadius: '4px',
  boxShadow: '0 1px 5px rgba(0,0,0,.2)',
  p: 1,
  position: 'absolute',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

export const StyledTag = styled(Box)(({ theme }) => ({
  padding: '1px 3px',
  borderRadius: '3px',
  cursor: 'pointer',
  backgroundColor: theme.palette.gray['100'],
  color: theme.palette.primary['400']
}));

export const StyledEditable = styled(Editable)(({ theme }) => ({
  outline: 'none',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  padding: theme.spacing(1),
  height: '100px',
  overflowX: 'hidden',
  overflowY: 'auto'
}));

export const StyledMentionItem = styled(MentionItem)(({ theme }) => ({
  height: '60px',
  padding: theme.spacing(1.25),
  color: theme.palette.red['600']
}));
