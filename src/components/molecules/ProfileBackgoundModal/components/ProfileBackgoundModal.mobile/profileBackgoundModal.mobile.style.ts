import { Button } from '@/components/atoms';
// @mui
import { styled } from '@mui/material/styles';
import { Divider, Box, Typography, FormLabel } from '@mui/material';

export const StyledModalContainer = styled(Box)(({ theme }) => ({
  width:'100%',
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100dvh - 72px)',
  [theme.breakpoints.up('sm')]: {
    height : 'auto',
    width : '768px'
  },
}));

export const StyledImageContainer = styled(Box)`
  width: 100%;
  margin-top: auto;
  overflow: hidden;
  position: relative;
  margin-bottom: auto;
  aspect-ratio: 375 / 93;
`;

export const StyledLoadingOverlay = styled(Box)`
  top: 50%;
  gap: 16px;
  left: 50%;
  z-index: 10;
  display: flex;
  padding: 16px;
  position: absolute;
  border-radius: 12px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
`;

export const StyledSpinnerContainer = styled(Box)`
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const StyledActionButtonsContainer = styled(Box)(({ theme }) => ({
  gap: 3,
  display: 'flex',
  paddingX: '16px',
  paddingTop: '8px',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    marginLeft: '-20px' ,
    marginRight: '-20px' ,
    marginBottom: '-20px' ,
    borderTop: '1px solid #4F5A703D',
  },
}));

export const StyledActionButton = styled(Button)`
  display: flex;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  &:hover {
    background: #4F5A703D;
  }
`;

export const StyledFormLabel = styled(FormLabel)`
  display: flex;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  &:hover {
    background: #4F5A703D;
  }
`;

export const StyledButtonText = styled(Typography)`
  color: white;
  font-size: 18px;
  margin-top: 8px;
  font-weight: 400;
`;

export const StyledLoadingText = styled(Typography)`
font-size: 12px;
font-weight: 500;
color: neutrals.content;
`;

export const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  borderColor: '#4F5A703D',
}));
