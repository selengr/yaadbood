'use client';
// React & libs
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ChangeEvent, useState } from 'react';
// utils
import { validateFile } from '@/utils';
// hooks
import { useUploadImage, useUpdateProfile } from '@/hooks/user';
// components
import { Modal } from '@/components/atoms';
import { ConfirmDialog } from '@/components/molecules';
import BackgroundEditingModalMobile from '../BackgroundEditingModal.mobile';

// style
import {
  StyledDivider,
  StyledFormLabel,
  StyledButtonText,
  StyledLoadingText,
  StyledActionButton,
  StyledLoadingOverlay,
  StyledModalContainer,
  StyledImageContainer,
  StyledSpinnerContainer,
  StyledActionButtonsContainer
} from './profileBackgoundModal.mobile.style';
// constants
import { PROFILE } from '@/constants';
// type
import { IProfileBackgoundProps } from '../types';

const profileBackgoundModalMobile: React.FC<IProfileBackgoundProps> = ({
  open,
  onClose,
  backgroundPhoto,
}) => {
  const { BACKGROUND_PHOTO, ADD_PHOTO, EDIT, SAVING, DELETE, DELETE_DIALOG } = PROFILE.ADD_BACKGROUND;

  const [image, setImage] = useState<string>(backgroundPhoto);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openAddBackgroundModal, setOpenAddBackgroundModal] = useState<boolean>(false);
  
  
  const isDefaultImage = image === '/imgs/cover-place-holder.png';

  const { mutate, isPending } = useUpdateProfile({
    onSuccess: async () => {
      onClose();
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
            setImage(parsedPart.url);
            mutate({ backgroundPhoto: parsedPart.url });
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

      const formData = new FormData();
      const validation = validateFile(file);
      if (!validation.isValid) {
        toast.error(validation.error);
        return;
      }
    

       formData.append('file', file);
      uploadImage(formData);
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
      toggleAddBackground();
    } else {
      // eslint-disable-next-line no-console
      console.error('Failed to create a file from croppedImage');
    }
  };

  const handleSubmitConfirm = () => {
    mutate(
      { backgroundPhoto: '' },
      {
        onSuccess: () => {
          setImage('/imgs/cover-place-holder.png');
          toggleConfirm();
        }
      }
    );
  };

  const toggleConfirm = () => {
    setOpenConfirm((prev) => !prev);
  };

  const toggleAddBackground = () => {
    setOpenAddBackgroundModal((prev) => !prev);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={BACKGROUND_PHOTO}
        backgroundColor='black'
        fullScreenOnMobile
        sx={{ display: { xs: 'block', sm: 'none'}} }>
        <StyledModalContainer>
          <StyledImageContainer>
            <Image
              alt='cover'
              src={image || '/imgs/cover-place-holder.png'}
              fill
              sizes='100vw'
              width={0}
              height={0}
              objectFit='cover'
            />
            {uploadImagePending || isPending ? (
              <StyledLoadingOverlay>
                <StyledSpinnerContainer>
                  <Image src={'/icons/white-loading.svg'} width={32} height={32} alt='loading svg' />
                </StyledSpinnerContainer>
                <StyledLoadingText>
                  {SAVING}
                </StyledLoadingText>
              </StyledLoadingOverlay>
            ) : null}
          </StyledImageContainer>

          <StyledDivider />
          <StyledActionButtonsContainer>
            <StyledActionButton
              variant='text'
              onClick={toggleAddBackground}
              disabled={
                isDefaultImage ||
                uploadImagePending ||
                isPending
              }>
              <Image src={'/images/profile/linkedInEdit.svg'} width={24} height={24} alt='edit icon' />
              <StyledButtonText>{EDIT}</StyledButtonText>
            </StyledActionButton>
            <input
              id='background-upload'
              type='file'
              accept='image/jpeg, image/png, image/gif'
              style={{ display: 'none' }}
              multiple={false}
              onChange={onUploadImg}
            />
            <StyledFormLabel
              htmlFor='background-upload'
              disabled={uploadImagePending || isPending}
              >
              <Image src={'/images/profile/linkedInCamera.svg'} width={24} height={24} alt='camera icon' />
              <StyledButtonText>{ADD_PHOTO}</StyledButtonText>
            </StyledFormLabel>
            <StyledActionButton
              variant='text'
              onClick={toggleConfirm}
              disabled={isDefaultImage ||uploadImagePending ||isPending}>
              <Image src={'/images/profile/linkedInTrash.svg'} width={24} height={24} alt='delete icon' />
              <StyledButtonText>{DELETE}</StyledButtonText>
            </StyledActionButton>
          </StyledActionButtonsContainer>
        </StyledModalContainer>
      </Modal>
 

      <BackgroundEditingModalMobile
        backgroundPhoto={image}
        open={openAddBackgroundModal}
        onClose={toggleAddBackground}
        handleUpload={handleSaveEditedPhoto}
       /> 

      <ConfirmDialog
        open={openConfirm}
        isLoading={isPending}
        onClose={toggleConfirm}
        handleSubmit={handleSubmitConfirm}
        title={DELETE_DIALOG.TITLE}
        description={DELETE_DIALOG.DESCRIPTION}
      />
       
    </>
  );
};

export default profileBackgoundModalMobile;
