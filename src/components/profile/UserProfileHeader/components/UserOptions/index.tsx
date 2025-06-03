'use client';
// React & Libs
import { MouseEvent, useState } from 'react';
// constants
import { PROFILE } from '@/constants';
// hooks
import { useShareLink } from '@/hooks/util';
import { useFollowActions } from '@/hooks/user';
// types
import { UserState } from '@/types/auth';
// components
import { Icon } from '@/components/atoms';
import { DropdownMenu } from '@/components/molecules';
import AboutThisProfileModal from '../AboutThisProfileModal';
// style
import { StyledIconButton } from './userOptions.style';

interface IProps {
  userData: UserState;
  onToggle: () => void;
  isFollowing: boolean;
}

const UserOptions = ({ userData, onToggle, isFollowing }: IProps) => {
  const { SUBSCRIBE, SUBSCRIBED } = PROFILE.HEADER;
  const { ABOUT,SHARE } = PROFILE.HEADER.OPTION;
  const [contactModal, setContactModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const shareLink = useShareLink();

  const { handleFollowAction, isLoading } = useFollowActions(onToggle);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModal = () => {
    setContactModal(false);
  };

  const toggleAbout = () => {
    setContactModal((prev)=> !prev);
  };

  const handleSubscribeAction = () => {
    handleFollowAction(isFollowing, userData.id, userData.isFollowing);
  };
  const handleShareLink = () => {
    shareLink(`${userData.username}`)
  };

  return (
    <>
      <DropdownMenu 
        items={[
        { label: SHARE, icon: '', onClick: handleShareLink },
        { label: ABOUT, icon: '', onClick: toggleAbout },
        { 
          label: isFollowing ? SUBSCRIBED : SUBSCRIBE, 
          icon: '', 
          onClick: handleSubscribeAction
        }
      ]}
      >
        <StyledIconButton onClick={handleClick} sx={{ borderColor: 'gray.200' }}>
          <Icon name='option' w={16} h={32} />
        </StyledIconButton>
      </DropdownMenu>

      <AboutThisProfileModal userData={userData} open={contactModal} onClose={handleCloseModal} />
    </>
  );
};

export default UserOptions;
