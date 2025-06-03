// @mui
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
// components
import { Button } from '@/components/atoms';

export const StyledDrawerPaper = styled(Box)`
    padding: 0;
    box-shadow: none;
    background-image: none;
    background-color: transparent;
`;

export const StyledContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    borderRadius: 0,
    minHeight: '100dvh',
    flexDirection: 'column',
    backgroundColor: 'black',
}));

export const StyledHeader = styled(Box)(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '18px',
  margin: '0 auto',
  paddingTop : "2px",
  paddingLeft : "20px",
  color: theme.palette.neutrals.content,
}));

export const StyledSliderContainer = styled(Box)({
  gap: '12px',
  display: 'flex',
  paddingX: '8px',
  paddingTop: '12px',
  alignItems: 'center',
});

export const StyledSliderControls = styled(Box)`
  gap: 12px;
  display: flex;
  align-items: center;
`;
export const StyledSliderControlsButton = styled(Button)`
    color : #fff;
    font-size: 12px;
    font-weight: 400;
    padding-top : 0px;
    padding-bottom : 0px;
`;

export const StyledPhotoPreview = styled(Box)`
  width: 100%;
  aspect-ratio: 1;
  margin-top: auto;
  position: relative;
  margin-bottom: auto;
`;

export const StyledSliderValueContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: -12px;
  justify-content: center;
`;

export const StyledSliderValue = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    fontSize: "12px",
    color: theme.palette.green[500]
  }));

export const StyledControlButtons = styled(Box)`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  justify-content: center;
`;

export const StyledFooter = styled(Box)`
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const StyledRotateButton = styled(IconButton)`
  padding: 0;
  svg {
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
  };
`;

export const StyledSlider = styled(Slider)(({ theme }) => ({
    width: '100%',
    '& .MuiSlider-thumb': {
      width: 16,
      height: 16,
      opacity: 0,
      backgroundColor: 'white',
      border: '2px solid white',
    },
    '& .MuiSlider-rail': {
      display: 'none'
    },
    '& .MuiSlider-track': {
      display: 'none'
    },
    '& .MuiSlider-mark': {
      height: 12,
      width: '1px',
      opacity: 0.5,
      backgroundColor: theme.palette.neutrals.content,
      transition: 'background-color 0.2s, opacity 0.2s',
    },
    '& .MuiSlider-markActive': {
      backgroundColor: theme.palette.green[500]
    },
    '& .MuiSlider-valueLabel': {
      borderRadius: '6px',
      backgroundColor: theme.palette.gray[900],
    }
  }));

  export const ZoomSlider = styled(StyledSlider)({
    '& .MuiSlider-mark[data-index="0"], & .MuiSlider-mark[data-index="10"], & .MuiSlider-mark[data-index="20"], & .MuiSlider-mark[data-index="30"], & .MuiSlider-mark[data-index="40"], & .MuiSlider-mark[data-index="50"], & .MuiSlider-mark[data-index="60"]': {
        opacity: 1,
        width: '2px',
    }
  });
  
  export const RotateSlider = styled(StyledSlider)({
    '& .MuiSlider-mark[data-index="0"], & .MuiSlider-mark[data-index="10"], & .MuiSlider-mark[data-index="20"], & .MuiSlider-mark[data-index="30"], & .MuiSlider-mark[data-index="40"], & .MuiSlider-mark[data-index="50"], & .MuiSlider-mark[data-index="60"], & .MuiSlider-mark[data-index="70"], & .MuiSlider-mark[data-index="80"], & .MuiSlider-mark[data-index="90"]': {
      opacity: 1,
      width: '2px',
    }
  });

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
}));

export const StyledControlButton = styled(Button)`
  font-size: 16px;
  font-weight: 400;
  padding-left: 8px;
  padding-right: 8px;
`;

export const StyledControlButtonWithTheme = styled(StyledControlButton)(({ theme }) => ({
    color: theme.palette.gray[300],
    opacity: 20,
    '&.active': {
      opacity: 100,
      color: "#FFF"
    }
  }));
  