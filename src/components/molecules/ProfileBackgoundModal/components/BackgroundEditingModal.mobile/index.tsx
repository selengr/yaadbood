// React & libs
import Cropper from 'react-easy-crop';
import React, { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
// utils
import getCroppedImg from '@/utils/cropImage';
// components
import { RotateRightIcon } from '@/components/atoms';
import { SliderComponent } from '../IOSSliderComponent';
// style
import {
  StyledButton,
  StyledHeader,
  StyledFooter,
  StyledContainer,
  StyledTypography,
  StyledDrawerPaper,
  StyledPhotoPreview,
  StyledRotateButton,
  StyledControlButtons,
  StyledControlButtonWithTheme,
} from './backgroundEditingModal.mobile.style';
// constants  
import { PROFILE } from '@/constants';
import { IBackgroundEditingModalProps, TControlTypeState, ICroppedAreaPixelsState } from '../types';

const BackgroundEditingModalMobile: React.FC<IBackgroundEditingModalProps> = ({
  open,
  onClose,
  handleUpload,
  backgroundPhoto,
  cropShape = 'rect'
}) => {
  const { DONE, CANCEL, CROP, ZOOM, ROTATE } = PROFILE.EDIT_BACKGROUND;
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [straighten, setStraighten] = useState<number>(0);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeControl, setActiveControl] = useState<TControlTypeState>('zoom');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | ICroppedAreaPixelsState>(null);

  const onCropComplete = (
      _: any,
      croppedAreaPixels: React.SetStateAction<{ x: number; y: number; width: number; height: number } | null>
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }

  const handleSave = async () => {
    const croppedImage =
      croppedAreaPixels && (await getCroppedImg(backgroundPhoto, croppedAreaPixels, rotation + straighten));
    if (croppedImage) {
      handleUpload(croppedImage);
    }
  }

  const handleRotate = () => {
    setRotation((prev) => prev + 90);
  }

  const handleZoomControlClick = () => {
    setActiveControl('zoom');
  }

  const handleRotateControlClick = () => {
    setActiveControl('rotate');
  }

  const handleZoomChange = (_: Event, newValue: number | number[]) => {
    setZoom(newValue as number);
  }

  const handleStraightenChange = (_: Event, newValue: number | number[]) => {
    setStraighten(newValue as number);
  }

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, change: number) => {
    setter((prev) => Math.round((prev + change) * 10) / 10);
  };
  const handleZoomDecrease = () => handleSliderChange(setZoom, -0.1);
  const handleZoomIncrease = () => handleSliderChange(setZoom, 0.1);
  const handleStraightenDecrease = () => handleSliderChange(setStraighten, -1);
  const handleStraightenIncrease = () => handleSliderChange(setStraighten, 1);

  return (
    <SwipeableDrawer
      PaperProps={{
        component: StyledDrawerPaper,
        elevation: 0
      }}
      anchor='bottom'
      onClose={onClose}
      onOpen={() => {}}
      open={open}>
      <StyledContainer>
        <StyledHeader>
          <StyledTypography>
            {CROP}
          </StyledTypography>
          <StyledRotateButton onClick={handleRotate}>
            <RotateRightIcon />
          </StyledRotateButton>
        </StyledHeader>
        {/* Photo Preview */}
        <StyledPhotoPreview>
          <Cropper
            image={backgroundPhoto}
            crop={crop}
            zoom={zoom}
            rotation={rotation + straighten}
            aspect={800 / 170}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape={cropShape}
            showGrid={false}
          />
        </StyledPhotoPreview>
        <StyledControlButtons>
          <StyledControlButtonWithTheme
          className={activeControl === 'zoom' ? 'active' : ''}
          onClick={handleZoomControlClick}
          variant='text'
        >  {ZOOM} </StyledControlButtonWithTheme>

          <StyledControlButtonWithTheme
          className={activeControl === 'rotate' ? 'active' : ''}
          onClick={handleRotateControlClick}
          variant='text'
        >  {ROTATE}   </StyledControlButtonWithTheme>
        </StyledControlButtons>
        {activeControl === 'zoom' ? (
            <SliderComponent
              type="zoom"
              value={zoom}
              onDecrease={handleZoomDecrease}
              onIncrease={handleZoomIncrease}
              onChange={handleZoomChange}
            />
          ) : (
            <SliderComponent
              type="straighten"
              value={straighten}
              onDecrease={handleStraightenDecrease}
              onIncrease={handleStraightenIncrease}
              onChange={handleStraightenChange}
            />
          )}
        <StyledFooter>
          <StyledButton
            onClick={onClose}
            variant='text'
            color='neutrals.content'>
             {CANCEL}
          </StyledButton>
          <StyledButton
            onClick={handleSave}
            variant='text'
            color='neutrals.content'>
            {DONE}
          </StyledButton>
        </StyledFooter>
      </StyledContainer>
    </SwipeableDrawer>
  );
};
 export default BackgroundEditingModalMobile;