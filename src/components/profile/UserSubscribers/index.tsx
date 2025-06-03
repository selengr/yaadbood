'use client';
import React, { useState } from 'react';
import { Box, Link } from '@mui/material';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

// constants
import { PROFILE_PAGE } from '@/constants';
// types
import { Subscription } from '@/types/subscriptions';
// hooks
import { useRemoveFollowReq, useGetMutualFollowings } from '@/hooks/user';
// components
import { SubscriptionOptions, MutualSubscriptionModal } from '@/components/profile';

// style
import { 
    StyledUserJob,
    StyledDotPulse,
    StyledContainer,
    StyledUserAvatar,
    StyledUndoButton,
    StyledMainContent,
    StyledUserNameLink,
    StyledMutualAvatar,
    StyledFollowingItem,
    StyledMutualCountText,
    StyledViewProfileLink,
    StyledSubscribeButton,
    StyledActionsContainer,
    StyledLoadingContainer,
    StyledUserInfoContainer,
    StyledMutualAvatarWrapper,
    StyledMutualConnectionsContainer
 } from "./userSubscribers.style"

export default function UserSubscribers() {
    const { VIEW_PROFILE, MUTUAL_CONNECTION, SUBSCRIBE, SUBSCRIBED } = PROFILE_PAGE.USER_SUBSCRIBERS
  const [mutualModal, setMutualModal] = useState(false);
  const { username } = useParams();
  const [mutualUsername, setMutualUsername] = useState(username);
  const queryClient = useQueryClient();

  const userFollowings = useGetMutualFollowings({
    username: username?.toString()
  });
  // const followings = userFollowings?.data || [];

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
    <StyledContainer>
      <MutualSubscriptionModal
        mutualModal={mutualModal}
        setMutualModal={setMutualModal}
        username={mutualUsername?.toString()}
      />

      <Box component='main'>
        <StyledMainContent>
          {userFollowings?.isLoading ? (
            <StyledLoadingContainer>
              <StyledDotPulse />
            </StyledLoadingContainer>
          ) : (
            followings.map((following) => (
              <StyledFollowingItem
                key={following._id}>
                <Link href={`/c/${following?.target?.username}`}>
                  <StyledUserAvatar src={following?.target?.profilePhoto} />
                </Link>
                <StyledUserInfoContainer>
                  <StyledUserNameLink
                    href={`/c/${following?.target?.username}`}>
                    {`${following?.target?.firstName || ''} ${following?.target?.lastName || ''}`}
                  </StyledUserNameLink>
                  <StyledUserJob variant='caption'>
                    {following?.target?.job}
                  </StyledUserJob>
                  {following?.mutualCount > 0 ? (
                    <StyledMutualConnectionsContainer
                      onClick={() => {
                        setMutualModal(true);
                        setMutualUsername(following?.target?.username);
                      }}>
                      {following?.mutualFriends?.slice(0, 3)?.map((mSub) => (
                        <StyledMutualAvatarWrapper
                          key={mSub?.username}>
                          <StyledMutualAvatar src={mSub?.profilePhoto} />
                        </StyledMutualAvatarWrapper>
                      ))}
                      <StyledMutualCountText>
                        {following?.mutualCount} {MUTUAL_CONNECTION}
                      </StyledMutualCountText>
                    </StyledMutualConnectionsContainer>
                  ) : null}
                </StyledUserInfoContainer>
                <StyledActionsContainer>
                  <StyledViewProfileLink
                    href={`/c/${following?.target?.username}`}>
                        {VIEW_PROFILE}
                  </StyledViewProfileLink>
                  {isUndoing(following._id) ? (
                    <StyledUndoButton
                      onClick={() => handleUndo(following._id)}
                      variant='outlined'>
                        {SUBSCRIBE}
                    </StyledUndoButton>
                  ) : (
                    <StyledSubscribeButton
                      onClick={() => handleUnsubscribe(following._id)}
                      variant='outlined'>
                         {SUBSCRIBED}
                    </StyledSubscribeButton>
                  )}
                  <SubscriptionOptions userData={following?.target as any} />
                </StyledActionsContainer>
              </StyledFollowingItem>
            ))
          )}
        </StyledMainContent>
      </Box>
    </StyledContainer>
  );
}
