import { Box, IconButton, Slider, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

import getCroppedImg from '@/utils/cropImage';

import Button from '../../atoms/Button/Button';
import { type PhotoEditorImage } from './ImageEditorModal';
import RotateRightIcon from '@/components/atoms/Icon/icons/RotateRightIcon';

const EditActiveMode = ({
  activeImage,
  setActiveEditMode,
  setActiveImage,
  setImages
}: {
  activeImage: PhotoEditorImage | null;
  setActiveEditMode: Dispatch<SetStateAction<'list' | 'alt' | 'edit' | 'tag'>>;
  setActiveImage: Dispatch<SetStateAction<PhotoEditorImage | null>>;
  setImages: Dispatch<SetStateAction<PhotoEditorImage[]>>;
}) => {
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
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(1);

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
    const flippedRotation = rotation + straighten;
    const flippedImage =
      croppedAreaPixels &&
      activeImage?.src &&
      (await getCroppedImg(URL.createObjectURL(activeImage?.src), croppedAreaPixels, flippedRotation, flip));

    if (flippedImage) {
      if (activeImage) {
        const response = await fetch(flippedImage);
        const blob = await response.blob();
        const updatedActiveImage = { ...activeImage, src: blob };
        setActiveImage(updatedActiveImage);

        setImages((prevImages) =>
          prevImages.map((image) => (image.id === activeImage.id ? { ...image, src: blob } : image))
        );
      }
      setActiveEditMode('list');
      handleReset();
    }
  }, [
    activeImage,
    croppedAreaPixels,
    rotation,
    setActiveEditMode,
    setActiveImage,
    setImages,
    straighten,
    flip
  ]);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setStraighten(0);
    setFlip({ horizontal: false, vertical: false });
    setAspectRatio(1);
  };

  return (
    <>
      {/* Photo Preview */}
      <Box
        sx={{
          flex: { xs: 1, sm: 2 },
          position: 'relative',
          aspectRatio: '1'
        }}>
        <Cropper
          image={activeImage?.src && URL.createObjectURL(activeImage?.src)}
          crop={crop}
          zoom={zoom}
          rotation={rotation + straighten}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          cropShape='rect'
          showGrid={false}
          style={{
            containerStyle: {
              transform: `scaleX(${flip.horizontal ? -1 : 1}) scaleY(${flip.vertical ? -1 : 1})`
            }
          }}
        />
      </Box>

      {/* Controls */}
      <Box
        sx={{
          flex: 1,
          padding: 2,
          backgroundColor: 'neutrals.content',
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
        <Button
          onClick={() => setActiveEditMode('list')}
          color='gray.500'
          variant='text'
          sx={{
            fontWeight: '400',
            alignSelf: 'start',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 0
          }}>
          <Image src='/icons/photo-editing/arrow-left.svg' width={20} height={20} alt='arrow left' /> Edit
        </Button>

        {/* Rotate & Flip Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <IconButton onClick={() => setRotation((prev) => prev - 90)}>
            <RotateRightIcon width={20} height={20}/>
          </IconButton>
          <IconButton
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
          <IconButton onClick={() => setFlip((prev) => ({ ...prev, horizontal: !prev.horizontal }))}>
            <Image
              src={`/icons/photo-editing/flip-horizontal.svg`}
              width={20}
              height={20}
              alt='flip horizontal icon'
            />
          </IconButton>
          <IconButton onClick={() => setFlip((prev) => ({ ...prev, vertical: !prev.vertical }))}>
            <Image
              src={`/icons/photo-editing/flip-vertical.svg`}
              width={20}
              height={20}
              alt='flip vertical icon'
            />
          </IconButton>
        </Box>

        {/* Aspect Ratio Selection */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[
            { label: 'Original', value: undefined },
            { label: 'Square', value: 1 },
            { label: '4:1', value: 4 / 1 },
            { label: '3:4', value: 3 / 4 },
            { label: '16:9', value: 16 / 9 }
          ].map(({ label, value }) => (
            <Button
              key={label}
              variant={aspectRatio === value ? 'contained' : 'outlined'}
              color={aspectRatio === value ? 'gray.900' : 'gray.500'}
              onClick={() => setAspectRatio(value)}
              sx={{
                borderRadius: 20,
                padding: '2px 12px',
                fontSize: '14px',
                minHeight: '32px',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
              {label}
            </Button>
          ))}
        </Box>

        {/* Zoom Slider */}
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ color: 'gray.400', fontSize: '14px' }}>Zoom</Typography>
          <Slider
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

        {/* Update Button */}
        <Button
          variant='contained'
          onClick={handleSave}
          pill
          sx={{
            textTransform: 'capitalize',
            fontWeight: '500',
            fontSize: '12px',
            padding: '4px 12px',
            lineHeight: '16px',
            minHeight: '32px',
            height: '32px',
            mt: 'auto',
            alignSelf: 'stretch'
          }}>
          Apply
        </Button>
      </Box>
    </>
  );
};

export default EditActiveMode;
