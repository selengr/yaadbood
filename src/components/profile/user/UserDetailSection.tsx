import { Box, Link, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';

import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import UserOptions from '@/components/user/UserOptions';
import UserSubButton from '@/components/user/UserSubButton';
import { UserState } from '@/types/auth';

import ContactInfo from '../ContactInfo';
import UserMutual from '../UserMutual';
import UserAvatarPhoto from './UserAvatarPhoto';
import UserBackgroundPhoto from './UserBackgroundPhoto';

const StickyUserCard = dynamic(() => import('./StickyUserCard'));

const UserDetailSection = ({
  userData,
  mutualCount,
  mutualFriends,
  followersCount
}: {
  userData: UserState;
  mutualFriends: { profilePhoto: string; username: string }[];
  mutualCount: number;
  followersCount: number;
}) => {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: { xs: '0px', md: '6px' },
          backgroundColor: 'neutrals.content',
          overflow: 'hidden'
        }}>
        <UserBackgroundPhoto backgroundPhoto={userData?.backgroundPhoto || '/imgs/cover-place-holder.png'} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '12px',
            pt: '0px'
          }}>
          <UserAvatarPhoto profilePhoto={userData?.profilePhoto} />
          <Box
            sx={{
              alignSelf: 'flex-end'
            }}>
            <Button type='button' icon variant='text'>
              <Icon name='premium' w={24} h={24} />
            </Button>
            <Button type='button' icon variant='text'>
              <Icon name='zangoole' w={24} h={24} />
            </Button>
          </Box>
          <Box
            sx={{
              mt: { xs: '30px', md: '0px' },
              display: 'flex',
              flexDirection: 'column',
              gap: '0px'
            }}>
            <Typography
              sx={{
                color: 'gray.900',
                fontWeight: 600,
                fontSize: '24px',
                wordBreak: 'break-word',
                whiteSpace: 'wrap'
              }}
              variant='h5'>
              {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
            </Typography>
            <Typography
              sx={{ color: 'gray.600', fontWeight: 500, fontSize: '16px', mt: '-4px' }}
              variant='caption'>
              {userData?.job}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
              {userData?.country ? (
                <Typography
                  sx={{
                    color: 'gray.500',
                    fontSize: '14px',
                    fontWeight: 400
                  }}>
                  {`${userData?.country || ''} ${userData?.city || ''}`}
                </Typography>
              ) : null}
              <ContactInfo editable={false} userData={userData} />
            </Box>
            {userData?.website ? (
              <Box
                component={Link}
                href={userData?.website}
                target='_blank'
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}>
                <Typography
                  variant='caption'
                  sx={{
                    lineHeight: '18px',
                    mt: '4px',
                    color: 'primary.500',
                    wordBreak: 'break-word',
                    whiteSpace: 'wrap',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}>
                  visit website
                </Typography>
                <Icon name='openLink' w={16} h={16} />
              </Box>
            ) : null}
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1 }}>
              <Typography color='gray' sx={{ fontSize: '14px' }}>
                {followersCount || 0} Subscribers
              </Typography>
              {mutualCount ? (
                <>
                  <Typography color='gray' sx={{ fontSize: '14px' }}>
                    ∙
                  </Typography>
                  <Box
                    component={Link}
                    sx={{
                      textDecoration: 'none',
                      fontSize: '14px',
                      color: 'primary.500'
                    }}
                    href={`/c/${userData?.username}/subscriptions`}>
                    {`${mutualCount || 0} mutual friends`}
                  </Box>
                </>
              ) : null}
            </Box>
            <UserMutual mutualFriends={mutualFriends} mutualCount={mutualCount} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <UserSubButton userData={userData} />
              <UserOptions userData={userData} />
            </Box>
          </Box>
        </Box>
      </Box>
      <StickyUserCard userData={userData} />
    </>
  );
};

export default UserDetailSection;
