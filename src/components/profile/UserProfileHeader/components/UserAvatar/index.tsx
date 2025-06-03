// React & Lib
import { useState } from 'react';
// style
import {
    AvatarContainer
} from './userAvatar.style';
// components
import { Avatar } from '@/components/atoms';
import { ProfilePhotoModal, AddProfilePhotoModal } from '@/components/molecules';

interface IProps {
  fullname: string;
  profilePhoto: string
}

const UserAvatar: React.FC<IProps> = ({ profilePhoto, fullname }) => {
  const [ isOpenUploadModal, setOpenUploadModal ] = useState<boolean>(false)
  const [ isOpenProfilePhotoModal, setOpenProfilePhotoModal ] = useState<boolean>(false)
 

  const handleOpenAvatar = () => {
    if (profilePhoto) {
      setOpenProfilePhotoModal(true);
    } else {
      setOpenUploadModal(true);
    }    
  }
 
  const handleCloseAvatar = () => {
    setOpenProfilePhotoModal(false)
  }

  const handleCloseUploadModal = () => {
    setOpenUploadModal(false)
  }

  
  return (
    <>
      <AvatarContainer
         onClick={handleOpenAvatar}
       >
        <Avatar width={'100%'} height={'100%'} image={profilePhoto} />
      </AvatarContainer>

        <ProfilePhotoModal 
          fullname={fullname}
          profilePhoto={profilePhoto}
          onClose={handleCloseAvatar}
          open={isOpenProfilePhotoModal}
        />
      
        <AddProfilePhotoModal 
          open={isOpenUploadModal}
          onClose={handleCloseUploadModal}
        />
    </>
  );
};

export default UserAvatar;
