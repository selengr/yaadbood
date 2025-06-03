// @mu
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { DotPulse } from '@/components/atoms';

export const StyledLoadingContainer = styled(Box)({
  padding: '20px',
  display: 'flex',
  justifyContent: 'center'
});

export const StyledDotPulse = styled(DotPulse)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&::before': {
    color: theme.palette.primary.main
  },
  '&::after': {
    color: theme.palette.primary.main
  }
}));