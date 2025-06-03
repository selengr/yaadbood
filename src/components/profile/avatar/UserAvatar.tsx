'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
//hooks
import useUploadImage from '@/hooks/user/useUploadImage';
import { useUpdateProfile } from '@/hooks/user/useUpdateProfile';
//components
import AddPhotoModal from './AddPhotoModal';
import Avatar from '@/components/atoms/Avatar';
import Confirmation from '@/components/atoms/Confirmation';
import FirstPhotoAddModal from './FirstPhotoAddModal';

// import { EditProfilePhotoPreviewModal } from '@/components/molecules/PhotoEditingModal/EditProfilePhotoPreviewModal';

//redux
import {
  openAvatarModal,
  openFirstPhotoModal,
  openEditModal,
  openAddPhotoModal,
  openDeleteModal,
  closeEditModal,
  closeDiscardModal,
  closeDeleteModal,
  closeAddPhotoModal,
  closeAvatarModal,
  setProfilePhoto,
  resetAllModals,
  setCroppedImage,
  closeFirstPhotoModal
} from '@/redux/slices/profilePhotoSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/util/redux.hooks';
import EditProfilePhotoPreviewModal from './EditProfilePhotoPreviewModal';

interface IUserAvatarProps {
  profilePhoto: string | undefined
  fullname: string
}

const UserAvatar = ({ profilePhoto, fullname }: IUserAvatarProps) => {
  const [editModal, setEditModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [discardModal, setDiscardModal] = useState(false);
  const [addPhotoModal, setAddPhotoModal] = useState(false);
  const [addFirstPhotoModal, setAddFirstPhotoModal] = useState(false);

  const dispatch = useAppDispatch();
  const { 
    isEditModalOpen,
    isAvatarModalOpen,
    isDeleteModalOpen,
    isDiscardModalOpen,
    isAddPhotoModalOpen,
    isFirstPhotoModalOpen
  } = useAppSelector(state => state.profilePhoto);
  const { croppedImage } = useAppSelector(state => state.profilePhoto);


  // const updateUserInfo = useUpdateProfile({
  //   onSuccess: async () => {
  //     setDeleteModal(false);
  //     setAddPhotoModal(false);
  //     setDeleteModal(false);
  //     setAddFirstPhotoModal(false);
  //   }
  // });
  const updateUserInfo = useUpdateProfile({
    onSuccess: async () => {
      dispatch(resetAllModals());
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
            updateUserInfo.mutate({ profilePhoto: parsedPart.url });
            // setDeleteModal(false);
            // setAddPhotoModal(false);
            // setDeleteModal(false);
            dispatch(resetAllModals());
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Failed to parse part ${index + 1}:`, error, part);
        }
      });
    }
  });

  const handleSaveEditedPhoto = async (photo: Blob | string) => {
    const response = await fetch(photo as string);
    const blob = await response.blob();
    const file = new File([blob], 'croppedImage.png', { type: blob.type });

    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);
      uploadImage(formdata);
      // setEditModal(false);
      dispatch(closeEditModal());
    } else {
      // eslint-disable-next-line no-console
      console.error('Failed to create a file from croppedImage');
    }
  };

  useEffect(() => {
    const handleCroppedImage = async () => {
      if (croppedImage) {
        const response = await fetch(croppedImage);
        const blob = await response.blob();
        const file = new File([blob], 'croppedImage.png', { type: blob.type });
  
        if (file) {
          const formdata = new FormData();
          formdata.append('file', file);
          uploadImage(formdata);
          // Clear the cropped image after processing
          dispatch(setCroppedImage(null));
        }
      }
    };
  
    handleCroppedImage();
  }, [croppedImage, dispatch, uploadImage]);

  return (
    <>
      <Box
        // onClick={() => (profilePhoto ? setAvatarModal(true) : setAddFirstPhotoModal(true))}
        onClick={() => 
          profilePhoto ? dispatch(openAvatarModal()) : dispatch(openFirstPhotoModal())
        }
        sx={{
          position: 'relative',
          mt: { xs: '-45px', md: '-105px' },
          mb: { xs: '-70px', md: '-30px' },
          borderRadius: '100%',
          overflow: 'hidden',
          border: '4px solid',
          borderColor: 'neutrals.content',
          cursor: 'pointer',
          width: { xs: '120px', md: '136px' },
          height: { xs: '120px', md: '136px' }
        }}>
        <Avatar width={'100%'} height={'100%'} image={profilePhoto} />
      </Box>

      {/* <FirstPhotoAddModal
        open={avatarModal && !editModal && !addPhotoModal}
        onClose={() => setAvatarModal(false)}
        profilePhoto={profilePhoto}
        // onEditClick={() => setEditModal(true)}
        onEditClick={() => dispatch(openEditModal())}
        onAddPhotoClick={() => setAddPhotoModal(true)}
        onDeleteClick={() => setDeleteModal(true)}
        isLoading={uploadImagePending || updateUserInfo?.isPending}
      /> */}
      
        <FirstPhotoAddModal
        open={isAvatarModalOpen && !isEditModalOpen && !isAddPhotoModalOpen}
        onClose={() => dispatch(closeAvatarModal())}
        profilePhoto={profilePhoto}
        onEditClick={() => dispatch(openEditModal())}
        onAddPhotoClick={() => dispatch(openAddPhotoModal())}
        onDeleteClick={() => dispatch(openDeleteModal())}
        isLoading={uploadImagePending || updateUserInfo?.isPending}
      />

      
      <AddPhotoModal
        addPhotoModal={addPhotoModal}
        setAddPhotoModal={setAddPhotoModal}
        uploadImage={uploadImage}
        fullname={fullname}
        profilePhoto={profilePhoto}
      />

      {/* <EditProfilePhotoPreviewModal
        setAddFirstPhotoModal={setAddFirstPhotoModal}
        addFirstPhotoModal={addFirstPhotoModal}
      /> */}

      <EditProfilePhotoPreviewModal
        setAddFirstPhotoModal={(value) => 
          value ? dispatch(openFirstPhotoModal()) : dispatch(closeFirstPhotoModal())
        }
        addFirstPhotoModal={isFirstPhotoModalOpen}
      />

      {/* <EditProfilePhotoModal
        // open={editModal}
        // photo={profilePhoto || ''}
        // onSave={handleSaveEditedPhoto}
        // onCancel={() => setDiscardModal(true)}
      /> */}

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
        title='Delete Profile Photo'
        description='Are you sure? Having a profile picture helps other recognize you.'
        submitText='Delete'
        cancelText='Cancel'
        handleClose={() => setDeleteModal(false)}
        handleSubmit={() => updateUserInfo.mutate({ profilePhoto: '' })}
        loading={updateUserInfo?.isPending}
        confirmBtnColor='red.500'
        cancelBtnColor='gray.900'
      />
    </>
  );
};

export default UserAvatar;
