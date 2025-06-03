import { Box, styled } from '@mui/material';

export const ContainerStyled = styled(Box)(({ theme }) => ({
  color: theme.palette.gray[500],
  fontSize: '12px',
  width: '100%',
  textAlign: 'right',
  fontWeight: 325
}));
