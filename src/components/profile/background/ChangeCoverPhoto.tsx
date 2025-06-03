import { Box, IconButton, Slider, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';

import Button from '@/components/atoms/Button/Button';
import { useUpdateProfile } from '@/hooks/user/useUpdateProfile';
import useUploadImage from '@/hooks/user/useUploadImage';
import getCroppedImg from '@/utils/cropImage';

import Confirmation from '../../atoms/Confirmation';

import Modal from '../../atoms/Modal/Modal';
import RotateLeftIcon from '@/components/atoms/Icon/icons/RotateLeftIcon';
import RotateRightIcon from '@/components/atoms/Icon/icons/RotateRightIcon';
import MinusIcon from '@/components/atoms/Icon/icons/MinusIcon';
import PlusIcon from '@/components/atoms/Icon/icons/PlusIcon';

const ChangeCoverPhoto = ({
  backgroundPhoto,
  editModal,
  setEditModal
}: {
  backgroundPhoto: string;
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [straighten, setStraighten] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);
  const [discardModal, setDiscardModal] = useState(false);
  const [image, setImage] = useState(backgroundPhoto);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addPhotoModal, setAddPhotoModal] = useState(false);
  const isDefaultImage = image === '/imgs/cover-place-holder.png';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateUserInfo = useUpdateProfile({
    onSuccess: async () => {
      setEditModal(false);
      handleReset();
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
            updateUserInfo.mutate({ backgroundPhoto: parsedPart.url });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Failed to parse part ${index + 1}:`, error, part);
        }
      });
    }
  });

  const onCropComplete = useCallback(
    (
      _: any,
      croppedAreaPixels: React.SetStateAction<{ x: number; y: number; width: number; height: number } | null>
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSave = useCallback(async () => {
    const croppedImage =
      croppedAreaPixels && (await getCroppedImg(image, croppedAreaPixels, rotation + straighten));

    if (croppedImage) {
      const response = await fetch(croppedImage);
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
    }
  }, [croppedAreaPixels, image, rotation, straighten, uploadImage]);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setStraighten(0);
  };

  return (
    <>
      <Modal
        open={editModal && !addPhotoModal}
        onClose={() => {
          if (
            backgroundPhoto === image &&
            crop.x === 0 &&
            crop.y === 0 &&
            zoom === 1 &&
            rotation === 0 &&
            straighten === 0
          ) {
            handleReset();
            setEditModal(false);
            setDiscardModal(false);
          } else {
            setDiscardModal(true);
          }
        }}
        title='Background photo'>
        <Box>
          <Box sx={{ width: { xs: '100%', md: '624px' }, position: 'relative' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '800/420',
                overflow: 'hidden',
                backgroundColor: 'black'
              }}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                rotation={rotation + straighten}
                aspect={800 / 170}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape='rect'
                showGrid={false}
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', mt: { xs: '8px', sm: '32px' } }}>
                <IconButton
                  disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
                  onClick={() => setRotation((prev) => prev - 90)}>
                  <RotateLeftIcon />
                </IconButton>
                <IconButton
                  disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
                  onClick={() => setRotation((prev) => prev + 90)}>
                  <RotateRightIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  gap: { xs: '12px', sm: '55px' }
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: { xs: '8px', sm: '32px' },
                    width: '100%'
                  }}>
                  <Typography sx={(theme) => ({ text: '14px', color: theme.palette.gray['400'] })}>
                    Zoom
                  </Typography>
                  <Box sx={{ display: 'flex', alignContent: 'center', gap: '10px' }}>
                    <IconButton
                      disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
                      onClick={() => setZoom((prev) => Math.round((prev - 0.1) * 10) / 10)}>
                      <MinusIcon />
                    </IconButton>
                    <Slider
                      disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
                      valueLabelDisplay='auto'
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(_, value) => setZoom(value as number)}
                      sx={{
                        height: 6,
                        mt: '2px',
                        padding: '13px 0 !important',
                        '& .MuiSlider-thumb': {
                          height: 16,
                          width: 16,
                          border: '1px solid white',
                          backgroundColor: 'primary.main',
                          boxShadow: 'none'
                        },
                        '& .MuiSlider-track': {
                          height: 4
                        },
                        '& .MuiSlider-rail': {
                          height: 6,
                          backgroundColor: 'gray.200',
                          opacity: 1
                        },
                        '& .MuiSlider-valueLabel': {
                          backgroundColor: 'gray.900',
                          borderRadius: '6px'
                        }
                      }}
                    />
                    <IconButton
                      disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
                      sx={(theme) => ({
                        svg: {
                          width: '20px',
                          height: '20px',
                          stroke: theme.palette.gray[900]
                        }
                      })}
                      onClick={() => setZoom((prev) => Math.round((prev + 0.1) * 10) / 10)}>
                      <PlusIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: { xs: '8px', sm: '32px' },
                    width: '100%'
                  }}>
                  <Typography sx={(theme) => ({ text: '14px', color: theme.palette.gray['400'] })}>
                    Straighten
                  </Typography>
                  <Box sx={{ display: 'flex', alignContent: 'center', gap: '10px' }}>
                    <IconButton
                      disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
                      onClick={() => setStraighten((prev) => Math.round((prev - 0.1) * 10) / 10)}>
                      <MinusIcon />
                    </IconButton>
                    <Slider
                      disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
                      valueLabelDisplay='auto'
                      value={straighten}
                      min={-45}
                      max={45}
                      step={1}
                      onChange={(_, value) => setStraighten(value as number)}
                      sx={{
                        height: 6,
                        mt: '2px',
                        padding: '13px 0 !important',
                        '& .MuiSlider-thumb': {
                          height: 16,
                          width: 16,
                          border: '1px solid white',
                          backgroundColor: 'primary.main',
                          boxShadow: 'none'
                        },
                        '& .MuiSlider-track': {
                          height: 4
                        },
                        '& .MuiSlider-rail': {
                          height: 6,
                          backgroundColor: 'gray.200',
                          opacity: 1
                        },
                        '& .MuiSlider-valueLabel': {
                          backgroundColor: 'gray.900',
                          borderRadius: '6px'
                        }
                      }}
                    />
                    <IconButton
                      disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
                      sx={(theme) => ({
                        svg: {
                          width: '20px',
                          height: '20px',
                          stroke: theme.palette.gray[900]
                        }
                      })}
                      onClick={() => setStraighten((prev) => Math.round((prev + 0.1) * 10) / 10)}>
                      <PlusIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingY: { xs: '8px', sm: '24px' }
            }}>
            <Button
              disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}
              onClick={() => setDeleteModal(true)}
              pill
              variant='text'
              color='#475569'
              sx={{ alignSelf: 'end' }}>
              Delete photo
            </Button>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '10px' }}>
              <Button
                onClick={() => setAddPhotoModal(true)}
                pill
                variant='outlined'
                color='#1DA1F3'
                disabled={uploadImagePending || updateUserInfo.isPending}>
                Change photo
              </Button>
              <Button
                sx={{
                  minWidth: '100px'
                }}
                pill
                onClick={handleSave}
                disabled={isDefaultImage || uploadImagePending || updateUserInfo.isPending}>
                {uploadImagePending || updateUserInfo.isPending ? 'Saving...' : 'Save photo'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal open={addPhotoModal} onClose={() => setAddPhotoModal(false)} title='Add background photo'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            width: { xs: '100%', md: '624px' }
          }}>
          <Image width={256} height={256} alt='add bg image' src={'/images/profile/add_background.png'} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              sx={(theme) => ({
                color: theme.palette.gray['700'],
                fontSize: '24px',
                textAlign: 'center',
                maxWidth: '70%'
              })}>
              Showcase your personality, interest, team moments or notable milestones{' '}
            </Typography>
          </Box>

          <Typography
            sx={(theme) => ({
              color: theme.palette.gray['500'],
              fontSize: '14px',
              fontWeight: 400,
              textAlign: 'center'
            })}>
            A good background photo will help you stand out.
          </Typography>
          <Box sx={{ display: 'flex', alignSelf: 'end', mt: '63px' }}>
            <Button pill onClick={() => fileInputRef.current?.click()}>
              Edit profile background{' '}
            </Button>
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      setImage(event.target.result as string);
                      setAddPhotoModal(false);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </Box>
        </Box>
      </Modal>
      <Confirmation
        open={discardModal}
        title='Discard Changes'
        description='Are you sure you want to discard the changes you made?'
        submitText='Discard'
        cancelText='No, thanks'
        handleClose={() => setDiscardModal(false)}
        handleSubmit={() => {
          setImage(backgroundPhoto || '/imgs/cover-place-holder.png');
          handleReset();
          setEditModal(false);
          setDiscardModal(false);
        }}
        confirmBtnColor='red.500'
        cancelBtnColor='gray.900'
      />
      <Confirmation
        open={deleteModal}
        title='Delete Photo'
        description='Delete photo? A background images is a great way to help your profile stand out.'
        submitText='Delete'
        cancelText='Cancel'
        handleClose={() => setDeleteModal(false)}
        handleSubmit={() =>
          updateUserInfo.mutate(
            { backgroundPhoto: '' },
            {
              onSuccess: () => {
                setImage('/imgs/cover-place-holder.png');
                handleReset();
                setDeleteModal(false);
              }
            }
          )
        }
        loading={updateUserInfo.isPending}
        confirmBtnColor='red.500'
        cancelBtnColor='gray.900'
      />
    </>
  );
};

export default ChangeCoverPhoto;
