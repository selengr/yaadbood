import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { FiInfo } from 'react-icons/fi';

import { PhotoEditorImage } from './ImageEditorModal';
import EditIcon from '@/components/atoms/Icon/icons/EditIcon';

const ActiveImageSide = ({
  activeImage,
  setActiveEditMode
}: {
  activeImage: PhotoEditorImage | null;
  setActiveEditMode: Dispatch<SetStateAction<'list' | 'edit' | 'alt' | 'tag'>>;
}) => {
  return (
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
      {activeImage ? (
        <>
          <img
            src={URL.createObjectURL(activeImage.src)}
            alt={activeImage.alt || 'Selected'}
            style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '70vh' }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton onClick={() => setActiveEditMode('edit')}>
              <EditIcon/>
            </IconButton>
            <IconButton
              onClick={() => setActiveEditMode('tag')}
              sx={{
                position: 'relative'
              }}>
              {activeImage?.tags && activeImage?.tags?.length > 0 ? (
                <Typography
                  sx={{
                    pt: '2px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    fontSize: '10px',
                    lineHeight: '14px',
                    fontWeight: 500,
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    color: 'neutrals.content'
                  }}>
                  {activeImage?.tags?.length}
                </Typography>
              ) : null}
              <Image
                style={{
                  filter:
                    activeImage?.tags && activeImage?.tags?.length
                      ? 'brightness(0) saturate(100%) invert(66%) sepia(98%) saturate(4103%) hue-rotate(177deg) brightness(100%) contrast(91%)'
                      : ''
                }}
                src='/icons/photo-editing/user-add.svg'
                width={24}
                height={24}
                alt='tag image icon'
              />
            </IconButton>
            <IconButton onClick={() => setActiveEditMode('alt')} sx={{ position: 'relative' }}>
              <FiInfo style={{ position: 'absolute', top: 0, right: 0 }} size={12} />
              <Image src='/icons/photo-editing/alt.svg' width={24} height={24} alt='alt image icon' />
            </IconButton>
          </Box>
        </>
      ) : (
        <Typography>Select an image to begin editing</Typography>
      )}
    </Box>
  );
};

export default ActiveImageSide;
