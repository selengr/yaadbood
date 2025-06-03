import { styled, Typography } from '@mui/material';

export const TitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: theme.palette.gray['500']
}));
