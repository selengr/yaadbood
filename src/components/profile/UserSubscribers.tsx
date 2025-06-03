'use client';

import { Avatar, Box, Button, Link, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import { useGetMutualFollowings } from '@/hooks/user/useGetMutualFollowings';
import { useRemoveFollowReq } from '@/hooks/user/useRemoveFollowReq';
import { Subscription } from '@/types/subscriptions';

import DotPulse from '../atoms/DotSpinner/style';
import MutualSubscriptionModal from './MutualSubscriptionModal';
import SubscriptionOptions from './SubscriptionOptions';

export default function UserSubscribers() {
  const [mutualModal, setMutualModal] = useState(false);
  const { username } = useParams();
  const [mutualUsername, setMutualUsername] = useState(username);
  const queryClient = useQueryClient();

  // const userFollowings = useGetMutualFollowings({
  //   username: username?.toString()
  // });
  // const followings = userFollowings?.data || [];
  let userFollowings : any = []

  const followings: Subscription[] = [
    {
      _id: "1",
      status: "active",
      userId: "user123",
      targetId: "target456",
      createdAt: "2023-05-15T10:30:00Z",
      updatedAt: "2023-05-15T10:30:00Z",
      user: {
        photos: [],
        username: "johndoe",
        profilePhoto: "https://example.com/profile1.jpg",
        displayName: "John Doe",
        id: "user123",
        firstName: "John",
        lastName: "Doe",
        job: "Software Engineer"
      },
      target: {
        username: "janedoe",
        createdAt: "2023-01-10T08:15:00Z",
        firstName: "Jane",
        lastName: "Doe",
        id: "target456",
        job: "Graphic Designer",
        profilePhoto: "https://example.com/profile2.jpg",
        profilePhoto_updated: "2023-04-20T14:22:00Z"
      },
      mutualCount: 5,
      mutualFriends: [
        { profilePhoto: "https://example.com/mutual1.jpg", username: "mike_smith" },
        { profilePhoto: "https://example.com/mutual2.jpg", username: "sarah_j" },
        { profilePhoto: "https://example.com/mutual3.jpg", username: "alex_w" }
      ]
    },
    {
      _id: "2",
      status: "active",
      userId: "user123",
      targetId: "target789",
      createdAt: "2023-06-20T14:45:00Z",
      updatedAt: "2023-06-20T14:45:00Z",
      user: {
        photos: [],
        username: "johndoe",
        profilePhoto: "https://example.com/profile1.jpg",
        displayName: "John Doe",
        id: "user123",
        firstName: "John",
        lastName: "Doe",
        job: "Software Engineer"
      },
      target: {
        username: "robert_king",
        createdAt: "2022-11-05T09:20:00Z",
        firstName: "Robert",
        lastName: "King",
        id: "target789",
        job: "Marketing Manager",
        profilePhoto: "https://example.com/profile3.jpg",
        profilePhoto_updated: "2023-03-15T11:10:00Z"
      },
      mutualCount: 2,
      mutualFriends: [
        { profilePhoto: "https://example.com/mutual4.jpg", username: "lisa_r" },
        { profilePhoto: "https://example.com/mutual5.jpg", username: "tom_h" }
      ]
    },
    {
      _id: "3",
      status: "active",
      userId: "user123",
      targetId: "target101",
      createdAt: "2023-07-10T16:20:00Z",
      updatedAt: "2023-07-10T16:20:00Z",
      user: {
        photos: [],
        username: "johndoe",
        profilePhoto: "https://example.com/profile1.jpg",
        displayName: "John Doe",
        id: "user123",
        firstName: "John",
        lastName: "Doe",
        job: "Software Engineer"
      },
      target: {
        username: "emily_w",
        createdAt: "2023-02-28T12:30:00Z",
        firstName: "Emily",
        lastName: "Wilson",
        id: "target101",
        job: "UX Designer",
        profilePhoto: "https://example.com/profile4.jpg",
        profilePhoto_updated: "2023-05-01T10:05:00Z"
      },
      mutualCount: 0,
      mutualFriends: []
    }
  ];

  const removeFollowReq = useRemoveFollowReq({
    onSuccess: () => {
      userFollowings.refetch();
    },
    onError: () => {
      userFollowings.refetch();
    }
  });

  const [undoStates, setUndoStates] = useState<{ [key: string]: NodeJS.Timeout }>({});

  const handleUnsubscribe = (id: string) => {
    const timeout = setTimeout(() => {
      removeFollowReq.mutate({ id });
      queryClient.setQueryData(
        ['userMutualFollowingsData', undefined, undefined, username],
        (oldData: Subscription[] | undefined) => oldData?.filter((f) => f._id !== id)
      );
      setUndoStates((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    }, 2000);

    setUndoStates((prev) => ({ ...prev, [id]: timeout }));
  };

  const handleUndo = (id: string) => {
    if (undoStates[id]) {
      clearTimeout(undoStates[id]);
      setUndoStates((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const isUndoing = (id: string) => Boolean(undoStates[id]);

  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <MutualSubscriptionModal
        mutualModal={mutualModal}
        setMutualModal={setMutualModal}
        username={mutualUsername?.toString()}
      />

      <Box component='main'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
          {userFollowings?.isLoading ? (
            <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
              <DotPulse
                sx={{
                  color: 'primary.main',
                  '&::before': {
                    color: 'primary.main'
                  },
                  '&::after': {
                    color: 'primary.main'
                  }
                }}
              />
            </Box>
          ) : (
            followings.map((following) => (
              <Box
                key={following._id}
                sx={(theme) => ({
                  padding: { xs: '8px', sm: '8px 20px' },
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  borderBottom: '1px solid',
                  borderColor: theme.palette.gray['100'],
                  opacity: isUndoing(following._id) ? 0.5 : 1,
                  transition: 'opacity 0.3s ease-out'
                })}>
                <Link href={`/c/${following?.target?.username}`}>
                  <Avatar
                    sx={{ width: { xs: '48px', sm: '72px' }, height: { xs: '48px', sm: '72px' } }}
                    src={following?.target?.profilePhoto}
                  />
                </Link>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none'
                  }}>
                  <Link
                    href={`/c/${following?.target?.username}`}
                    sx={{
                      color: 'gray.700',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '24px',
                      textDecoration: 'none'
                    }}>
                    {`${following?.target?.firstName || ''} ${following?.target?.lastName || ''}`}
                  </Link>
                  <Typography
                    variant='caption'
                    sx={(theme) => ({
                      color: theme.palette.gray['500'],
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '18px'
                    })}>
                    {following?.target?.job}
                  </Typography>
                  {following?.mutualCount > 0 ? (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', pl: '10px', cursor: 'pointer' }}
                      onClick={() => {
                        setMutualModal(true);
                        setMutualUsername(following?.target?.username);
                      }}>
                      {following?.mutualFriends?.slice(0, 3)?.map((mSub) => (
                        <Box
                          sx={{
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'neutrals.content',
                            ml: '-10px'
                          }}
                          key={mSub?.username}>
                          <Avatar src={mSub?.profilePhoto} sx={{ width: '25px', height: '25px' }} />
                        </Box>
                      ))}
                      <Typography sx={{ fontSize: '12px', color: 'gray.500', px: '8px' }}>
                        {following?.mutualCount} mutual connections
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
                <Box
                  sx={{
                    ml: 'auto',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    display: 'flex',
                    gap: { xs: 0, sm: 1 },
                    alignItems: 'center'
                  }}>
                  <Link
                    href={`/c/${following?.target?.username}`}
                    sx={{
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      border: '1px solid #e2e8f0',
                      borderRadius: '35px',
                      fontSize: '10px',
                      color: 'gray.500',
                      lineHeight: '10px',
                      padding: '2.5px 9.5px',
                      backgroundColor: 'transparent',
                      height: '25px',
                      minHeight: '25px',
                      display: { xs: 'none', sm: 'flex' },
                      alignItems: 'center',
                      ml: 'auto',
                      fontWeight: '500'
                    }}>
                    View Profile
                  </Link>
                  {isUndoing(following._id) ? (
                    <Button
                      onClick={() => handleUndo(following._id)}
                      variant='outlined'
                      sx={{
                        width: { xs: '100%', lg: 'auto' },
                        border: '1px solid gray.200',
                        borderRadius: { xs: '6px', lg: '36px' },
                        fontSize: '12px',
                        color: { xs: '#ffffff', lg: 'primary.500' },
                        lineHeight: '15px',
                        padding: '2.5px 7px',
                        backgroundColor: { xs: 'primary.500', lg: 'transparent' },
                        height: '25px',
                        fontWeight: 500,
                        minHeight: '25px',
                        '&:hover': {
                          border: '1px solid gray.200',
                          borderRadius: { xs: '6px', lg: '36px' },
                          fontSize: '12px',
                          fontWeight: 500,
                          color: { xs: '#ffffff', lg: 'primary.500' },
                          lineHeight: '15px',
                          padding: '2.5px 7px',
                          backgroundColor: { xs: 'primary.500', lg: 'transparent' },
                          height: '25px',
                          minHeight: '25px'
                        }
                      }}>
                      Subscribe
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUnsubscribe(following._id)}
                      variant='outlined'
                      sx={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '35px',
                        fontSize: '10px',
                        fontWeight: 500,
                        color: 'gray.500',
                        lineHeight: '10px',
                        padding: '2.5px 9.5px',
                        backgroundColor: 'transparent',
                        height: '25px',
                        minHeight: '25px'
                      }}>
                      Subscribed
                    </Button>
                  )}
                  <SubscriptionOptions userData={following?.target as any} />
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
