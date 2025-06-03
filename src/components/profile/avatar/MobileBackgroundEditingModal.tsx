import { SwipeableDrawer, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useIsMutating } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';

import getCroppedImg from '@/utils/cropImage';

import Button from '../../atoms/Button/Button';
import RotateRightIcon from '@/components/atoms/Icon/icons/RotateRightIcon';

export interface PhotoEditingModalProps {
  open: boolean;
  photo: string;
  onSave: (editedPhoto: Blob | string) => void;
  onCancel: () => void;
  cropShape?: 'rect' | 'round';
}

const MobileBackgroundEditingModal: React.FC<PhotoEditingModalProps> = ({
  open,
  photo,
  onSave,
  onCancel,
  cropShape = 'rect'
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [straighten, setStraighten] = useState(0);
  const [activeControl, setActiveControl] = useState<'zoom' | 'rotate'>('zoom');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);
  const theme = useTheme();

  const isUploadingImage = useIsMutating({ mutationKey: ['uploadImgaeMutation'] });
  const isMutatingUserData = useIsMutating({ mutationKey: ['mutateUserData'] });

  const isMutating = isUploadingImage > 0 || isMutatingUserData > 0;

  const isDefaultImage = photo === '/imgs/cover-place-holder.png';

  const onCropComplete = useCallback(
    (
      _: any,
      croppedAreaPixels: React.SetStateAction<{ x: number; y: number; width: number; height: number } | null>
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    const croppedImage =
      croppedAreaPixels && (await getCroppedImg(photo, croppedAreaPixels, rotation + straighten));
    setIsSaving(false);
    if (croppedImage) {
      onSave(croppedImage);
    }
  }, [croppedAreaPixels, onSave, photo, rotation, straighten]);

  const onClose = () => (isMutating || isSaving ? undefined : onCancel());

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setStraighten(0);
  };

  useEffect(() => {
    if (open) {
      handleReset();
    }
  }, [open]);

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          padding: 0,
          boxShadow: 'none',
          backgroundImage: 'none'
        }
      }}
      anchor='bottom'
      onClose={onClose}
      onOpen={() => {}}
      open={open}>
      <Box
        sx={{
          backgroundColor: 'black',
          borderRadius: 0,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Box sx={{ padding: '16px', display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '18px', color: 'neutrals.content', mx: 'auto' }}>
            Crop
          </Typography>
          <IconButton
            disabled={isMutating || isSaving || isDefaultImage}
            sx={{
              padding: 0,
              svg: {
                width: '20px',
                height: '20px',
                fill: theme.palette.neutrals.content
              }
            }}
            onClick={() => setRotation((prev) => prev + 90)}>
            <RotateRightIcon />
          </IconButton>
        </Box>
        {/* Photo Preview */}
        <Box
          sx={{
            my: 'auto',
            width: '100%',
            position: 'relative',
            aspectRatio: 1
          }}>
          <Cropper
            image={photo}
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
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onClick={() => setActiveControl('zoom')}
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              px: '8px',
              color: activeControl === 'zoom' ? 'neutrals.content' : 'gray.200'
            }}
            variant='text'
            color={activeControl === 'zoom' ? 'neutrals.content' : 'gray.200'}>
            Zoom
          </Button>
          <Button
            onClick={() => setActiveControl('rotate')}
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              px: '8px',
              color: activeControl === 'rotate' ? 'neutrals.content' : 'gray.200'
            }}
            variant='text'
            color={activeControl === 'rotate' ? 'neutrals.content' : 'gray.200'}>
            Rotate
          </Button>
        </Box>
        {activeControl === 'zoom' ? (
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              paddingX: '8px',
              paddingTop: '12px'
            }}>
            {/* Zoom Slider */}
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: '-12px'
                }}>
                <Typography sx={{ color: 'green.500', fontSize: '12px', fontWeight: 'medium' }}>
                  {zoom}x
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Button
                  variant='text'
                  color='neutrals.content'
                  disabled={isDefaultImage || isMutating}
                  onClick={() => setZoom((prev) => Math.round((prev - 0.1) * 10) / 10)}>
                  -
                </Button>
                <Slider
                  disabled={isMutating || isSaving}
                  value={zoom}
                  valueLabelDisplay='auto'
                  min={1}
                  max={7}
                  step={0.1}
                  marks
                  onChange={(_, newValue) => setZoom(newValue as number)}
                  sx={{
                    width: '100%',
                    '& .MuiSlider-thumb': {
                      height: 16,
                      width: 16,
                      backgroundColor: 'white',
                      border: '2px solid white',
                      opacity: 0
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
                      backgroundColor: 'neutrals.content',
                      transition: 'background-color 0.2s, opacity 0.2s',
                      opacity: 0.5
                    },
                    '& .MuiSlider-mark[data-index="0"], & .MuiSlider-mark[data-index="10"], & .MuiSlider-mark[data-index="20"], & .MuiSlider-mark[data-index="30"], & .MuiSlider-mark[data-index="40"], & .MuiSlider-mark[data-index="50"], & .MuiSlider-mark[data-index="60"]':
                      {
                        width: '2px',
                        opacity: 1
                      },
                    '& .MuiSlider-markActive': {
                      backgroundColor: 'green.500'
                    },
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: 'gray.900',
                      borderRadius: '6px'
                    }
                  }}
                />
                <Button
                  variant='text'
                  disabled={isDefaultImage || isMutating}
                  color='neutrals.content'
                  onClick={() => setZoom((prev) => Math.round((prev + 0.1) * 10) / 10)}>
                  +
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              paddingX: '8px',
              paddingTop: '12px'
            }}>
            {/* Zoom Slider */}
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: '-12px'
                }}>
                <Typography sx={{ color: 'green.500', fontSize: '12px', fontWeight: 'medium' }}>
                  {straighten}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Button
                  variant='text'
                  color='neutrals.content'
                  disabled={isDefaultImage || isMutating}
                  onClick={() => setStraighten((prev) => Math.round(prev - 1))}>
                  -
                </Button>
                <Slider
                  disabled={isMutating || isSaving}
                  value={straighten}
                  valueLabelDisplay='auto'
                  min={-45}
                  max={45}
                  step={1}
                  marks
                  onChange={(_, newValue) => setStraighten(newValue as number)}
                  sx={{
                    width: '100%',
                    '& .MuiSlider-thumb': {
                      height: 16,
                      width: 16,
                      backgroundColor: 'white',
                      border: '2px solid white',
                      opacity: 0
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
                      backgroundColor: 'neutrals.content',
                      transition: 'background-color 0.2s, opacity 0.2s',
                      opacity: 0.5
                    },
                    '& .MuiSlider-mark[data-index="0"], & .MuiSlider-mark[data-index="10"], & .MuiSlider-mark[data-index="20"], & .MuiSlider-mark[data-index="30"], & .MuiSlider-mark[data-index="40"], & .MuiSlider-mark[data-index="50"], & .MuiSlider-mark[data-index="60"], & .MuiSlider-mark[data-index="70"], & .MuiSlider-mark[data-index="80"], & .MuiSlider-mark[data-index="90"]':
                      {
                        width: '2px',
                        opacity: 1
                      },
                    '& .MuiSlider-markActive': {
                      backgroundColor: 'green.500'
                    },
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: 'gray.900',
                      borderRadius: '6px'
                    }
                  }}
                />
                <Button
                  variant='text'
                  color='neutrals.content'
                  disabled={isDefaultImage || isMutating}
                  onClick={() => setStraighten((prev) => Math.round(prev + 1))}>
                  +
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        <Box sx={{ paddingY: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            sx={{ fontSize: '16px', fontWeight: 500 }}
            disabled={isMutating || isSaving}
            onClick={onClose}
            variant='text'
            color='neutrals.content'>
            Cancel
          </Button>
          <Button
            sx={{ fontSize: '16px', fontWeight: 500 }}
            disabled={isMutating || isSaving}
            onClick={handleSave}
            variant='text'
            color='neutrals.content'>
            Done
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default MobileBackgroundEditingModal;
