'use client';

import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';

import ChangeCoverPhoto from './ChangeCoverPhoto';
import UserBackground from './UserBackgroundMobile';

const EditBackground = ({ backgroundPhoto }: { backgroundPhoto: string }) => {
  const [editModal, setEditModal] = useState(false);
  const [editMobileModal, setEditMobileModal] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Button
        type='button'
        icon
        onClick={() => (isMobile ? setEditMobileModal(true) : setEditModal(true))}
        sx={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          padding: '0px',
          top: '12px',
          right: '12px',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: '10px',
          zIndex: 9
        }}>
        <Icon name='capture' w={18} h={17} />
      </Button>
      <ChangeCoverPhoto backgroundPhoto={backgroundPhoto} editModal={editModal} setEditModal={setEditModal} />
      <UserBackground
        backgroundPhoto={backgroundPhoto}
        openModal={editMobileModal}
        setOpenModal={setEditMobileModal}
      />
    </>
  );
};

export default EditBackground;
