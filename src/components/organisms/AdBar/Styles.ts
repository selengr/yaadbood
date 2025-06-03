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

export const WrapperStyled = styled(Box)(({ theme }) => ({
  width: '270px',
  height: 'fit-content',
  minWidth: '270px',
  position: 'sticky',
  top: '88px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    position: 'relative'
  }
}));

export const ContainerStyled = styled(Box)(({ theme }) => ({
  borderRadius: '6px',
  overflow: 'hidden',
  backgroundColor: theme.palette.neutrals['content'],
  display: 'flex',
  flexDirection: 'column'
}));

export const TopContainerStyled = styled(Box)`
  padding: 16px;
`;
