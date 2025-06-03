'use client';

import { Box } from '@mui/material';
import React, { useState } from 'react';

import Avatar from '@/components/atoms/Avatar';

import PreviewPhotoModal from '../PreviewPhotoModal';

const UserAvatarPhoto = ({ profilePhoto }: { profilePhoto: string | undefined }) => {
  const [avatarModal, setAvatarModal] = useState(true);

  return (
    <>
      <PreviewPhotoModal title='Profile photo' previewModal={avatarModal} setPreviewModal={setAvatarModal}>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '768px',
              lg: '744px'
            },
            height: { xs: 'calc(100dvh - 80px)', md: 'auto' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red'
          }}>
          <Avatar width={'276px'} height={'276px'} image={profilePhoto} />
        </Box>
      </PreviewPhotoModal>
      <Box
        onClick={() => setAvatarModal(true)}
        sx={{
          mt: { xs: '-45px', md: '-105px' },
          mb: { xs: '-70px', md: '-30px' },
          position: 'relative',
          borderRadius: '100%',
          overflow: 'hidden',
          border: '4px solid',
          borderColor: 'neutrals.content',
          width: { xs: '120px', md: '136px' },
          height: { xs: '120px', md: '136px' },
          cursor: 'pointer'
        }}>
        <Avatar width={'100%'} height={'100%'} image={profilePhoto} />
      </Box>
    </>
  );
};

export default UserAvatarPhoto;
