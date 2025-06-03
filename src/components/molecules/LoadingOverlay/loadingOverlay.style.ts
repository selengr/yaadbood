import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLoadingOverlay = styled(Box)`
  top: 50%;
  left: 50%;
  gap: 16px;
  z-index: 10;
  display: flex;
  padding: 16px;
  position: absolute;
  border-radius: 12px;
  align-items: center;
  width: 77px;
  height: 90px;
  flex-direction: column;
  justify-content: center;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
`;

export const StyledLoadingSpinner = styled(Box)`
  p: 0;
  m: 0;
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

export const StyledLoadingText = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.neutrals.content};
`;