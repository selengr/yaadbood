"use client"
import { Box, Divider, Typography } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import Image from 'next/image';
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { IUploadedFile } from '@/networks/user/types';

import Button from '../../atoms/Button/Button';
import Modal from '../../atoms/Modal/Modal';
import CameraIcon from '@/components/atoms/Icon/icons/CameraIcon';
const CameraModal = ({
  uploadImage,
  setAddPhotoModal
}: {
  uploadImage: UseMutateFunction<IUploadedFile, ApiError, FormData, unknown>;
  setAddPhotoModal: (value: boolean) => void;
}) => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraAccessDenied, setCameraAccessDenied] = useState(false);

  const enableCamera = async () => {
    try {
      // Explicit user action required
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraEnabled(true);
      setCameraAccessDenied(false);
    } catch (error) {
      setCameraAccessDenied(true);
    }
  };

  const disableCamera = () => {
    setCameraEnabled(false);
    const videoTracks = webcamRef.current?.stream?.getVideoTracks();
    videoTracks?.forEach((track) => track.stop());
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const photoData = webcamRef.current.getScreenshot();
      if (photoData) {
        const file = dataURLToFile(photoData, 'photo.jpg');
        const formData = new FormData();
        formData.append('file', file);
        uploadImage(formData);
        setAddPhotoModal(false);
      }
      disableCamera();
    }
  };
  const onUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      uploadImage(formData);
      setAddPhotoModal(false);
    }
  };

  const dataURLToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
      <Button
        onClick={enableCamera}
        sx={{
          color: 'primary.main',
          borderColor: 'primary.main',
          height: '32px',
          minHeight: '32px',
          px: '12px',
          fontWeight: 600,
          fontSize: '12px'
        }}
        color='primary.main'
        variant='outlined'
        pill>
        Use camera
      </Button>

      <Modal
        open={cameraEnabled || cameraAccessDenied}
        onClose={() => {
          disableCamera();
          setCameraAccessDenied(false);
        }}
        title={cameraAccessDenied ? 'Add photo' : 'Take Photo'}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: { xs: '100%', md: '644px' }
          }}>
          {cameraAccessDenied ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Divider sx={{ width: '100%' }} />
              <Typography
                sx={{
                  color: 'gray.900',
                  fontSize: '24px',
                  fontWeight: 500,
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                Oh no! Your camera is blocked
              </Typography>
              <CameraIcon width={48} height={48}/>
              <Typography
                sx={{
                  color: 'gray.700',
                  fontSize: '16px',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                In order to take a photo, you must allow LinkedIn to access your camera from within your
                browser’s settings, or upload a photo from your computer.
              </Typography>
              <Divider sx={{ width: '100%' }} />
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
            </Box>
          ) : (
            <>
              {cameraEnabled && (
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
                    height: 'auto'
                  }}
                />
              )}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <Button onClick={disableCamera} pill variant='text' color='gray.700'>
                  Cancel
                </Button>
                <Button onClick={capturePhoto} pill sx={{ ml: 'auto' }}>
                  Upload Photo
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CameraModal;
