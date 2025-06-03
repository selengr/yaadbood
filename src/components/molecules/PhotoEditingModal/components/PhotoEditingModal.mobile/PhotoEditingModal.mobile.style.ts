// @mui
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { SwipeableDrawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// components
import { Button } from '@/components/atoms';

export const StyledDrawer = styled(SwipeableDrawer)`
  .MuiPaper-root {
    padding: 0;
    boxShadow: none;
    backgroundImage: none;
    backgroundColor: transparent;
  }
`;

export const StyledContainer = styled(Box)`
  display: flex;
  border-radius: 0;
  min-height: 100dvh;
  flex-direction: column;
  background-color: black;
  justify-content: space-between;
`;

export const StyledHeader = styled(Box)`
  gap: 8px;
  padding: 16px;
  display: flex;
  paddingTop: 21px;
  align-items: center;
`;

export const StyledCloseButton = styled(IconButton)(({ theme}) => ({
  padding: '2px',
  '& svg': {
    width: '20px',
    height: '20px',
    stroke:  theme.palette.neutrals.content,
  },
}));

export const StyledTitle = styled(Typography)`
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    margin-right: auto
`;

export const StyledSaveButton = styled(Button)`
  color: "#fff";
  font-size: 14px;
  font-weight: 400;
  padding-right : 0;
`

export const StyledPhotoPreview = styled(Box)`
  margin: 16px;
  display:flex;
  position: relative;
  align-items: center;
  justify-content: center;
  @media (min-width: 600px) {
    flex: 1;
  }
`;

export const StyledCropperBox = styled(Box)`         
      width : 100%;
      height: 100vw;
      max-height: 400px;
      max-width : 400px;
`;

export const StyledControlsContainer = styled(Box)`
    gap: 16px;
    display: flex;
    padding: 12px 16px;
    align-items: center;
    border-top: 1px solid rgba(79, 90, 112, 0.24);
`;


export const StyledSliderLabel = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledSlider = styled(Slider)(({ theme }) => ({
  height: '2px',
  padding: '13px 0 !important',
  '.MuiSlider-thumb': {
    height: '16px',
    width: '16px',
    border: '1px solid white',
    backgroundColor:  theme.palette.green.main,
    boxShadow: 'none',
  },
  '.MuiSlider-track' : {
    backgroundColor: 'white',
    height: '2px',
    border: 'none',
  },
  '.MuiSlider-rail' : {
    height: '2px',
    backgroundColor: 'white',
    opacity: 1,
  },
  '.MuiSlider-valueLabel' : {
    backgroundColor: theme.palette.grey[900],
    borderRadius: '6px'
  },
  '&.MuiSlider-active' : {
    background: theme.palette.green.main,
  },
}));

export const StyledRotateButton = styled(IconButton)(({ theme  }) => ({
  padding: 0,
  color:"white",
  'svg' : {
    width: '16px',
    height: '18px',
    fill: theme.palette.common.white
  }
}));