import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Slider from '@mui/material/Slider';
import { Theme } from '@mui/material/styles';
import { SwipeableDrawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

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
  display: flex;
  padding: 16px;
  align-items: center;
`;

export const StyledCloseButton = styled(IconButton)(({ theme }:{theme :Theme}) => ({
  padding: '2px',
  '& svg': {
    width: '20px',
    height: '20px',
    stroke:  theme.palette.neutrals.content,
  },
}));

export const StyledTitle = styled(Typography)(({ theme  }:{theme :Theme}) => ({
  fontWeight: 600,
  fontSize: '18px',
  marginRight: 'auto',
  color: theme.palette.neutrals.content,
}));

export const StyledPhotoPreview = styled(Box)`
  margin: 16px;
  aspect-ratio: 1;
  position: relative;
  @media (min-width: 600px) {
    flex: 2;
  }
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

export const StyledSlider = styled(Slider)(({ theme  }:{theme :Theme}) => ({
  height: '2px',
  padding: '13px 0 !important',
  '.MuiSlider-thumb': {
    width: '16px',
    height: '16px',
    border: '1px solid white',
    backgroundColor:  theme.palette.green.main,
    boxShadow: 'none',
  },
  '.MuiSlider-track' : {
    backgroundColor: theme.palette.green[500],
    height: '2px',
    border: 'none',
  },
  '.MuiSlider-rail' : {
    opacity: 1,
    height: '2px',
    backgroundColor: '#13161',
  },
  '.MuiSlider-valueLabel' : {
    borderRadius: '6px',
    backgroundColor: theme.palette.grey[900],
  }
}));

export const StyledRotateButton = styled(IconButton)(({ theme  }:{theme :Theme}) => ({
  padding: 0,
  'svg' : {
    width: '20px',
    height: '20px',
    fill: theme.palette.neutrals.content
  }
}));