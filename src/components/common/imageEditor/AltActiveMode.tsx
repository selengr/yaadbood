import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import yup from '@/lib/validation/yupConfig';

import Button from '../../atoms/Button/Button';
import { type PhotoEditorImage } from './ImageEditorModal';

const altSchema = yup.object({
  alt: yup.string().required('Alt text is required.').max(1000, 'Alt text must not exceed 1000 characters.')
});

type AltFormValues = yup.InferType<typeof altSchema>;

const AltActiveMode = ({
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
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<AltFormValues>({
    resolver: yupResolver(altSchema),
    defaultValues: {
      alt: activeImage?.alt || ''
    }
  });
  const altInput = watch('alt');
  const handleUpdateAlt = (data: AltFormValues) => {
    if (activeImage) {
      const updatedActiveImage = { ...activeImage, alt: data.alt };
      setActiveImage(updatedActiveImage);

      setImages((prevImages) =>
        prevImages.map((image) => (image.id === activeImage.id ? updatedActiveImage : image))
      );
    }
    setActiveEditMode('list');
  };

  return (
    <>
      {/* Left Panel */}
      <Box
        sx={{
          flex: { xs: 1, sm: 2 },
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
        {activeImage?.src ? (
          <img
            src={URL.createObjectURL(activeImage?.src)}
            alt={activeImage?.alt || 'Selected'}
            style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '70vh' }}
          />
        ) : null}
      </Box>

      {/* Right Panel */}
      <Box
        component={'form'}
        onSubmit={handleSubmit(handleUpdateAlt)}
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
          <Image src='/icons/photo-editing/arrow-left.svg' width={20} height={20} alt='arrow left' /> Add alt
          text
        </Button>
        <Typography fontSize={14} color='gray' gutterBottom>
          Alt text describes images for people who can’t see them.
          <br />
          <br /> There may be an automatically generated description. You can edit it anytime.
        </Typography>
        {/* Alt Textarea */}
        <Box>
          {/* Custom Label */}
          <Typography fontSize={16} fontWeight='500' color='gray.700'>
            Alt Text
          </Typography>
          {/* TextField */}
          <TextField
            {...register('alt')}
            multiline
            rows={4}
            variant='outlined'
            fullWidth
            error={!!errors.alt}
            helperText={errors.alt?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          {/* Character Counter */}
          <Typography
            textAlign='right'
            fontSize={12}
            mt={0.5}
            color={altInput.length > 1000 ? 'error.main' : 'text.secondary'}>
            {`${altInput.length}/${1000}`}
          </Typography>
        </Box>
        <Button
          type='submit'
          variant='contained'
          pill
          sx={{
            textTransform: 'capitalize',
            fontWeight: '500',
            fontSize: '12px',
            padding: '4px 12px',
            lineHeight: '16px',
            minHeight: '32px',
            height: '32px',
            mt: 'auto'
          }}>
          Update
        </Button>
      </Box>
    </>
  );
};

export default AltActiveMode;
