'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import PreviewPhotoModal from '../PreviewPhotoModal';

const UserBackgroundPhoto = ({ backgroundPhoto }: { backgroundPhoto: string }) => {
  const [bannerModal, setBannerModal] = useState(false);
  return (
    <>
      <PreviewPhotoModal title=' ' previewModal={bannerModal} setPreviewModal={setBannerModal}>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '768px',
              lg: '1080px'
            },
            height: { xs: 'calc(100dvh - 80px)', md: 'auto' },
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'red'
          }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '800/170'
            }}>
            <Image
              width={0}
              height={0}
              fill
              alt='cover'
              src={backgroundPhoto}
              objectFit='cover'
              sizes='100vw'
              style={{ width: '100%' }}
            />
          </Box>
        </Box>
      </PreviewPhotoModal>
      <Box
        onClick={() => setBannerModal(true)}
        sx={{
          width: '100%',
          aspectRatio: { xs: '375/93', md: '800/170' },
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
        <Image alt='cover' src={backgroundPhoto} fill sizes='100vw' width={0} height={0} objectFit='cover' />
      </Box>
    </>
  );
};

export default UserBackgroundPhoto;
