'use client';

import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { useGetUserFollowingsData } from '@/hooks/user/useGetUserFollowingsData';
import { useRemoveFollowReq } from '@/hooks/user/useRemoveFollowReq';
import { useDebounceSearch } from '@/hooks/util/useDebounceSearch';
import { Subscription } from '@/types/subscriptions';

import DotPulse from '../../atoms/DotSpinner/style';
import SubscriptionsCard from './SubscriptionsCard';
import SubscriptionsHeader from './SubscriptionsHeader';

export default function Subscriptions() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'oldest' | 'recently' | 'popular'>('recently');
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounceSearch(search, 1000);

  const userFollowings = useGetUserFollowingsData({ search: debouncedSearch, sort });
  const followings = userFollowings?.data || [];

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
      queryClient.setQueryData(['userFollowingsData', sort, search], (oldData: Subscription[] | undefined) =>
        oldData?.filter((f) => f._id !== id)
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

  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <SubscriptionsHeader
        search={search}
        sort={sort}
        setSort={setSort}
        setSearch={setSearch}
        followingsLength={followings.length}
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
              <SubscriptionsCard
                key={following._id}
                handleUnsubscribe={handleUnsubscribe}
                handleUndo={handleUndo}
                following={following}
                undoStates={undoStates}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
