'use client';
// React & libs
import { uniqueId } from 'lodash-es';
import { toast } from 'react-toastify';
import React, { ChangeEvent, useRef, useState } from 'react';
// utils
import { validateFile } from '@/utils';
//hooks
import { useUploadImage, useUpdateProfile } from '@/hooks/user';
// components
import { Modal } from '@/components/atoms';
import PhotoEditingModal from '../PhotoEditingModal';
import { CameraAccessDenied, WebcamCapture } from '@/components/profile';
import StyledAvatar, { type AvatarConfig } from './components/StyledAvatar';

// style
import {
  StyledDivider,
  StyledModalContainer,
  StyledTitleTypography,
  StyledAvatarsContainer,
  StyledResponsiveButton,
  StyledBottomActionsBox,
  StyledDescriptionTypography
} from './addProfilePhotoModal.style';
//constants
import { PROFILE } from '@/constants';

interface IProps {
  open: boolean;
  onClose: VoidFunction;
}

const avatarConfigs: AvatarConfig[] = [
  { size: 'small', src: '/images/profile/Avatar1.png' },
  { size: 'medium', src: '/images/profile/Avatar2.png' },
  { size: 'large', src: '/images/profile/Avatar3.png' },
  { size: 'medium', src: '/images/profile/Avatar4.png' },
  { size: 'small', src: '/images/profile/Avatar5.png' }
];

const AddProfilePhotoModal: React.FC<IProps> = ({ open, onClose }) => {
  const { TITLE, SUB_TITLE_ONE, SUB_TITLE_TWO, DESCRIPTION, USE_PROFILE, UPLOAD_PHOTO } = PROFILE.ADD_PROFILE;

  const [editModal, setEditModal] = useState<boolean>(false);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [cameraAccessDenied, setCameraAccessDenied] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const enableCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraEnabled(true);
      setCameraAccessDenied(false);
    } catch (error) {
      setCameraAccessDenied(true);
    }
  };

  const updateUserInfo = useUpdateProfile({
    onSuccess: async () => {
      onClose();
      setEditModal(false);
      setProfilePhoto('');
    }
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const { uploadImage, isPending: uploadImagePending } = useUploadImage({
    onSuccess: (data: any) => {
      const parts = data.split(/data:\s*/).filter(Boolean); // Split on "data: " and remove empty entries

      parts.forEach((part: string, index: number) => {
        try {
          const parsedPart = JSON.parse(part.trim());
          if (parsedPart?.url) {
            updateUserInfo.mutate({ profilePhoto: parsedPart.url });
            onClose();
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
      const file = e.target.files[0];

      const validation = validateFile(file);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
      setEditModal(true);
    }
  };

  const handleSaveEditedPhoto = async (photo: Blob | string) => {
    const response = await fetch(photo as string);
    const blob = await response.blob();

    const validation = validateFile(blob);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    const file = new File([blob], 'croppedImage.png', { type: blob.type });

    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);
      uploadImage(formdata);
    } else {
      // eslint-disable-next-line no-console
      console.error('Failed to create a file from croppedImage');
    }
  };

  const toggleEdit = () => {
    setEditModal((prev) => !prev);
  };

  const closeModal = () => {
    onClose();
    setCameraEnabled(false);
    setCameraAccessDenied(false);
  };

  return (
    <>
      <Modal open={open} onClose={closeModal} title={TITLE}>
        <StyledModalContainer>
          {cameraAccessDenied && <CameraAccessDenied enableCamera={enableCamera} onUploadImg={onUploadImg} />}

          {cameraEnabled && (
            <WebcamCapture
              setEditModal={setEditModal}
              setProfilePhoto={setProfilePhoto}
              setCameraEnabled={setCameraEnabled}
            />
          )}

          {!cameraAccessDenied && !cameraEnabled && (
            <>
              <StyledDivider />

              <StyledTitleTypography>
                {SUB_TITLE_ONE} <br /> {SUB_TITLE_TWO}
              </StyledTitleTypography>
              <StyledAvatarsContainer>
                {avatarConfigs?.map((config) => (
                  <StyledAvatar key={uniqueId()} size={config.size} src={config.src} />
                ))}
              </StyledAvatarsContainer>
              <StyledDescriptionTypography>{DESCRIPTION}</StyledDescriptionTypography>

              <StyledDivider />

              <StyledBottomActionsBox>
                <StyledResponsiveButton
                  pill
                  variant='outlined'
                  color='primary.main'
                  sx={{ borderColor: '#1DA1F3' }}
                  onClick={enableCamera}>
                  {USE_PROFILE}
                </StyledResponsiveButton>
                <StyledResponsiveButton pill sx={{ color: '#fff' }} onClick={handleUploadClick}>
                  {UPLOAD_PHOTO}
                </StyledResponsiveButton>
                <input
                  type='file'
                  multiple={false}
                  ref={fileInputRef}
                  onChange={onUploadImg}
                  style={{ display: 'none' }}
                  accept='image/jpeg, image/png, image/gif'
                />
              </StyledBottomActionsBox>
            </>
          )}
        </StyledModalContainer>
      </Modal>

      <PhotoEditingModal
        open={editModal}
        isLoading={uploadImagePending}
        profilePhoto={profilePhoto}
        handleSave={handleSaveEditedPhoto}
        handleCancel={toggleEdit}
      />
    </>
  );
};

export default AddProfilePhotoModal;
