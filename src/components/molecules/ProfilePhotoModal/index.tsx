  'use client';
// React & Libs
import { useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
// utils
import { validateFile } from '@/utils';
// hooks
import { useUpdateProfile, useUploadImage } from '@/hooks/user';
// components
import { ChangePhotoModal } from '@/components/profile';
import { ConfirmDialog, LoadingOverlay, PhotoEditingModal } from '@/components/molecules';
import { Avatar, Modal, LinkedInTrashIcon, LinkedInEditIcon, LinkedInCameraIcon } from '@/components/atoms';
// style
import {
  StyledDivider,
  StyledButtonText,
  StyledModalContent,
  StyledActionButton,
  StyledAvatarContainer,
  StyledActionButtonsContainer
} from './profilePhotoModal.style';
// constants
import { PROFILE } from '@/constants';

interface IProps {
  open: boolean;
  fullname?: string;
  profilePhoto: string;
  onClose: VoidFunction;
}

const ProfilePhotoModal: React.FC<IProps> = ({ profilePhoto, fullname, open, onClose }) => {
  const { DESCRIPTION, DELETE_PHOTO_TITLE } = PROFILE.CONFIRM_DIALOG;
  const { PROFILE_PHOTO, ADD_PHOTO, EDIT, DELETE } = PROFILE.PROFILE_PHOTO;

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [changePhotoModal, setChangePhotoModal] = useState<boolean>(false);

  const updateUserInfo = useUpdateProfile({
    onSuccess: async () => {
      onClose();
      setOpenEdit(false);
      setOpenConfirm(false);
    }
  });

  const { uploadImage, isPending: uploadImagePending } = useUploadImage({
    onSuccess: (data: any) => {
      const parts = data.split(/data:\s*/).filter(Boolean); // Split on "data: " and remove empty entries
      parts.forEach((part: string, index: number) => {
        try {
          const parsedPart = JSON.parse(part.trim());
          if (parsedPart?.url) {
            updateUserInfo.mutate({ profilePhoto: parsedPart.url });
            onClose();
            setOpenEdit(false);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Failed to parse part ${index + 1}:`, error, part);
        }
      });
    }
  });

  const toggleConfirm = () => {
    setOpenConfirm((prev) => !prev);
  };

  const toggleEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  const toggleChangePhoto = () => {
    setChangePhotoModal((prev) => !prev);
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

  const handleDeletePhoto = async () => {
    updateUserInfo.mutate({ profilePhoto: '' });
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title={PROFILE_PHOTO} backgroundColor='black' fullScreenOnMobile>
        <StyledModalContent>
          <StyledAvatarContainer>
            <Avatar width={276} height={276} image={profilePhoto} />
            {uploadImagePending && <LoadingOverlay />}
          </StyledAvatarContainer>

          <StyledDivider />
          <StyledActionButtonsContainer>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <StyledActionButton
                variant='text'
                onClick={toggleEdit}
                disabled={!profilePhoto || uploadImagePending}>
                <LinkedInEditIcon />
                <StyledButtonText>{EDIT}</StyledButtonText>
              </StyledActionButton>

              <StyledActionButton variant='text' disabled={uploadImagePending} onClick={toggleChangePhoto}>
                <LinkedInCameraIcon />
                <StyledButtonText>{ADD_PHOTO}</StyledButtonText>
              </StyledActionButton>
            </Box>

            <StyledActionButton
              variant='text'
              onClick={toggleConfirm}
              disabled={!profilePhoto || uploadImagePending}>
              <LinkedInTrashIcon />
              <StyledButtonText>{DELETE}</StyledButtonText>
            </StyledActionButton>
          </StyledActionButtonsContainer>
        </StyledModalContent>
      </Modal>

      <PhotoEditingModal
        open={openEdit}
        handleCancel={toggleEdit}
        profilePhoto={profilePhoto}
        isLoading={uploadImagePending}
        handleSave={handleSaveEditedPhoto}
      />

      <ConfirmDialog
        isLoading={updateUserInfo.isPending}
        open={openConfirm}
        onClose={toggleConfirm}
        description={DESCRIPTION}
        title={DELETE_PHOTO_TITLE}
        handleSubmit={handleDeletePhoto}
      />

      <ChangePhotoModal
        fullname={fullname}
        open={changePhotoModal}
        uploadImage={uploadImage}
        profilePhoto={profilePhoto}
        onClose={toggleChangePhoto}
      />
    </>
  );
};

export default ProfilePhotoModal;
