'use client';

import { Box, FormLabel, Typography } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { useUpdateProfile } from '@/hooks/user/useUpdateProfile';
import useUploadImage from '@/hooks/user/useUploadImage';

import Button from '../../atoms/Button/Button';
import Confirmation from '../../atoms/Confirmation';
import Modal from '../../atoms/Modal/Modal';
import MobileBackgroundEditingModal from '../avatar/MobileBackgroundEditingModal';

const UserBackgroundMobile = ({
  backgroundPhoto,
  openModal,
  setOpenModal
}: {
  backgroundPhoto: string | undefined;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
}) => {
  const [editModal, setEditModal] = useState(false);
  const [discardModal, setDiscardModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const updateUserInfo = useUpdateProfile({
    onSuccess: async () => {
      setDeleteModal(false);
      setDeleteModal(false);
    }
  });

  const { uploadImage, isPending: uploadImagePending } = useUploadImage({
    onSuccess: (data: any) => {
      // Split the string into individual JSON objects
      const parts = data.split(/data:\s*/).filter(Boolean); // Split on "data: " and remove empty entries

      parts.forEach((part: string, index: number) => {
        try {
          const parsedPart = JSON.parse(part.trim());

          // Process only if the part contains a URL
          if (parsedPart?.url) {
            updateUserInfo.mutate({ backgroundPhoto: parsedPart.url });
            setDeleteModal(false);
            setDeleteModal(false);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Failed to parse part ${index + 1}:`, error, part);
        }
      });
    }
  });

  const onUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      uploadImage(formData);
    }
  };
  const handleSaveEditedPhoto = async (photo: Blob | string) => {
    const response = await fetch(photo as string);
    const blob = await response.blob();
    const file = new File([blob], 'croppedImage.png', { type: blob.type });

    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);
      uploadImage(formdata);
      setEditModal(false);
    } else {
      // eslint-disable-next-line no-console
      console.error('Failed to create a file from croppedImage');
    }
  };

  return (
    <>
      <Modal
        open={openModal && !editModal}
        onClose={() => setOpenModal(false)}
        title='Background Photo'
        backgroundColor='black'
        fullScreenOnMobile>
        <Box
          sx={{
            width: { xs: '100%', md: '768px' },
            height: { xs: 'calc(100dvh - 72px)', lg: 'auto' },
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Box
            sx={{
              width: '100%',
              my: 'auto',
              aspectRatio: 375 / 93,
              position: 'relative',
              overflow: 'hidden'
            }}>
            <Image
              alt='cover'
              src={backgroundPhoto || '/imgs/cover-place-holder.png'}
              fill
              sizes='100vw'
              width={0}
              height={0}
              objectFit='cover'
            />
            {uploadImagePending || updateUserInfo?.isPending ? (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  p: '16px',
                  gap: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }}>
                <Box
                  sx={{
                    p: 0,
                    m: 0,
                    animation: 'spin 1s linear infinite',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '32px',
                    height: '32px'
                  }}>
                  <Image src={'/icons/white-loading.svg'} width={32} height={32} alt='loading svg' />
                </Box>
                <Typography sx={{ color: 'neutrals.content', fontSize: '12px', fontWeight: '500' }}>
                  Saving...
                </Typography>
              </Box>
            ) : null}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: { md: '1px solid #4F5A703D' },
              mt: '20px',
              mb: { md: '-20px' },
              mr: { md: '-20px' },
              ml: { md: '-20px' },
              pt: '8px',
              px: '16px',
              gap: 3
            }}>
            <Button
              variant='text'
              disabled={
                backgroundPhoto === '/imgs/cover-place-holder.png' ||
                uploadImagePending ||
                updateUserInfo?.isPending
              }
              onClick={() => setEditModal(true)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px 10px',
                borderRadius: '8px',
                '&:hover': { background: '#4F5A703D' }
              }}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M21.13 2.86006C20.5706 2.31934 19.823 2.01709 19.045 2.01709C18.267 2.01709 17.5194 2.31934 16.96 2.86006L3.96 15.8601L2 22.0001L8.19 20.0001L21.13 7.00006C21.6678 6.44114 21.9682 5.69567 21.9682 4.92006C21.9682 4.14445 21.6678 3.39898 21.13 2.84006V2.86006ZM6.77 18.5701L5.42 17.2301L16.64 6.00006L18 7.35006L6.77 18.5701Z'
                  fill='#1DA1F3'
                />
              </svg>
              <Typography sx={{ color: 'white', fontSize: '18px', mt: 1 }}>Edit</Typography>
            </Button>
            <input
              id='background-upload'
              type='file'
              accept='image/jpeg, image/png'
              style={{ display: 'none' }}
              multiple={false}
              onChange={onUploadImg}
            />
            <FormLabel
              htmlFor='background-upload'
              disabled={uploadImagePending || updateUserInfo?.isPending}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px 10px',
                borderRadius: '8px',
                mr: { lg: 'auto' },
                '&:hover': { background: '#4F5A703D' }
              }}>
              <Image src={'/images/profile/linkedInCamera.svg'} width={24} height={24} alt='camera icon' />
              <Typography sx={{ color: 'white', fontSize: '18px', mt: 1 }}>Add photo</Typography>
            </FormLabel>
            <Button
              variant='text'
              disabled={
                backgroundPhoto === '/imgs/cover-place-holder.png' ||
                uploadImagePending ||
                updateUserInfo?.isPending
              }
              onClick={() => setDeleteModal(true)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 10px',
                borderRadius: '8px',
                '&:hover': { background: '#4F5A703D' },
                cursor: 'pointer'
              }}>
              <Image src={'/images/profile/linkedInTrash.svg'} width={24} height={24} alt='delete icon' />
              <Typography sx={{ color: 'white', fontSize: '18px', mt: 1 }}>Delete</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
      <MobileBackgroundEditingModal
        open={editModal}
        photo={backgroundPhoto || ''}
        onSave={handleSaveEditedPhoto}
        onCancel={() => setDiscardModal(true)}
        cropShape='rect'
      />
      <Confirmation
        open={discardModal}
        title='Discard Changes'
        description='Are you sure you want to discard the changes you made?'
        submitText='Discard'
        cancelText='No, thanks'
        handleClose={() => setDiscardModal(false)}
        handleSubmit={() => {
          setEditModal(false);
          setDiscardModal(false);
        }}
        confirmBtnColor='red.500'
        cancelBtnColor='gray.900'
      />
      <Confirmation
        open={deleteModal}
        title='Delete Background Photo'
        description='Are you sure? Having a background picture helps other recognize you.'
        submitText='Delete'
        cancelText='Cancel'
        handleClose={() => setDeleteModal(false)}
        handleSubmit={() => updateUserInfo.mutate({ backgroundPhoto: '' })}
        loading={updateUserInfo?.isPending}
        confirmBtnColor='red.500'
        cancelBtnColor='gray.900'
      />
    </>
  );
};

export default UserBackgroundMobile;
