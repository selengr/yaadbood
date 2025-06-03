'use client';
// React & Libs
import moment from 'moment';
import { useState } from 'react';
import { Box } from '@mui/material';
// constants
import { PROFILE } from '@/constants';
// types
import { UserState } from '@/types/auth';
// components
import { EditIntro } from '@/components/profile';
import { Icon, Modal, SmsIcon, CalendarIcon, CallIcon, WebsiteIcon } from '@/components/atoms';
// style
import {
  StyledLink,
  StyledContactLink,
  StyledModalHeader,
  StyledContactItem,
  StyledContactTitle,
  StyledContactLabel,
  StyledColContainer,
  StyledSecondaryText,
  StyledModalContainer,
  StyledContactLinkText,
  StyledInlineContainer,
  StyledSecondaryLink
} from './contactInfo.style';

interface IProps {
  editable?: boolean;
  userData?: UserState;
}

const ContactInfo: React.FC<IProps> = ({ editable = false, userData }) => {
  const { TITLE, WEBSITE, URL, PHONE, MOBILE, BIRTHDAY, EMAIL } = PROFILE.CONTACT_INFO;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  const {
    username,
    website,
    phoneNumber,
    countryCode = '+98',
    email,
    lastName,
    firstName,
    dateOfBirth
  } = userData || {};
  const USER_NAME = `${firstName} ${lastName}`;

  return (
    <>
      <StyledContactLink onClick={toggleModal}>{TITLE}</StyledContactLink>

      <Modal open={isContactModalOpen} onClose={toggleModal} title={USER_NAME}>
        <StyledModalContainer>
          <StyledModalHeader>
            <StyledContactTitle>{TITLE}</StyledContactTitle>
            {editable && <EditIntro />}
          </StyledModalHeader>
          <Box>
            <StyledContactItem>
              <Icon name='type' w={24} h={24} />
              <StyledColContainer>
                <StyledContactLabel>{URL}</StyledContactLabel>
                <StyledLink href={`www.tradido.com/c/${username}`}>www.tradido.com/c/{username}</StyledLink>
              </StyledColContainer>
            </StyledContactItem>

            {/* Website */}
            {website && (
              <StyledContactItem>
                <WebsiteIcon />
                <StyledColContainer>
                  <StyledContactLabel>{WEBSITE}</StyledContactLabel>
                  <StyledInlineContainer>
                    <StyledContactLinkText href={website} target='_blank'>
                      {website}
                    </StyledContactLinkText>
                  </StyledInlineContainer>
                </StyledColContainer>
              </StyledContactItem>
            )}

            {/* Phone */}
            {phoneNumber && (
              <StyledContactItem>
                <CallIcon />
                <StyledColContainer>
                  <StyledContactLabel>{PHONE}</StyledContactLabel>
                  <StyledInlineContainer>
                    <StyledSecondaryLink href={`tel:${countryCode}${phoneNumber}`}>
                      ({countryCode}) {phoneNumber}
                    </StyledSecondaryLink>
                    <StyledSecondaryText>({MOBILE})</StyledSecondaryText>
                  </StyledInlineContainer>
                </StyledColContainer>
              </StyledContactItem>
            )}

            {/* Email */}
            <StyledContactItem>
              <SmsIcon />
              <StyledColContainer>
                <StyledContactLabel>{EMAIL}</StyledContactLabel>
                <StyledLink href={`mailto:${email}`}>{email}</StyledLink>
              </StyledColContainer>
            </StyledContactItem>
            {/* Birthday */}
            <StyledContactItem>
              <CalendarIcon />
              <StyledColContainer>
                <StyledContactLabel>{BIRTHDAY}</StyledContactLabel>
                <StyledSecondaryText>{moment(dateOfBirth).format('MMM D, YYYY')}</StyledSecondaryText>
              </StyledColContainer>
            </StyledContactItem>
          </Box>
        </StyledModalContainer>
      </Modal>
    </>
  );
};

export default ContactInfo;
