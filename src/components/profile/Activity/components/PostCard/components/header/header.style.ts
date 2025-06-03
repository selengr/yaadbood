import { Box, styled, Typography } from '@mui/material';

export const ContainerStyled = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  padding-bottom: 8px;
`;

export const UsernameStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray[600],
  fontWeight: 400,
  fontSize: '12px'
}));

export const TimeStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray[500],
  fontWeight: 325,
  fontSize: '12px'
}));
