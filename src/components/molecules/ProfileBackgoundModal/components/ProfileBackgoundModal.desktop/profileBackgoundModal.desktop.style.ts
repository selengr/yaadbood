import { Button } from '@/components/atoms';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Slider, IconButton } from '@mui/material';

export const StyledModalContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    width: '720px',
  },
}));

export const StyledCropperContainer = styled(Box)`
  width: 100%;
  overflow: hidden;
  max-height: 328px;
  position: relative;
  aspect-ratio: 800 / 420; 
  background-color: black;
`;

export const StyledRotationControls = styled(Box)`
  display: flex;
  margin-top: 32px;
`;

export const StyledControlsContainer = styled(Box)(({ theme }) => ({
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    gap: '40px',
    flexDirection: 'row'
  },
}));

export const StyledControlGroup = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  marginTop: '8px',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    marginTop: '32px',
  },
}));

export const StyledControlLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  marginLeft: '8px',
  color: theme.palette.gray['400']
}));

export const StyledSliderContainer = styled(Box)`
  gap: 4px;
  display: flex;
  align-content: center;
`;

export const StyledSlider = styled(Slider)`
  height: 6px;
  margin: 2px;
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

export const StyledPlusButton = styled(IconButton)(({ theme }) => ({
  svg: {
    width: '20px',
    height: '20px',
    stroke: theme.palette.gray[900]
  }
}));

export const StyledActionButtonsContainer = styled(Box)({
  display: 'flex',
  marginTop : "64px",
  justifyContent: 'space-between',
  paddingY: { xs: '8px', sm: '24px' },
});



export const StyledSaveButtonsContainer = styled(Box)(({ theme }) => ({
  gap: '10px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

export const StyledDeleteButton = styled(Button)(({ theme }) =>  [
    {
        height: '32px',
        fontWeight: 500,
        fontSize: '12px',
        color: '#475569',
        alignSelf: 'end',
        minHeight: '32px',
    },
    theme.applyStyles('dark', {
        color: theme.palette.gray['400'],
    }),
  ]);

export const StyledSaveButton = styled(Button)`
  height: 32px;
  font-size: 12px;
  font-weight: 500;
  min-height: 32px;
`;