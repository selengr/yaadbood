"use client"
import Webcam from 'react-webcam';
import { Dispatch, SetStateAction, useRef } from 'react';
// constants
import { PROFILE } from '@/constants';

import { CancelButton, CaptureButton, WebcamControlsContainer } from './webcam.style';

interface IProps {
  setCameraEnabled: Dispatch<SetStateAction<boolean>>;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  setProfilePhoto: Dispatch<SetStateAction<string | undefined>> | any;
}
const WebcamCapture = ({ setCameraEnabled, setEditModal, setProfilePhoto }: IProps) => {
  const { CAPTURE_PHOTO, CANCEL } = PROFILE.ADD_PROFILE;

  const webcamRef = useRef<Webcam>(null);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const photoData = webcamRef.current.getScreenshot();
      if (photoData) {
        setProfilePhoto(photoData);
        setEditModal(true);
      }
      setCameraEnabled(false);
    }
  };

  const toggleCamera = () => {
    setCameraEnabled((prev) => !prev);
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        videoConstraints={{
          aspectRatio: 2 / 1,
          facingMode: 'user'
        }}
        style={{
          width: '100%',
          aspectRatio: 2 / 1,
          height: 'auto',
          backgroundColor: '#000'
        }}
      />

      <WebcamControlsContainer>
        <CancelButton onClick={toggleCamera} pill variant='text'>
          {CANCEL}
        </CancelButton>

        <CaptureButton onClick={capturePhoto} pill variant='contained'>
          {CAPTURE_PHOTO}
        </CaptureButton>
      </WebcamControlsContainer>
    </>
  );
};

export default WebcamCapture;
