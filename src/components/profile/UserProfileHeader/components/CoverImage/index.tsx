'use client';

import Image from 'next/image';
import { useState } from 'react';
// components
import { Icon } from '@/components/atoms';
import { PreviewPhotoModal } from '@/components/profile';
import { ProfileBackgoundModal } from '@/components/molecules';
// style
import {
  CaptureButton,
  StyledImageContainer,
  StyledClickableBanner,
  StyledPreviewContainer
} from './coverImage.style';

interface IProps {
  userProfile: boolean;
  backgroundPhoto: string;
}

const CoverImage: React.FC<IProps> = ({ backgroundPhoto, userProfile }) => {
  const [openBackgroundModal, setOpenBackgroundModal] = useState<boolean>(false);
  const [openBackgroundEditModal, setOpenBackgroundEditModal] = useState<boolean>(false);

  const toggleBackgroundEditModal = () => {
    setOpenBackgroundEditModal((prev)=>!prev)
  }

  const openBackground = () => {
    setOpenBackgroundModal(true)
  }

  return (
    <>
      {!userProfile && (
        <CaptureButton onClick={toggleBackgroundEditModal}>
          <Icon name='capture' w={17} h={15} />
        </CaptureButton>
      )}
      <StyledClickableBanner onClick={openBackground}>
        <Image alt='cover' src={backgroundPhoto} fill sizes='100vw' width={0} height={0} objectFit='cover' />
      </StyledClickableBanner>

      <PreviewPhotoModal
        title=''
        previewModal={openBackgroundModal}
        setPreviewModal={setOpenBackgroundModal}>
        <StyledPreviewContainer>
          <StyledImageContainer>
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
          </StyledImageContainer>
        </StyledPreviewContainer>
      </PreviewPhotoModal>

      <ProfileBackgoundModal
        open={openBackgroundEditModal}
        backgroundPhoto={backgroundPhoto}
        onClose={toggleBackgroundEditModal}
      />
    </>
  );
};

export default CoverImage;
