import { Box, styled } from '@mui/material';

interface ItemType {
  isActive?: boolean;
}

export const Item = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<ItemType>(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  borderRadius: '8px',
  gap: '12px',
  textDecoration: 'none',
  backgroundColor: isActive ? theme.palette.gray['100'] : '',
  color: isActive ? theme.palette.gray['950'] : theme.palette.gray['400']
}));
