'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import { useGetUserData } from '@/hooks/user/useGetUserData';

import UserAvatar from './avatar/UserAvatar';
import Capture from './background/Capture';
import ContactInfo from './ContactInfo';
import EditIntro from './EditIntro';

export function Intro() {
  const { data } = useGetUserData();
  const userData = data?.user;
  const subscribed = data?.subscribes?.followersCount;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: { xs: '0px', md: '6px' },
        backgroundColor: 'neutrals.content',
        overflow: 'hidden'
      }}>
      <Capture backgroundPhoto={userData?.backgroundPhoto || '/imgs/cover-place-holder.png'} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
          pt: '0px'
        }}>
        <UserAvatar
          fullname={`${userData?.firstName || ''} ${userData?.lastName || ''}`}
          profilePhoto={userData?.profilePhoto}
        />
        <Box
          sx={{
            alignSelf: 'flex-end'
          }}>
          <Button type='button' icon variant='text'>
            <Icon name='premium' w={24} h={24} />
          </Button>
          <EditIntro />
          <Button type='button' icon variant='text'>
            <Icon name='setting' w={24} h={24} />
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
          <Typography sx={{ color: 'gray.600', fontWeight: 'medium', fontSize: '16px' }} variant='caption'>
            {userData?.job}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
            {userData?.country ? (
              <>
                <Typography sx={{ color: 'gray.500', fontSize: '14px', fontWeight: 400 }}>
                  {`${userData?.country} ${userData?.city || ''}`}
                </Typography>
                <Typography sx={{ color: 'gray.500', fontSize: '14px', fontWeight: 400 }}>∙</Typography>
              </>
            ) : null}
            <ContactInfo userData={userData} />
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
          <Box
            component={Link}
            sx={{
              textDecoration: 'none',
              mt: '4px',
              fontSize: '14px',
              color: 'primary.500',
              fontWeight: 'medium'
            }}
            href='/profile/subscribed'>
            {`${subscribed || 0} subscribed`}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
