import {
  PhotoEditingModalDesktop,
  PhotoEditingModalMobile
} from './components';
import { IPhotoEditingModalProps } from './components/types';


const PhotoEditingModal: React.FC<IPhotoEditingModalProps> = ({ 
  open = false,
  isLoading = false,
  handleSave, 
  handleCancel, 
  profilePhoto,
   }) => {
  return (
    <>
      <PhotoEditingModalMobile 
        open={open}
        handleSave={handleSave}
        handleCancel={handleCancel}
        isLoading={isLoading}
        profilePhoto={profilePhoto}
        />

      <PhotoEditingModalDesktop
         open={open}
         handleSave={handleSave}
         handleCancel={handleCancel} 
         isLoading={isLoading}
         profilePhoto={profilePhoto}
         />
    </>
  );
};

export default PhotoEditingModal;
