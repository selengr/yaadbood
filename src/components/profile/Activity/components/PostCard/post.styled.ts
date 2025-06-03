import { Box, styled } from '@mui/material';

export const ContainerStyled = styled(Box)(({ theme }) => ({
  padding: '16px 0',
  borderBottom: `1px solid ${theme.palette.gray[200]}`
}));
