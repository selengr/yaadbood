// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { Button } from '@/components/atoms';

// ----------------------------------------------------------------------

export const StyledModalContent = styled(Box)(({ theme }) => [
  {
    width: '100%',
    backgroundColor: '#fff',
    color: theme.palette.gray['600'],
    [theme.breakpoints.up('md')]: {
      width: 388,
    },
  },
  theme.applyStyles('dark', {
    backgroundColor: 'transparent',
    color: theme.palette.gray['300'],
  }),
]);

export const StyledContent = styled(Typography)(({ theme }) => [
  {
    lineHeight: '21px',
    fontSize: '14px',
    paddingRight: '8px',
    [theme.breakpoints.up('md')]: {
      lineHeight: '24px',
      fontSize: '16px',
    },
    color: theme.palette.gray['600'],
  },
  theme.applyStyles('dark', {
    color: theme.palette.gray['300'],
  }),
]);

export const StyledActionsContainer = styled(Box)`
  height: 64px;
  display: flex;
  margin-top: 0px;
  gap: 10px;
  justify-content: flex-end;
  align-items: end;
`;

export const StyledCancelButton = styled(Button)(({ theme }) => [
  {
    minHeight: '32px',
    height: '32px',
    color: theme.palette.gray['600'],
    '&:hover': {
      backgroundColor: theme.palette.gray['200'],
    },
  },
  theme.applyStyles('dark', {
    color: theme.palette.gray['300'],
  }),
]);

export const StyledConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.red['700']};
  min-height: 32px;
  height: 32px;
  min-width: 70px;
  &:disabled {
    background-color: ${({ theme }) => theme.palette.red['400']};
  }
`;

export const StyledLoaderContainer = styled(Box)`
  padding: 8px 16px;
`;