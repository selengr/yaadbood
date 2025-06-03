"use client"
import { useRef } from 'react';
// constants
import { PROFILE } from '@/constants';
// style
import {
    ErrorTitle,
    ErrorMessage,
    CameraButton,
    UploadButton,
    StyledDivider,
    HiddenFileInput,
    ActionButtonsContainer,
    CameraBlockedContainer,
  } from './cameraAccessDenied.style';
  // components
import { CameraIcon } from '@/components/atoms';



  interface IProps {
    enableCamera: () => void;
    onUploadImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const CameraAccessDenied = ({ enableCamera, onUploadImg }: IProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { CAMERA_ACCESS, USE_PROFILE, UPLOAD_PHOTO, CAMERA_BLOCKED } = PROFILE.ADD_PROFILE;

    const handleUpload = () => {
        fileInputRef.current?.click()
    }

  return (
    <CameraBlockedContainer>
    <StyledDivider />
    
    <ErrorTitle>{CAMERA_BLOCKED}</ErrorTitle>
    
    <CameraIcon width={48} height={48} />
    
    <ErrorMessage>{CAMERA_ACCESS} </ErrorMessage>
    
    <StyledDivider />
    
    <ActionButtonsContainer>
      <CameraButton
        onClick={enableCamera}
        disabled
        variant="outlined"
        pill
      >
        {USE_PROFILE}
      </CameraButton>
      
      <UploadButton
        pill
        variant="contained"
        onClick={handleUpload}
      >{UPLOAD_PHOTO}</UploadButton>
      
      <HiddenFileInput
        type="file"
        accept='image/jpeg, image/png, image/gif'
        ref={fileInputRef}
        multiple={false}
        onChange={onUploadImg}
      />
    </ActionButtonsContainer>
  </CameraBlockedContainer>
  );
};

export default CameraAccessDenied;
