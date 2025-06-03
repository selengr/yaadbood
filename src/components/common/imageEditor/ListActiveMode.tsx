import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import ActiveImageSide from './ActiveImageSide';
import { type PhotoEditorImage } from './ImageEditorModal';
import SortableImage from './SortableImage';

const ListActiveMode = ({
  images,
  activeImage,
  setActiveEditMode,
  setActiveImage,
  handleUpload,
  handleDelete,
  setImages
}: {
  images: PhotoEditorImage[];
  activeImage: PhotoEditorImage | null;
  setActiveImage: Dispatch<SetStateAction<PhotoEditorImage | null>>;
  setActiveEditMode: Dispatch<React.SetStateAction<'list' | 'alt' | 'edit' | 'tag'>>;
  handleUpload: (files: FileList | null) => void;
  handleDelete: () => void;
  setImages: Dispatch<React.SetStateAction<PhotoEditorImage[]>>;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );
  const duplicateCurrentImg = () => {
    if (activeImage) {
      const newImage = { ...activeImage, id: `${activeImage.id}-${Date.now()}` };
      setImages([...images, newImage]);
    }
  };
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      setImages(arrayMove(images, oldIndex, newIndex));
    }
  };

  return (
    <>
      {/* Left Panel */}
      <ActiveImageSide activeImage={activeImage} setActiveEditMode={setActiveEditMode} />

      {/* Right Panel */}
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
        <Typography fontSize={14} color='gray' gutterBottom>
          1 of {images.length}
        </Typography>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <Box
              sx={{
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: '60vh',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: { xs: 1, sm: 2 }
              }}>
              {images.map((img, imgIdx) => (
                <SortableImage
                  key={img.id}
                  img={img}
                  imgIdx={imgIdx}
                  activeImage={activeImage}
                  setActiveImage={setActiveImage}
                  setImages={setImages}
                  images={images}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', gap: 2 }}>
          <IconButton onClick={duplicateCurrentImg} sx={{ opacity: '50%' }}>
            <Image src='/icons/photo-editing/paste.svg' width={20} height={20} alt='paste image icon' />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Image src='/icons/photo-editing/delete.svg' width={20} height={20} alt='delete image icon' />
          </IconButton>
          <IconButton disabled={images?.length > 20} component='label'>
            <Image src='/icons/photo-editing/add.svg' width={28} height={28} alt='add image icon' />
            <input
              accept='image/jpeg, image/png'
              type='file'
              multiple
              hidden
              onChange={(e) => handleUpload(e.target.files)}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default ListActiveMode;
