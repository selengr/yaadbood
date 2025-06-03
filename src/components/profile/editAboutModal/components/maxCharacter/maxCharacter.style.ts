import { Box, styled, Typography } from '@mui/material';

export const MaxCharacterContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 2px;
`;

export const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 400,
  color: theme.palette.gray['400']
}));
