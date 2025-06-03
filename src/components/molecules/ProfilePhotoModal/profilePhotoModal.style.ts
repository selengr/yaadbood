import { styled } from '@mui/material/styles';
import { Box, Typography, Divider } from '@mui/material';
// components
import { Button } from '@/components/atoms';

export const StyledModalContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100dvh - 72px)',
    '@media (min-width: 768px)': {
      height: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      width: '768px',
    },
  }));

export const StyledAvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: 'auto',
  padding: '20px 36px',
  position: 'relative',
  marginBottom: 'auto',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    paddingBottom: '40px',
  }
}));

export const StyledActionButtonsContainer = styled(Box)(({ theme }) => ({
    gap: 3,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      borderTop: '1px solid #4F5A703D',
    }
  }));  

export const StyledActionButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  padding: '8px 10px',
  borderRadius: '8px',
  alignItems: 'center',
  flexDirection: 'column',
  '&:hover': { background: '#4F5A703D' },
  [theme.breakpoints.up('md')]: {
    paddingTop: '18px',
  }
}));

export const StyledButtonText = styled(Typography)`
    color: white;
    font-size: 18px;
    margin-top: 8px;
    font-weight: 400;
`;

export const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  borderColor: '#4F5A703D',
}));

