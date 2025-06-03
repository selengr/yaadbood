import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { Button } from '@/components/atoms';

export const StyledModalContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop : "24px",
  paddingBottom : "32px",
  flexDirection: 'column',
  justifyContent : 'center',
  gap: '4px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '624px'
  }
}));

export const StyledTitleText = styled(Typography)(({ theme }) => ({
  maxWidth: '70%',
  fontSize: '24px',
  textAlign: 'center',
  color: theme.palette.gray['700'],
}));

export const StyledSubtitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 325,
  fontSize: '14px',
  textAlign: 'center',
  color: theme.palette.gray['500'],
}));

export const StyledButton = styled(Button)`
  height : 32px;
  max-height : 32px;
  min-height : 32px;
`;
export const StyledButtonContainer = styled(Box)`
  margin : 12px;
  display: flex;
  justify-content: end;
`;

export const HiddenFileInput = styled('input')`
  display: none;
`;