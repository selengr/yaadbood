'use client';

import { Box } from '@mui/material';
import React, { useState } from 'react';

import { useGetUserFollowersData } from '@/hooks/user/useGetUserFollowersData';
import { useDebounceSearch } from '@/hooks/util/useDebounceSearch';

import DotPulse from '../../atoms/DotSpinner/style';
import SubscriptionsHeader from '../subscriptions/SubscriptionsHeader';
import SubscribedCard from './SubscribedCard';

export default function SubscribedList() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'oldest' | 'recently' | 'popular'>('recently');
  const debouncedSearch = useDebounceSearch(search, 1000);

  const userFollowers = useGetUserFollowersData({ search: debouncedSearch, sort });
  const followings = userFollowers?.data || [];

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
          {userFollowers?.isLoading ? (
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
              <SubscribedCard sort={sort} search={search} key={following._id} following={following} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
