import { IconButton, Box } from '@mui/material';
import {
  StyledSlider,
  StyledPlusButton,
  StyledControlGroup,
  StyledControlLabel,
  StyledSliderContainer,
  StyledRotationControls,
  StyledControlsContainer
} from  '../ProfileBackgoundModal.desktop/profileBackgoundModal.desktop.style';
import { PlusIcon, MinusIcon, RotateLeftIcon, RotateRightIcon } from '@/components/atoms';
// constants
import { PROFILE } from '@/constants';


interface ICropperControlsProps {
  zoom: number;
  straighten: number;
  onRotateLeft: () => void;
  isDefaultImage: boolean;
  uploadImagePending: boolean;
  onRotateRight: () => void;
  onZoomDecrease: () => void;
  onZoomIncrease: () => void;
  onStraightenDecrease: () => void;
  onStraightenIncrease: () => void;
  onZoomChange: (value: number) => void;
  onStraightenChange: (value: number) => void;
}

export const CropperControls = ({
    zoom,
    straighten,
    onZoomChange,
    onStraightenChange,
    onRotateLeft,
    onRotateRight,
    onZoomDecrease,
    onZoomIncrease,
    isDefaultImage,
    uploadImagePending,
    onStraightenDecrease,
    onStraightenIncrease,
}: ICropperControlsProps) => {
  const { ZOOM, STRAIGHTEN } = PROFILE.ADD_BACKGROUND;

  return (
    <Box mx={1}>
      <StyledRotationControls>
        <IconButton disabled={isDefaultImage || uploadImagePending} onClick={onRotateLeft}>
          <RotateLeftIcon />
        </IconButton>
        <IconButton disabled={isDefaultImage || uploadImagePending} onClick={onRotateRight}>
          <RotateRightIcon />
        </IconButton>
      </StyledRotationControls>
      <StyledControlsContainer>
        <StyledControlGroup>
          <StyledControlLabel>{ZOOM}</StyledControlLabel>
          <StyledSliderContainer>
            <IconButton
              disabled={isDefaultImage || uploadImagePending}
              onClick={onZoomDecrease}>
              <MinusIcon />
            </IconButton>
            <StyledSlider
              disabled={isDefaultImage || uploadImagePending}
              valueLabelDisplay='auto'
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(_, value) => onZoomChange(value as number)}
            />
            <StyledPlusButton
              disabled={isDefaultImage || uploadImagePending}
              onClick={onZoomIncrease}>
              <PlusIcon />
            </StyledPlusButton>
          </StyledSliderContainer>
        </StyledControlGroup>
        <StyledControlGroup>
          <StyledControlLabel>{STRAIGHTEN}</StyledControlLabel>
          <StyledSliderContainer>
            <IconButton
              disabled={isDefaultImage || uploadImagePending}
              onClick={onStraightenIncrease}>
              <MinusIcon/>
            </IconButton>
            <StyledSlider
              disabled={isDefaultImage || uploadImagePending}
              valueLabelDisplay='auto'
              value={straighten}
              min={-45}
              max={45}
              step={1}
              onChange={(_, value) => onStraightenChange(value as number)}
            />
            <StyledPlusButton
              disabled={isDefaultImage || uploadImagePending}
              onClick={onStraightenDecrease}>
              <PlusIcon />
            </StyledPlusButton>
          </StyledSliderContainer>
        </StyledControlGroup>
      </StyledControlsContainer>
     </Box>
  );
};
