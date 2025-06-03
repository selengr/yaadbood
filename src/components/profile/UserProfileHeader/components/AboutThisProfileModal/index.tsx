'use client';
// React & Libs
import moment from 'moment';
import { useState } from 'react';
import { Box } from '@mui/material';
// types
import { UserState } from '@/types/auth';
// components
import { Modal } from '@/components/atoms';
// style
import {
  StyledTitle,
  StyledSectionText,
  StyledModalContent,
  StyledSectionTitle,
  StyledContentContainer
} from './aboutThisProfileModal.style';

interface IProps {
    open: boolean;
    userData: UserState;
    onClose: () => void;
}

const AboutThisProfileModal: React.FC<IProps> = ({ userData, onClose, open }) => {

  return (
    <>
      <Modal open={open} onClose={onClose} title='About this profile'>
        <StyledModalContent>
          <StyledTitle>{`${userData?.firstName || ''} ${userData?.lastName || ''}`}</StyledTitle>
          <StyledContentContainer>
            <Box>
              <StyledSectionTitle>Joined</StyledSectionTitle>
              <StyledSectionText>{moment(userData?.createdAt).format('MMMM YYYY')}</StyledSectionText>
            </Box>

            <Box>
              <StyledSectionTitle>Contact information</StyledSectionTitle>
              <StyledSectionText>Updated {moment(userData?.updatedAt).fromNow()}</StyledSectionText>
            </Box>

            <Box>
              <StyledSectionTitle>Profile photo</StyledSectionTitle>
              <StyledSectionText>
                Updated {moment(userData?.profilePhoto_updated).fromNow()}
              </StyledSectionText>
            </Box>
          </StyledContentContainer>
        </StyledModalContent>
      </Modal>
    </>
  );
};

export default AboutThisProfileModal;
