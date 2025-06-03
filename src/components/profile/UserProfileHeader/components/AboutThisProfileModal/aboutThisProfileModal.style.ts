// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Modal } from '@mui/material';

export const StyledModalContent = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '420px'
  }
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: '500',
  color: theme.palette.gray['700'],
  wordBreak: 'break-word',
  whiteSpace: 'wrap'
}));

export const StyledContentContainer = styled(Box)`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['700'],
  fontWeight: 600,
  fontSize: '14px'
}));

export const StyledSectionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['500'],
  fontSize: '12px',
  fontWeight: '500'
}));