import { arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { type PhotoEditorImage } from './ImageEditorModal';

const SortableImage = ({
  img,
  imgIdx,
  activeImage,
  setActiveImage,
  setImages,
  images
}: {
  img: PhotoEditorImage;
  imgIdx: number;
  activeImage: PhotoEditorImage | null;
  setActiveImage: Dispatch<SetStateAction<PhotoEditorImage | null>>;
  setImages: Dispatch<React.SetStateAction<PhotoEditorImage[]>>;
  images: PhotoEditorImage[];
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: img.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.5 : 1
  };

  const moveImage = (direction: 'left' | 'right') => {
    const newIndex = imgIdx + (direction === 'left' ? -1 : 1);
    if (newIndex >= 0 && newIndex < images.length) {
      setImages(arrayMove(images, imgIdx, newIndex));
    }
  };

  return (
    <Box
      onClick={() => setActiveImage(img)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {/* Parent Box for the image and arrow buttons */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          alignItems: 'center',
          backgroundColor: 'gray.100',
          borderRadius: '12px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: activeImage?.id === img.id ? 'gray.950' : 'transparent',
          cursor: 'pointer',
          // When the parent is hovered, select children with class "icon-button" and change their opacity to 1
          '&:hover .icon-button': { opacity: 1 }
        }}>
        <img
          src={URL.createObjectURL(img.src)}
          alt={img.alt || ''}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
        <IconButton
          className='icon-button' // Add a class to target later with the parent's hover
          sx={{
            opacity: 0, // hidden by default
            transition: 'opacity 0.3s',
            '&:hover': { backgroundColor: '#02061780' },
            backgroundColor: '#02061780',
            position: 'absolute',
            left: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10
          }}
          onClick={() => moveImage('left')}
          disabled={imgIdx === 0}>
          <Image src={'/icons/photo-editing/arrow-left-white.svg'} width={16} height={16} alt='left arrow' />
        </IconButton>
        <IconButton
          className='icon-button' // Add the same class here
          sx={{
            opacity: 0, // hidden by default
            transition: 'opacity 0.3s',
            '&:hover': { backgroundColor: '#02061780' },
            backgroundColor: '#02061780',
            position: 'absolute',
            right: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10
          }}
          onClick={() => moveImage('right')}
          disabled={imgIdx === images.length - 1}>
          <Image src={'/icons/photo-editing/arrow-right.svg'} width={16} height={16} alt='right arrow' />
        </IconButton>
      </Box>
      <Typography fontSize={12} color='gray' px={1}>
        {String(imgIdx + 1).padStart(2, '0')}
      </Typography>
    </Box>
  );
};

export default SortableImage;
