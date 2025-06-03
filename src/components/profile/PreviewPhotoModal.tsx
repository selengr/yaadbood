"use client"

import { Dispatch, ReactNode, SetStateAction } from 'react';

import Modal from '../atoms/Modal/Modal';

const PreviewPhotoModal = ({
  previewModal,
  setPreviewModal,
  children,
  title
}: {
  previewModal: boolean;
  setPreviewModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
}) => {
  return (
    <Modal
      title={title}
      open={previewModal}
      onClose={() => setPreviewModal(false)}
      backgroundColor='black'
      fullScreenOnMobile>
      {children}
    </Modal>
  );
};

export default PreviewPhotoModal;
