"use client"
// React & libs
import Box from '@mui/material/Box';
import Cropper from 'react-easy-crop';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
// utils
import getCroppedImg from '@/utils/cropImage';
// constants
import { PROFILE } from '@/constants';
// components
import { Modal, RotateRightIcon, RotateLeftIcon } from '@/components/atoms';
// tyeps
import {
  ICropState,
  ICroppedAreaPixelsState,
  IPhotoEditingModalProps
} from '../../components';
// style
import {
  StyledSlider,
  StyledSaveButton,
  StyledCropperBox,
  StyledSliderName,
  StyledPhotoPreview,
  StyledModalContent,
  StyledCropperFixBox,
  StyledControlsContainer,
  StyledContentContainer
} from './PhotoEditingModal.desktop.style';

const PhotoEditingModalDesktop: React.FC<IPhotoEditingModalProps> = ({
  open,
  isLoading,
  handleSave,
  handleCancel,
  profilePhoto = '',
  cropShape = 'round'
}) => {
  const { TITLE, ZOOM, STRAIGHTEN, SAVING, SAVE_PHOTO } = PROFILE.AVATAR.EDIT;

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

  const handleZoom = (_: unknown, value: number | number[]) => {
    const zoomValue = Array.isArray(value) ? value[0] : value;
    setZoom(zoomValue as number);
  };

  const handleRotation = (direction: 'left' | 'right') => {
    setRotation((prev) => prev + (direction === 'left' ? -90 : 90));
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title={TITLE}
      sx={{ display: { xs: 'none', md: 'block'}} }>
      <StyledModalContent>
        <StyledContentContainer>
          {/* Photo Preview */}
          <StyledPhotoPreview>
            <StyledCropperBox>
              <StyledCropperFixBox>
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
              </StyledCropperFixBox>
            </StyledCropperBox>
          </StyledPhotoPreview>
          {/* Controls */}
          <StyledControlsContainer>
            {/* Rotate Buttons */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <IconButton disabled={isLoading} sx={{ padding: 0 }} onClick={() => handleRotation('left')}>
                <RotateLeftIcon />
              </IconButton>
              <IconButton disabled={isLoading} sx={{ padding: 0 }} onClick={() => handleRotation('right')}>
                <RotateRightIcon />
              </IconButton>
            </Box>

            {/* Zoom Slider */}
            <Box sx={{ width: '100%' }}>
              <StyledSliderName>{ZOOM}</StyledSliderName>
              <StyledSlider
                disabled={isLoading}
                valueLabelDisplay='auto'
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={handleZoom}
                aria-label='Zoom'
              />
            </Box>
            {/* Straighten Slider */}
            <Box sx={{ width: '100%' }}>
              <StyledSliderName>{STRAIGHTEN}</StyledSliderName>
              <StyledSlider
                disabled={isLoading}
                valueLabelDisplay='auto'
                value={straighten}
                min={-45}
                max={45}
                step={1}
                onChange={handleStraighten}
                aria-label='Straighten'
              />
            </Box>
          </StyledControlsContainer>
        </StyledContentContainer>
        <StyledSaveButton disabled={isLoading} variant='contained' onClick={handleSavePhoto} pill>
          {isLoading ? SAVING + '...' : SAVE_PHOTO}
        </StyledSaveButton>
      </StyledModalContent>
    </Modal>
  );
};

export default PhotoEditingModalDesktop;
