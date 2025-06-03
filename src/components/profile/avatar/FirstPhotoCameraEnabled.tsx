import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useRef } from 'react';
import Webcam from 'react-webcam';

import Button from '@/components/atoms/Button/Button';

const FirstPhotoCameraEnabled = ({
  setCameraEnabled,
  setEditModal,
  setProfilePhoto
}: {
  setCameraEnabled: Dispatch<SetStateAction<boolean>>;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  setProfilePhoto: Dispatch<SetStateAction<string | undefined>> | any;
}) => {
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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
          alignSelf: 'stretch'
        }}>
        <Button onClick={() => setCameraEnabled(false)} pill variant='text' color='gray.700'>
          Cancel
        </Button>
        <Button onClick={capturePhoto} pill sx={{ ml: 'auto' }}>
          Upload Photo
        </Button>
      </Box>
    </>
  );
};

export default FirstPhotoCameraEnabled;
