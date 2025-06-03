import { Avatar, Box, Link, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import React, { useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import { useCreateFollowReq } from '@/hooks/user/useCreateFollowReq';
import { useRemoveFollowReq } from '@/hooks/user/useRemoveFollowReq';
import { Subscription } from '@/types/subscriptions';

import SubscriptionOptions from '../SubscriptionOptions';

const SubscribedCard = ({
  following,
  search,
  sort
}: {
  sort: 'oldest' | 'recently' | 'popular';
  search: string;
  following: Subscription;
}) => {
  const queryClient = useQueryClient();
  const [undoStates, setUndoStates] = useState(false);

  const removeFollowReq = useRemoveFollowReq({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFollowersData', sort, search] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['userFollowersData', sort, search] });
    }
  });
  const createFollowReq = useCreateFollowReq({
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['userFollowersData', sort, search] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['userFollowersData', sort, search] });
    }
  });

  const handleUnsubscribe = (id: string) => {
    setTimeout(() => {
      if (!undoStates) {
        removeFollowReq.mutate({ id });
        queryClient.setQueryData(['userFollowersData', sort, search], (oldData: Subscription[] | undefined) =>
          oldData?.map((user) => (user._id === following?._id ? { ...user, isFollowing: null } : user))
        );
        setUndoStates(false);
      }
    }, 2000);

    setUndoStates(true);
  };

  const handleSubscribe = (id: string) => {
    setTimeout(() => {
      if (!undoStates) {
        createFollowReq.mutate({ targetId: id });
        queryClient.setQueryData(['userFollowersData', sort, search], (oldData: Subscription[] | undefined) =>
          oldData?.map((user) => (user._id === following?._id ? { ...user, isFollowing: 'someId' } : user))
        );
        setUndoStates(false);
      }
    }, 2000);

    setUndoStates(true);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: { xs: '8px', sm: '8px 20px' },
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: theme.palette.gray['100'],
        opacity: undoStates ? 0.5 : 1,
        transition: 'opacity 0.3s ease-out'
      })}>
      <Link href={`/c/${following?.user?.username}`}>
        <Avatar
          sx={{ width: { xs: '48px', sm: '72px' }, height: { xs: '48px', sm: '72px' } }}
          src={following?.user?.profilePhoto}
        />
      </Link>
      <Link
        href={`/c/${following?.user?.username}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none'
        }}>
        <Typography
          variant='h6'
          sx={(theme) => ({
            color: theme.palette.gray['700'],
            fontSize: '16px',
            lineHeight: '24px'
          })}>
          {`${following?.user?.firstName || ''} ${following?.user?.lastName || ''}`}
        </Typography>
        <Typography
          variant='caption'
          sx={(theme) => ({
            color: theme.palette.gray['500'],
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '18px'
          })}>
          {following?.user?.job}
        </Typography>
        <Typography
          variant='caption'
          sx={(theme) => ({
            color: theme.palette.gray['500'],
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '18px'
          })}>
          Subscribed {moment(following.createdAt).fromNow()}
        </Typography>
      </Link>
      <Box
        sx={{
          ml: 'auto',
          alignSelf: 'center',
          justifySelf: 'center',
          display: 'flex',
          gap: { xs: 0, sm: 1 },
          alignItems: 'center'
        }}>
        {undoStates ? (
          <Button
            onClick={() => setUndoStates(false)}
            variant='outlined'
            sx={{
              border: '1px solid #e2e8f0',
              borderRadius: '35px',
              fontSize: '10px',
              color: '#64748b',
              lineHeight: '15px',
              padding: '2.5px 9.5px',
              backgroundColor: 'transparent',
              height: '25px',
              minHeight: '25px'
            }}>
            Subscribed
          </Button>
        ) : following?.isFollowing ? (
          <Button
            onClick={() => handleUnsubscribe(following?.isFollowing || '')}
            variant='outlined'
            disabled={createFollowReq.isPending || removeFollowReq.isPending}
            sx={{
              border: '1px solid #e2e8f0',
              borderRadius: '35px',
              fontSize: '10px',
              color: '#64748b',
              lineHeight: '15px',
              padding: '2.5px 9.5px',
              backgroundColor: 'transparent',
              height: '25px',
              minHeight: '25px'
            }}>
            Subscribed
          </Button>
        ) : (
          <Button
            onClick={() => handleSubscribe(following?.userId)}
            variant='outlined'
            disabled={createFollowReq.isPending || removeFollowReq.isPending}
            sx={{
              border: '1px solid gray.200',
              borderRadius: '36px',
              fontSize: '12px',
              color: 'primary.500',
              lineHeight: '15px',
              padding: '2.5px 7px',
              backgroundColor: 'transparent',
              height: '25px',
              fontWeight: 500,
              minHeight: '25px',
              flexShrink: 0,
              '&:hover': {
                border: '1px solid gray.200',
                borderRadius: '36px',
                fontSize: '12px',
                fontWeight: 500,
                color: 'primary.500',
                lineHeight: '15px',
                padding: '2.5px 7px',
                backgroundColor: 'transparent',
                height: '25px',
                minHeight: '25px'
              }
            }}>
            Subscribe
          </Button>
        )}
        <SubscriptionOptions userData={following?.user} />
      </Box>
    </Box>
  );
};

export default SubscribedCard;
