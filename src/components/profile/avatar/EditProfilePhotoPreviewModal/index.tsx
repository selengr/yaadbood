import { Avatar, Box, Divider, Typography } from '@mui/material';
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import useUploadImage from '@/hooks/user/useUploadImage';
import Confirmation from '@/components/atoms/Confirmation';
import { useUpdateProfile } from '@/hooks/user/useUpdateProfile';


import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import CameraIcon from '@/components/atoms/Icon/icons/CameraIcon';
import { useAppDispatch } from '@/hooks/util/redux.hooks';
import { closeEditModal, openEditModal,setProfilePhoto } from '@/redux/slices/profilePhotoSlice';
import EditProfilePhotoModal from '../../../molecules/PhotoEditingModal';
import FirstPhotoCameraEnabled from '@/components/profile/avatar/FirstPhotoCameraEnabled';

const EditProfilePhotoPreviewModal = ({
  addFirstPhotoModal,
  setAddFirstPhotoModal
}: {
  addFirstPhotoModal: boolean;
  setAddFirstPhotoModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraAccessDenied, setCameraAccessDenied] = useState(false);
  const [discardModal, setDiscardModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  // const [profilePhoto, setProfilePhoto] = useState<string | undefined>(undefined);

  const dispatch = useAppDispatch();
  
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
      setAddFirstPhotoModal(false);
      setEditModal(false);
      setProfilePhoto('');
    }
  });

  const { uploadImage } = useUploadImage({
    onSuccess: (data: any) => {
      // Split the string into individual JSON objects
      const parts = data.split(/data:\s*/).filter(Boolean); // Split on "data: " and remove empty entries

      parts.forEach((part: string, index: number) => {
        try {
          const parsedPart = JSON.parse(part.trim());

          // Process only if the part contains a URL
          if (parsedPart?.url) {
            updateUserInfo.mutate({ profilePhoto: parsedPart.url });
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
      const reader = new FileReader();
      reader.onloadend = () => {
        // setProfilePhoto(reader.result as string);
        dispatch(setProfilePhoto(reader.result as string));
      };
      reader.readAsDataURL(e.target.files[0]);
      // setEditModal(true);
      dispatch(openEditModal())
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
    } else {
      // eslint-disable-next-line no-console
      console.error('Failed to create a file from croppedImage');
    }
  };

  return (
    <>
      <Modal
        open={false}
        onClose={() => {
          setAddFirstPhotoModal(false);
          setCameraEnabled(false);
          setCameraAccessDenied(false);
        }}
        title='Add photo'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            width: { xs: '100%', md: '744px' }
          }}>
          {cameraAccessDenied ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Divider sx={{ width: '100%', borderColor: { xs: 'transparent', md: 'gray.200' } }} />
              <Typography
                sx={{
                  color: 'gray.900',
                  fontSize: '24px',
                  fontWeight: 500,
                  textAlign: 'center',
                  marginTop: '16px'
                }}>
                On no! Your camera is blocked
              </Typography>
              <CameraIcon width={48} height={48}/>
              <Typography
                sx={{
                  color: 'gray.500',
                  fontSize: '16px',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                In order to take a photo, you must allow LinkedIn to access your camera from within your
                browser’s settings, or upload a photo from your computer.
              </Typography>

              <Divider sx={{ width: '100%', borderColor: { xs: 'transparent', md: 'gray.200' } }} />
              <Box sx={{ display: 'flex', alignSelf: 'end', gap: 1 }}>
                <Button
                  onClick={enableCamera}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    minHeight: '32px',
                    height: '32px',
                    fontSize: '12px',
                    fontWeight: '600',
                    '&:disabled': {
                      color: 'gray.700',
                      borderColor: 'gray.300',
                      backgroundColor: 'gray.300',
                      opacity: 0.5,
                      px: 1.5
                    }
                  }}
                  disabled
                  color='primary.main'
                  variant='outlined'
                  pill>
                  Use camera
                </Button>
                <Button
                  pill
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ minHeight: '32px', height: '32px', fontSize: '12px', fontWeight: '600', px: 1.5 }}>
                  Upload photo
                </Button>
                <input
                  type='file'
                  accept='image/jpeg, image/png'
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  multiple={false}
                  onChange={onUploadImg}
                />
              </Box>
              <input
                type='file'
                id='fileInput'
                accept='image/jpeg, image/png'
                style={{ display: 'none' }}
                disabled
              />
            </Box>
          ) : cameraEnabled ? (
            <FirstPhotoCameraEnabled
              setCameraEnabled={setCameraEnabled}
              setEditModal={setEditModal}
              setProfilePhoto={setProfilePhoto}
            />
          ) : (
            <>
              <Divider sx={{ width: '100%', borderColor: { xs: 'transparent', md: 'gray.200' } }} />
              <Typography
                sx={(theme) => ({
                  color: theme.palette.gray['900'],
                  fontWeight: 600,
                  fontSize: { xs: '16px', md: '24px' },
                  textAlign: 'center'
                })}>
                No professional headshot needed! <br /> Just something that represents you.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{ width: { xs: '31px', md: '56px' }, height: { xs: '31px', md: '56px' } }}
                  src={'/images/profile/Avatar1.png'}
                />
                <Avatar
                  sx={{ width: { xs: '50px', md: '88px' }, height: { xs: '50px', md: '88px' } }}
                  src={'/images/profile/Avatar2.png'}
                />
                <Avatar
                  sx={{ width: { xs: '60px', md: '106px' }, height: { xs: '60px', md: '106px' } }}
                  src={'/images/profile/Avatar3.png'}
                />
                <Avatar
                  sx={{ width: { xs: '50px', md: '88px' }, height: { xs: '50px', md: '88px' } }}
                  src={'/images/profile/Avatar4.png'}
                />
                <Avatar
                  sx={{ width: { xs: '31px', md: '56px' }, height: { xs: '31px', md: '56px' } }}
                  src={'/images/profile/Avatar5.png'}
                />
              </Box>
              <Typography
                sx={(theme) => ({
                  color: theme.palette.gray['500'],
                  fontWeight: 400,
                  fontSize: { xs: '14px', md: '16px' },
                  textAlign: 'center',
                  maxWidth: '500px'
                })}>
                On Tradido, we require members to use their real identities, so take or upload a photo of
                yourself. Then crop, filter, and adjust it to perfection.
              </Typography>
              <Divider sx={{ width: '100%', borderColor: { xs: 'transparent', md: 'gray.200' } }} />
              <Box sx={{ display: 'flex', alignSelf: { xs: 'stretch', md: 'end' }, gap: 1 }}>
                <Button
                  onClick={enableCamera}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    minHeight: '32px',
                    height: '32px',
                    fontSize: '12px',
                    fontWeight: '600',
                    px: 1.5,
                    width: { xs: '50%', md: 'auto' }
                  }}
                  color='primary.main'
                  variant='outlined'
                  pill>
                  Use camera
                </Button>
                <Button
                  pill
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    minHeight: '32px',
                    height: '32px',
                    fontSize: '12px',
                    fontWeight: '600',
                    px: 1.5,
                    width: { xs: '50%', md: 'auto' }
                  }}>
                  Upload photo
                </Button>
                <input
                  type='file'
                  accept='image/jpeg, image/png'
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  multiple={false}
                  onChange={onUploadImg}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
      <EditProfilePhotoModal
        open={editModal && addFirstPhotoModal}
        // photo={profilePhoto || ''}
        // onCancel={() => setDiscardModal(true)}
        isLoading={false}
        handleSave={handleSaveEditedPhoto}
        handleCancel={()=>dispatch(closeEditModal())}
        cropShape='round'
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
    </>
  );
};

export default EditProfilePhotoPreviewModal;
