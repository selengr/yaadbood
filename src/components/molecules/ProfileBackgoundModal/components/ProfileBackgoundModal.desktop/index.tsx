// React & libs
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { toast } from 'react-toastify';
// constants
import { PROFILE } from '@/constants';
// utils
import { getCroppedImg, validateFile } from '@/utils';
// hooks
import { useUpdateProfile, useUploadImage } from '@/hooks/user';
// components
import { Modal } from '@/components/atoms';
import { CropperControls } from '../CropperControls';
import { ConfirmDialog } from '@/components/molecules';
import AddbackgroundModal from '../AddbackgroundModal';
// style
import {
  StyledSaveButton,
  StyledDeleteButton,
  StyledModalContainer,
  StyledCropperContainer,
  StyledSaveButtonsContainer,
  StyledActionButtonsContainer
} from './profileBackgoundModal.desktop.style';
// type
import { IProfileBackgoundProps, ICroppedAreaPixelsState } from '../types';

const ProfileBackgoundModalDesktop: React.FC<IProfileBackgoundProps> = ({
  open,
  onClose,
  backgroundPhoto
}) => {
  const {
    SAVE,
    CHANGE,
    SAVING,
    DELETE_PHOTO,
    DELETE_DIALOG,
    BACKGROUND_PHOTO
    // DISCARD_DIALOG: { TITLE, DESCRIPTION, SUBMIT, CANCEL }
  } = PROFILE.ADD_BACKGROUND;
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [straighten, setStraighten] = useState<number>(0);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | ICroppedAreaPixelsState>(null);
  const [image, setImage] = useState<string>(backgroundPhoto);
  const isDefaultImage = image === '/imgs/cover-place-holder.png';
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openAddBackgroundModal, setOpenAddBackgroundModal] = useState(false);

  const { mutate, isPending } = useUpdateProfile({
    onSuccess: async () => {
      onClose();
    }
  });

  const { uploadImage, isPending: uploadImagePending } = useUploadImage({
    onSuccess: (data: any) => {
      const parts = data.split(/data:\s*/).filter(Boolean);
      parts.forEach((part: string) => {
        try {
          const parsedPart = JSON.parse(part.trim());
          // Process only if the part contains a URL
          if (parsedPart?.url) {
            setImage(parsedPart.url);
            mutate({ backgroundPhoto: parsedPart.url });
          }
        } catch (error) {
           // eslint-disable-next-line no-console
           console.error(`Failed to parse part`, error, part);
        }
      });
    }
  });

  const onCropComplete = (
    _: any,
    croppedAreaPixels: React.SetStateAction<{ x: number; y: number; width: number; height: number } | null>
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    const croppedImage =
      croppedAreaPixels && (await getCroppedImg(image, croppedAreaPixels, rotation + straighten));

    if (croppedImage) {
      const response = await fetch(croppedImage);
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
         console.error(`Failed to parse part`);
      }
    }
  };

  const handleRotateLeft = () => {
    if (!isDefaultImage && !uploadImagePending) {
      setRotation((prev) => prev - 90);
    }
  };

  const handleRotateRight = () => {
    if (!isDefaultImage && !uploadImagePending) {
      setRotation((prev) => prev + 90);
    }
  };

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, change: number) => {
    setter((prev) => Math.round((prev + change) * 10) / 10);
  };
  const handleZoomDecrease = () => handleSliderChange(setZoom, -0.1);
  const handleZoomIncrease = () => handleSliderChange(setZoom, 0.1);
  const handleStraightenDecrease = () => handleSliderChange(setStraighten, -1);
  const handleStraightenIncrease = () => handleSliderChange(setStraighten, 1);

  const toggleConfirm = () => {
    setOpenConfirm((prev) => !prev);
  };

  const toggleAddBackground = () => {
    setOpenAddBackgroundModal((prev) => !prev);
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

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={BACKGROUND_PHOTO}
        sx={{ display: { xs: 'none', sm: 'block' } }}>
        <StyledModalContainer>
          <StyledCropperContainer>
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
          </StyledCropperContainer>

          <CropperControls
            isDefaultImage={isDefaultImage}
            uploadImagePending={uploadImagePending}
            zoom={zoom}
            straighten={straighten}
            onZoomChange={setZoom}
            onStraightenChange={setStraighten}
            onRotateLeft={handleRotateLeft}
            onRotateRight={handleRotateRight}
            onZoomDecrease={handleZoomDecrease}
            onZoomIncrease={handleZoomIncrease}
            onStraightenDecrease={handleStraightenDecrease}
            onStraightenIncrease={handleStraightenIncrease}
          />
          <StyledActionButtonsContainer>
            <StyledDeleteButton
              onClick={toggleConfirm}
              disabled={isDefaultImage || uploadImagePending || isPending}
              pill
              variant='text'>
              {DELETE_PHOTO}{' '}
            </StyledDeleteButton>

            <StyledSaveButtonsContainer>
              <StyledSaveButton
                onClick={toggleAddBackground}
                pill
                variant='outlined'
                color='#1DA1F3'
                disabled={uploadImagePending || isPending}>
                {CHANGE}
              </StyledSaveButton>

              <StyledSaveButton
                pill
                onClick={handleSave}
                disabled={isDefaultImage || uploadImagePending || isPending}>
                {uploadImagePending ? SAVING : SAVE}
              </StyledSaveButton>
            </StyledSaveButtonsContainer>
          </StyledActionButtonsContainer>
        </StyledModalContainer>
      </Modal>

      <ConfirmDialog
        open={openConfirm}
        isLoading={isPending}
        onClose={toggleConfirm}
        handleSubmit={handleSubmitConfirm}
        title={DELETE_DIALOG.TITLE}
        description={DELETE_DIALOG.DESCRIPTION}
      />

      {/* <ConfirmDialog
        title={TITLE}
        open={openConfirm}
        cancelText={CANCEL}
        submitText={SUBMIT}
        isLoading={isPending}
        onClose={toggleDiscard}
        description={DESCRIPTION}
        handleSubmit={handleSubmitConfirm}
      /> */}

      <AddbackgroundModal setImage={setImage} open={openAddBackgroundModal} onClose={toggleAddBackground} />
    </>
  );
};
export default ProfileBackgoundModalDesktop;
