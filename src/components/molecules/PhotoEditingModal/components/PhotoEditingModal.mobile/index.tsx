"use client"
// React & libs
import Box from '@mui/material/Box';
import Cropper from 'react-easy-crop';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

// utils
import getCroppedImg from '@/utils/cropImage';
// constants
import { PROFILE } from '@/constants';
// components
import { CloseIcon, RotateRightIcon } from '@/components/atoms';
// tyeps
import {
  ICropState,
  ICroppedAreaPixelsState,
  IPhotoEditingModalProps
} from '../../components';
// style
import {
  StyledTitle,
  StyledSlider,
  StyledDrawer,
  StyledHeader,
  StyledContainer,
  StyledCropperBox,
  StyledSaveButton,
  StyledSliderLabel,
  StyledCloseButton,
  StyledPhotoPreview,
  StyledRotateButton,
  StyledControlsContainer,
} from './PhotoEditingModal.mobile.style';

const PhotoEditingModalMobile: React.FC<IPhotoEditingModalProps> = ({
  open,
  isLoading,
  handleSave,
  handleCancel,
  profilePhoto = '',
  cropShape = 'round'
}) => {
  const { STRAIGHTEN, SAVE, CROP_PHOTO} = PROFILE.AVATAR.EDIT;

  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [straighten, setStraighten] = useState<number>(0);
  const [crop, setCrop] = useState<ICropState>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<ICroppedAreaPixelsState | null>(null);

  const onCropComplete = (
    _: any,
    croppedAreaPixels: React.SetStateAction<{ x: number; y: number; width: number; height: number } | null>
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSavePhoto = async () => {
    const croppedImage =
      croppedAreaPixels && (await getCroppedImg(profilePhoto, croppedAreaPixels, rotation + straighten));
    if (croppedImage) {
      handleSave(croppedImage);
    }
  };

  const handleStraighten = (_: unknown, value: number | number[]) => {
    const straightValue = Array.isArray(value) ? value[0] : value;
    setStraighten(straightValue);
  };

  const handleRotation = () => {
    setRotation((prev) => prev + 90);
  };

  return (
    <StyledDrawer
      open={open}
      anchor='bottom'
      onClose={handleCancel}
      onOpen={() => {}}
      sx={{ display: { xs: 'block', md: 'none' } }}>
      <StyledContainer>
        <StyledHeader>
          <StyledCloseButton onClick={handleCancel}>
            <CloseIcon />
          </StyledCloseButton>
          <StyledTitle>{CROP_PHOTO}</StyledTitle>
          <StyledSaveButton disabled={isLoading} onClick={handleSavePhoto} color='#fff' variant='text'>
            {SAVE}
          </StyledSaveButton>
        </StyledHeader>
        {/* Photo Preview */}
        <StyledPhotoPreview>
          <StyledCropperBox>
            <Cropper
              image={profilePhoto}
              crop={crop}
              zoom={zoom}
              rotation={rotation + straighten}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape={cropShape}
              showGrid={false}
            />
          </StyledCropperBox>
        </StyledPhotoPreview>
        {/* Controls */}
        <StyledControlsContainer>
          {/* Straighten Slider */}
          <Box sx={{ width: '100%' }}>
            <StyledSliderLabel>
              <Typography sx={{ color: '#fff', fontSize: '12px' }}>
                {STRAIGHTEN}
              </Typography>
              <Typography sx={{ color: '#fff', fontSize: '12px' }}>{straighten}</Typography>
            </StyledSliderLabel>
            <StyledSlider
            
              disabled={isLoading}
              value={straighten}
              min={-45}
              max={45}
              step={1}
              onChange={handleStraighten}
              aria-label='Straighten'
            />
          </Box>
          <StyledRotateButton disabled={isLoading} onClick={handleRotation}>
            <RotateRightIcon />
          </StyledRotateButton>
        </StyledControlsContainer>
      </StyledContainer>
    </StyledDrawer>
  );
};

export default PhotoEditingModalMobile;
