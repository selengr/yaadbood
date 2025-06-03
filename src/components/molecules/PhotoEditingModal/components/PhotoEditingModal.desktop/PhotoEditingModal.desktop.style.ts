
// @mui
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button } from '@/components/atoms';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const StyledModalContent = styled(Box)`
    gap: 16px;
    width: 100%;
    display: flex;
    border-radius: 8px;
    flex-direction: column;
  @media (min-width: 600px) {
    gap: 32px;
    width: 744px;
  }
`;

export const StyledContentContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const StyledPhotoPreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  // position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'light' ? '#E6F4FF' : '#2A415E',
  [theme.breakpoints.up('sm')]: {
    flex: 2,
  },
}));

export const StyledCropperBox = styled(Box)`
    height: 100vw;
    display:flex;
    width : 100%;
    max-height: 512px;
    align-items: center;
    justify-content: center;
`;

export const StyledCropperFixBox = styled(Box)`
    width : 100%;
    height: 255px;
    position: relative;
`;

export const StyledControlsContainer = styled(Box)`
  flex: 1;
  gap: 6px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 600px) {
    gap: 32px;
    padding: 32px;
  }
`;

export const StyledSliderName = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 14px;
`;

export const StyledSlider = styled(Slider)`
  height: 6px;
  padding: 2px 0 !important;
  .MuiSlider-thumb {
    height: 20px;
    width: 20px;
    border: 2px solid white;
    background-color: #1976d2;
    box-shadow: -2px 0px 8px 0px #4755693D;
  }
  .MuiSlider-track {
    height: 4px;
  }
  .MuiSlider-rail {
    height: 6px;
    opacity: 1;
    background-color: #E0E0E0;
  }
  .MuiSlider-valueLabel {
    border-radius: 6px;
    background-color: #212121;
  }
`;

export const StyledSaveButton = styled(Button)`
  height: 32px;
  font-size: 12px;
  min-height: 32px;
  max-height: 32px;
  font-weight: 500;
  min-width: 87px;
  align-self: flex-end;
  text-transform: capitalize;
`;