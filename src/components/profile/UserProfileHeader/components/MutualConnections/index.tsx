'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
// constants
import { PROFILE } from '@/constants';
// components
import { Avatar } from '@/components/atoms';
import { MutualFriendsModal } from '@/components/profile';

// style
import {
  StyledMutualFriendsText,
  StyledFriendAvatarWrapper,
  StyledMutualFriendsContainer
} from './mutualConnections.style';

interface IMutualFriend {
  profilePhoto: string;
  username: string;
}

interface IProps {
  mutualFriends: IMutualFriend[];
  mutualCount: number;
}

const MutualConnections: React.FC<IProps> = ({ mutualFriends = [], mutualCount = 0 }) => {
  const { MUTUAL_CONNECTIONS, OTHER_MUTUAL_CONNECTIONS, AND } = PROFILE.HEADER;
  const { username } = useParams();
  const [mutualModal, setMutualModal] = useState(false);

  const hasMoreFriends = mutualCount > 3;
  const displayedFriends = mutualFriends.slice(0, 2);

  const handleClose = () =>{
    setMutualModal(false)
  }

  return (
    <>

{/* <MutualSubscriptionModal
        mutualModal={mutualModal}
        setMutualModal={setMutualModal}
        username={username?.toString()}
      /> */}
      <MutualFriendsModal
        // mutualModal={mutualModal}
        // setMutualModal={setMutualModal}
        username={username?.toString()}
        open={mutualModal}
        handleClose={handleClose}
      />

      <StyledMutualFriendsContainer
         onClick={() => setMutualModal(true)}
      >
        {displayedFriends?.map(({ username, profilePhoto }) => (
          <StyledFriendAvatarWrapper key={username}>
            <Avatar image={profilePhoto} width={25} height={25} />
          </StyledFriendAvatarWrapper>
        ))}
        {mutualCount === 0 ? null : hasMoreFriends ? (
          <StyledMutualFriendsText>
            {displayedFriends[0]?.username}, {displayedFriends[1]?.username},{' '}
            <span>
              {AND} {Number(mutualCount) - 2} {OTHER_MUTUAL_CONNECTIONS}
            </span>
          </StyledMutualFriendsText>
        ) : (
          <StyledMutualFriendsText>
            {displayedFriends[0]?.username}
            {displayedFriends[1]?.username ? ` ${AND} ${displayedFriends[1]?.username}` : ''}
            {MUTUAL_CONNECTIONS}
          </StyledMutualFriendsText>
        )}
      </StyledMutualFriendsContainer>
    </>
  );
};

export default MutualConnections;
