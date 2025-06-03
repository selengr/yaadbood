'use client';

import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import Avatar from '../atoms/Avatar';
import MutualSubscriptionModal from './MutualSubscriptionModal';

const UserMutual = ({
  mutualFriends,
  mutualCount
}: {
  mutualFriends: {
    profilePhoto: string;
    username: string;
  }[];
  mutualCount: number;
}) => {
  const { username } = useParams();
  const [mutualModal, setMutualModal] = useState(false);

  return (
    <>
      <MutualSubscriptionModal
        mutualModal={mutualModal}
        setMutualModal={setMutualModal}
        username={username?.toString()}
      />
      <Box
        sx={{ display: 'flex', alignItems: 'center', pl: '10px', cursor: 'pointer' }}
        onClick={() => setMutualModal(true)}>
        {mutualFriends?.map((mFriend) => (
          <Box
            sx={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'neutrals.content',
              ml: '-10px'
            }}
            key={mFriend?.username}>
            <Avatar image={mFriend?.profilePhoto} width={25} height={25} />
          </Box>
        ))}
        {mutualFriends?.length > 2 ? (
          <Typography sx={{ fontSize: '12px', color: 'gray.500', px: '8px' }}>
            {mutualFriends[0]?.username}, {mutualFriends[1]?.username}, and {Number(mutualCount) - 2} other
            mutual connections
          </Typography>
        ) : mutualFriends?.length > 0 ? (
          <Typography sx={{ fontSize: '12px', color: 'gray.500', px: '8px' }}>
            {mutualFriends[0]?.username}{' '}
            {mutualFriends[1]?.username ? `and ${mutualFriends[1]?.username} ` : ''}
            mutual connections
          </Typography>
        ) : null}
      </Box>
    </>
  );
};

export default UserMutual;
