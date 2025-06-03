import { Box, styled } from '@mui/material';

interface ItemType {
  isActive?: boolean;
}

export const Item = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<ItemType>(({ theme, isActive }) => ({
  fontSize: '16px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  borderRadius: '8px',
  gap: '12px',
  textDecoration: 'none',
  backgroundColor: isActive ? theme.palette.gray['100'] : '',
  color: isActive ? theme.palette.gray['950'] : theme.palette.gray['400'],
  svg: {
    width: '20px',
    height: '20px',
    stroke: isActive ? theme.palette.gray[950] : theme.palette.gray[400]
  }
}));
