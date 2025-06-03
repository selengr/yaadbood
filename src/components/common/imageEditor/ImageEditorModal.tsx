import { Box, IconButton, Modal, Typography } from '@mui/material';
import MuiButton from '@mui/material/Button';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../atoms/Button/Button';
import AltActiveMode from './AltActiveMode';
import EditActiveMode from './EditActiveMode';
import ListActiveMode from './ListActiveMode';
import TagActiveMode from './TagActiveMode';
import CloseCircleIcon from '@/components/atoms/Icon/icons/CloseCircleIcon';

export interface PhotoEditorImage {
  id: string;
  src: Blob;
  alt?: string;
  tags?: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (images: PhotoEditorImage[]) => void;
  loading?: boolean;
}

const PhotoEditorModal: React.FC<Props> = ({ open, onClose, onSave, loading = false }) => {
  const [images, setImages] = useState<PhotoEditorImage[]>([]);
  const [activeImage, setActiveImage] = useState<PhotoEditorImage | null>(null);
  const [activeEditMode, setActiveEditMode] = useState<'list' | 'edit' | 'alt' | 'tag'>('list');

  const handleUpload = async (files: FileList | null) => {
    if (files) {
      const newImages = await Promise.all(
        Array.from(files).map(async (file, index) => {
          const blob = await file.arrayBuffer();
          return {
            id: `${file.name}-${index}`,
            src: new Blob([blob])
          };
        })
      );
      setImages((prev) => [...prev, ...newImages]);
      if (!activeImage) {
        setActiveImage(newImages[0]);
      }
    }
  };

  const handleDelete = () => {
    if (activeImage) {
      const newImages = images.filter((img) => img.id !== activeImage.id);
      setImages(newImages);
      setActiveImage(newImages[0] || null);
    }
  };

  return (
    <Modal open={open} onClose={!loading ? onClose : undefined} sx={{ zIndex: 1000004 }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '1024px',
          minHeight: '80vh',
          bgcolor: 'neutrals.content',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          maxHeight: '100vh'
        }}>
        {loading ? (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1000005,
              width: '100%',
              height: '100%'
            }}
          />
        ) : null}
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} padding='12px 24px'>
          <Typography typography='h6' sx={{ fontWeight: '600' }}>
            Editor
          </Typography>
          <IconButton onClick={!loading ? onClose : undefined}>
            <CloseCircleIcon width={20} height={20}/>
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: '8px',
            backgroundColor: 'gray.100',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2
          }}>
          {images.length === 0 ? (
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignSelf={'center'}
              alignItems={'center'}
              gap={1}
              width={'100%'}>
              <Image
                src='/images/common/no-img-selected.svg'
                alt='no image selected'
                width={128}
                height={128}
              />
              <Typography component={'h5'} sx={{ fontSize: '24px', fontWeight: '500' }}>
                Select files to begin
              </Typography>
              <Typography sx={{ fontSize: '16px', color: 'gray.500', textAlign: 'center' }}>
                Share images or a single video in your post.
              </Typography>
              <MuiButton
                component='label'
                color='primary'
                variant='contained'
                sx={{
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  minHeight: '32px',
                  height: '32px',
                  padding: '8px 12px'
                }}>
                Upload from computer
                <input
                  accept='image/jpeg, image/png'
                  type='file'
                  multiple
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 20) {
                      toast.error('You can only select a maximum of 20 images.');
                    } else {
                      handleUpload(e.target.files);
                    }
                  }}
                />
              </MuiButton>
            </Box>
          ) : activeEditMode === 'list' ? (
            <ListActiveMode
              images={images}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              setActiveEditMode={setActiveEditMode}
              handleUpload={handleUpload}
              handleDelete={handleDelete}
              setImages={setImages}
            />
          ) : activeEditMode === 'alt' ? (
            <AltActiveMode
              activeImage={activeImage}
              setActiveEditMode={setActiveEditMode}
              setImages={setImages}
              setActiveImage={setActiveImage}
            />
          ) : activeEditMode === 'tag' ? (
            <TagActiveMode
              activeImage={activeImage}
              setActiveEditMode={setActiveEditMode}
              setImages={setImages}
              setActiveImage={setActiveImage}
            />
          ) : (
            <EditActiveMode
              activeImage={activeImage}
              setActiveEditMode={setActiveEditMode}
              setImages={setImages}
              setActiveImage={setActiveImage}
            />
          )}
        </Box>
        {/* Modal action buttons */}
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, justifyContent: 'end', padding: '12px 24px' }}>
          {activeEditMode === 'list' ? (
            <Button
              variant='contained'
              onClick={() => onSave(images)}
              pill
              disabled={images.length === 0 || loading}
              sx={{
                textTransform: 'capitalize',
                fontWeight: '600',
                padding: '4px 12px',
                lineHeight: '16px',
                minHeight: '32px',
                height: '32px',
                ':disabled': {
                  backgroundColor: 'gray.300',
                  color: 'gray.700'
                }
              }}>
              Next
            </Button>
          ) : (
            <Box sx={{ height: '32px' }} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PhotoEditorModal;
