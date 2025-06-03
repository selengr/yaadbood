import { Stack, styled } from '@mui/material';

export const BorderedCard = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.gray[200]}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1),
  paddingInline: theme.spacing(2)
}));
