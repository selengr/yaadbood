import { Box, FormLabel, Typography } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { IUploadedFile } from '@/networks/user/types';

import Avatar from '../../atoms/Avatar';
import Modal from '../../atoms/Modal/Modal';
import CameraModal from './CameraModal';

const AddPhotoModal = ({
  profilePhoto,
  fullname,
  addPhotoModal,
  setAddPhotoModal,
  uploadImage
}: {
  profilePhoto: string | undefined;
  fullname: string;
  addPhotoModal: boolean;
  setAddPhotoModal: Dispatch<SetStateAction<boolean>>;
  uploadImage: UseMutateFunction<IUploadedFile, ApiError, FormData, unknown>;
}) => {
  const onUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      uploadImage(formData);
      setAddPhotoModal(false);
    }
  };

  return (
    <Modal open={addPhotoModal} onClose={() => setAddPhotoModal(false)} title='Add photo'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px', width: { xs: '100%', md: '644px' } }}>
        <Typography
          sx={(theme) => ({
            color: theme.palette.gray['700'],
            fontWeight: 600,
            fontSize: '24px',
            textAlign: 'center'
          })}>
          {fullname}, help others recognize you!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar width={128} height={128} image={profilePhoto} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <CameraModal uploadImage={uploadImage} setAddPhotoModal={setAddPhotoModal} />
          <FormLabel
            htmlFor='file-upload'
            sx={{
              borderRadius: 9999,
              backgroundColor: 'primary.500',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'neutrals.content',
              cursor: 'pointer',
              height: '32px',
              minHeight: '32px',
              px: '12px',
              fontWeight: 600,
              fontSize: '12px'
            }}>
            Upload photo
          </FormLabel>
          <input
            id='file-upload'
            type='file'
            accept='image/jpeg, image/png'
            style={{ display: 'none' }}
            multiple={false}
            onChange={onUploadImg}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPhotoModal;
