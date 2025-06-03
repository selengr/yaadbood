'use client';
// React & Libs
import React, { ChangeEvent } from 'react';
import { ApiError } from 'next/dist/server/api-utils';
import { UseMutateFunction } from '@tanstack/react-query';
// constants
import { PROFILE } from '@/constants';
// networks
import { IUploadedFile } from '@/networks/user/types';
// components
import { Avatar, Modal } from '@/components/atoms';
import { CameraModal } from '@/components/profile';

import {
  StyledTitle,
  HiddenFileInput,
  StyledUploadLabel,
  StyledDescription,
  StyledAvatarContainer,
  StyledModalContainer,
  StyledActionsContainer
} from './changePhotoModal.style';

interface IProps {
  profilePhoto?: string;
  fullname?: string;
  open: boolean;
  onClose: () => void;

  uploadImage: UseMutateFunction<IUploadedFile, ApiError, FormData, unknown>;
}

const ChangePhotoModal = ({ fullname, uploadImage, profilePhoto, open, onClose }: IProps) => {
  const { CHANGE_PHOTO, RECOGNIZE, UPLOAD_PHOTO, IDENTITIES_PROFILE } = PROFILE.ADD_PROFILE;

  const onUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      uploadImage(formData);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={CHANGE_PHOTO}>
      <StyledModalContainer>
        <StyledTitle>
          {fullname}, {RECOGNIZE}
        </StyledTitle>

        <StyledAvatarContainer>
          <Avatar width={128} height={128} image={profilePhoto || '/images/profile/Avatar6.svg'} />
        </StyledAvatarContainer>

        <StyledDescription>{IDENTITIES_PROFILE}</StyledDescription>

        <StyledActionsContainer>
          <CameraModal uploadImage={uploadImage} setAddPhotoModal={onClose} />

          <StyledUploadLabel htmlFor='file-upload'>{UPLOAD_PHOTO}</StyledUploadLabel>

          <HiddenFileInput
            id='file-upload'
            type='file'
            accept='image/jpeg, image/png'
            multiple={false}
            onChange={onUploadImg}
          />
        </StyledActionsContainer>
      </StyledModalContainer>
    </Modal>
  );
};

export default ChangePhotoModal;
