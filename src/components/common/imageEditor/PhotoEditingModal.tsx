import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useIsMutating } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';

import Modal from '@/components/atoms/Modal/Modal';
import getCroppedImg from '@/utils/cropImage';
import Button from '../../atoms/Button/Button';
import RotateRightIcon from '@/components/atoms/Icon/icons/RotateRightIcon';
import RotateLeftIcon from '@/components/atoms/Icon/icons/RotateLeftIcon';

export interface PhotoEditingModalProps {
  open: boolean;
  photo: string;
  onSave: (editedPhoto: Blob | string) => void;
  onCancel: () => void;
  cropShape?: 'rect' | 'round';
}

const PhotoEditingModal: React.FC<PhotoEditingModalProps> = ({
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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);
  // Use React Query's useIsMutating to check if the specified mutations are active
  const isUploadingImage = useIsMutating({ mutationKey: ['uploadImageMutation'] });
  const isMutatingUserData = useIsMutating({ mutationKey: ['mutateUserData'] });

  // Disable the save button if any of the specified mutations are active
  const isMutating = isUploadingImage > 0 || isMutatingUserData > 0;

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
      onSave(croppedImage); // Pass the cropped image Blob to the onSave callback
    }
  }, [croppedAreaPixels, onSave, photo, rotation, straighten]);

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
    <Modal open={open} onClose={() => (isMutating || isSaving ? undefined : onCancel())} title='Edit photo'>
      <Box
        sx={{
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, sm: 4 },
          width: { xs: '100%',  md: '744px' }
        }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', gap: 2 }}>
          {/* Photo Preview */}
          <Box sx={{ flex: { xs: undefined, sm: 2 }, position: 'relative', aspectRatio: '1' }}>
            <Cropper
              image={photo}
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
          </Box>

          {/* Controls */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 0, sm: 4 },
              padding: { xs: 1, sm: 4 },
              alignItems: 'start'
            }}>
            {/* Rotate Buttons */}
            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
              <IconButton
                disabled={isMutating || isSaving}
                sx={{ padding: 0 }}
                onClick={() => setRotation((prev) => prev - 90)}>
                <RotateLeftIcon width={20} height={20} />
              </IconButton>
              <IconButton
                disabled={isMutating || isSaving}
                sx={(theme) => ({
                  padding: 0,
                  svg: {
                    width: '20px',
                    height: '20px',
                    fill: theme.palette.gray[600]
                  }
                })}
                onClick={() => setRotation((prev) => prev + 90)}>
                <RotateRightIcon />
              </IconButton>
            </Box>

            {/* Zoom Slider */}
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: 'gray.400', fontSize: '14px' }}>Zoom</Typography>
              <Slider
                disabled={isMutating || isSaving}
                valueLabelDisplay='auto'
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(_, value) => setZoom(value as number)}
                aria-label='Zoom'
                sx={{
                  height: 6,
                  padding: '13px 0 !important',
                  '& .MuiSlider-thumb': {
                    height: 16,
                    width: 16,
                    border: '1px solid white',
                    backgroundColor: 'primary.main',
                    boxShadow: 'none'
                  },
                  '& .MuiSlider-track': {
                    height: 4
                  },
                  '& .MuiSlider-rail': {
                    height: 6,
                    backgroundColor: 'gray.200',
                    opacity: 1
                  },
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: 'gray.900',
                    borderRadius: '6px'
                  }
                }}
              />
            </Box>

            {/* Straighten Slider */}
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: 'gray.400', fontSize: '14px' }}>Straighten</Typography>
              <Slider
                disabled={isMutating || isSaving}
                valueLabelDisplay='auto'
                value={straighten}
                min={-45}
                max={45}
                step={1}
                onChange={(_, value) => setStraighten(value as number)}
                aria-label='Straighten'
                sx={{
                  height: 6,
                  padding: '13px 0 !important',
                  '& .MuiSlider-thumb': {
                    height: 16,
                    width: 16,
                    border: '1px solid white',
                    backgroundColor: 'primary.main',
                    boxShadow: 'none'
                  },
                  '& .MuiSlider-track': {
                    height: 4
                  },
                  '& .MuiSlider-rail': {
                    height: 6,
                    backgroundColor: 'gray.200',
                    opacity: 1
                  },
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: 'gray.900',
                    borderRadius: '6px'
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
        <Button
          disabled={isMutating || isSaving}
          variant='contained'
          onClick={handleSave}
          pill
          sx={{
            textTransform: 'capitalize',
            fontWeight: '600',
            padding: '8px 16px',
            alignSelf: 'end',
            minWidth: '100px'
          }}>
          {isMutating || isSaving ? 'Saving...' : 'Save photo'}
        </Button>
      </Box>
    </Modal>
  );
};

export default PhotoEditingModal;
