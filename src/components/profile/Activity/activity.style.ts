import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { DotPulse } from '@/components/atoms';

export const StyledSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutrals['content'],
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px',
  borderRadius: '6px'
}));

export const StyledLoaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
`;
export const StyledNotDataFound = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  padding-top: 40px;
`;

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.gray[700],
  fontSize: '20px',
  paddingBottom: '8px',
  variant: 'h5'
}));

export const StyledDotPulse = styled(DotPulse)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&::before': {
      color: theme.palette.primary.main
    },
    '&::after': {
      color: theme.palette.primary.main
    }
  }));