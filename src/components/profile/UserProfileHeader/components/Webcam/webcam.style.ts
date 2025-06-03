import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { Button } from '@/components/atoms';

export const WebcamControlsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-top: 16px;
`;

export const CaptureButton = styled(Button)`
  margin-left: auto;
`;

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.gray['700'],
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));