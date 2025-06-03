'use client';

// type
import { IProfileBackgoundProps } from './components/types';
// components
import {ProfileBackgouneModalMobile, ProfileBackgoundModalDesktop} from './components';


const ProfileBackgoundModal: React.FC<IProfileBackgoundProps> = ({ backgroundPhoto, open, onClose }) => {

  return (
    <>
      <ProfileBackgoundModalDesktop
       backgroundPhoto={backgroundPhoto} 
       open={open}
       onClose={onClose}/>
 
      <ProfileBackgouneModalMobile
        backgroundPhoto={backgroundPhoto}
        onClose={onClose}
        open={open}
      />
    </>
  );
};

export default ProfileBackgoundModal;
