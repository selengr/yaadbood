'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import { useGetUserContent } from '@/hooks/user/useGetUserContent';

import DotPulse from '../atoms/DotSpinner/style';
import PostCard from './Activity/components/PostCard';
import ArrowRightIcon from '../atoms/Icon/icons/ArrowRightIcon';

export function UserActivity({ username }: { username?: string }) {
  const [activeTab, setactiveTab] = useState<'Latest' | 'Popular' | 'Oldest'>('Latest');
  const userContent = useGetUserContent({
    username,
    types: ['Analysis', 'Blog', 'Signal', 'Tweet'],
    markets: ['Forex'],
    i_bookmarked: false,
    i_commented: false,
    i_liked: false,
    i_reposted: true
  });

  return (
    <Box
      component='section'
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '18px',
        borderRadius: '6px'
      }}>
      <Typography variant='h5' sx={{ fontWeight: '600', color: 'gray.700', fontSize: '20px', py: '8px' }}>
        Posts
      </Typography>
      <Box component='main'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
          {['Latest', 'Popular', 'Oldest'].map((type) => (
            <Button
              onClick={() => setactiveTab(type as 'Latest' | 'Popular' | 'Oldest')}
              key={type}
              variant='outlined'
              sx={{
                fontSize: '14px',
                lineHeight: '14px',
                fontWeight: 600,
                borderRadius: '9999px',
                padding: '8px 12px',
                textDecoration: 'none',
                border: activeTab === type ? '0' : '1px solid',
                borderColor: 'gray.200',
                '&:hover': {
                  backgroundColor: activeTab === type ? 'primary.500' : 'neutrals.content',
                  color: activeTab === type ? 'neutrals.content' : 'gray.500',
                  border: activeTab === type ? '0' : '1px solid',
                  borderColor: 'gray.200'
                },
                backgroundColor: activeTab === type ? 'primary.500' : 'neutrals.content',
                color: activeTab === type ? 'neutrals.content' : 'gray.500',
                textTransform: 'capitalize',
                height: '32px',
                minHeight: '32px'
              }}>
              {type}
            </Button>
          ))}
        </Box>
        {userContent?.isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3 }}>
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
          userContent?.data?.slice(0, 3)?.map((post) => <PostCard post={post} key={`postID:${post._id}`} />)
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Button
          variant='text'
          sx={{
            mt: '8px',
            alignItems: 'center',
            gap: '0px',
            height: '30px',
            minHeight: '30px',
            whiteSpace: 'nowrap',
            width: 'fit-content',
            display: 'inline-flex',
            lineHeight: '10px'
          }}>
          <Typography
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'gray.500',
              fontSize: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              '& svg': {
                width: '16px',
                height: '16px',
                stroke: `${theme.palette.gray[500]} !important`
              }
            })}
            variant='caption'>
            Show all {activeTab}
            <ArrowRightIcon />
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
