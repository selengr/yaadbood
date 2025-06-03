'use client';
import { Box, Link, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { useTopRated } from '@/hooks/user/useTopRated';

import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button/Button';
import DotPulse from '../atoms/DotSpinner/style';
import Icon from '../atoms/Icon';
import TopRatedModal from './TopRatedModal';
import TopRatedSubscribeButton from './TopRatedSubscribeButton';
import ArrowRightIcon from '../atoms/Icon/icons/ArrowRightIcon';

const TopRated = () => {
  const { data } = useSession();
  const userData = data?.user;
  const myUsername = userData?.username;
  const topRated = useTopRated();
  const [topRatedModal, setTopRatedModal] = useState(false);

  return (
    <Box
      sx={{
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: { lg: 'neutrals.content' },
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
        padding: '12px'
      }}>
      <Typography
        sx={(theme) => ({
          fontWeight: 600,
          fontSize: { xs: '12px', lg: '20px' },
          color: theme.palette.gray['700'],
          mb: '12px'
        })}>
        Top Rated on Tradido
      </Typography>
      {topRated?.isLoading ? (
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
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { lg: 'column' },
              gap: { xs: '4px', lg: '12px' },
              overflowX: { xs: 'auto', lg: 'visible' },
              paddingBottom: { xs: '12px', lg: '0' },
              maxWidth: { xs: 'calc(100vw - 26px)', md: 'calc(100vw - 400px)' }
            }}>
            {topRated?.data?.slice(0, 4)?.map((topUser) => (
              <Box
                key={topUser?.id}
                sx={(theme) => ({
                  minWidth: { xs: '140px', lg: 'auto' },
                  padding: '8px',
                  borderBottom: '1px solid',
                  borderColor: theme.palette.gray['200'],
                  display: 'flex',
                  gap: '12px',
                  flexDirection: { xs: 'column', lg: 'row' },
                  alignItems: { xs: 'center', lg: 'stretch' },
                  backgroundColor: 'neutrals.content',
                  borderRadius: { xs: '8px', lg: '0px' }
                })}>
                <Link href={myUsername === topUser?.username ? '/profile' : `/c/${topUser?.username}`}>
                  <Avatar width={40} height={40} image={topUser?.profilePhoto} />
                </Link>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 'auto',
                    alignItems: { xs: 'center', lg: 'stretch' }
                  }}>
                  <Link
                    href={myUsername === topUser?.username ? '/profile' : `/c/${topUser?.username}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'gray.700',
                      fontWeight: 'medium',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      wordBreak: 'break-all',
                      textOverflow: 'ellipsis'
                    }}>
                    {`${topUser?.firstName || ''} ${topUser?.lastName || ''}`}
                  </Link>
                  <Typography
                    sx={{
                      color: 'gray.500',
                      fontSize: '12px',
                      fontWeight: 400,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 1, lg: 2 },
                      WebkitBoxOrient: 'vertical'
                    }}>
                    {topUser?.job}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: { xs: 'center', lg: 'end' },
                      alignItems: 'center',
                      mt: '5px'
                    }}>
                    {myUsername === topUser?.username ? (
                      <Link
                        href={'/profile'}
                        sx={{
                          textDecoration: 'none',
                          border: '1px solid #e2e8f0',
                          borderRadius: { xs: '6px', lg: '35px' },
                          fontSize: '10px',
                          color: 'gray.500',
                          lineHeight: '15px',
                          padding: '2.5px 7px',
                          backgroundColor: 'transparent',
                          height: { xs: '24px', lg: '20px' },
                          minHeight: { xs: '24px', lg: '20px' },
                          minWidth: '65px',
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: 'medium',
                          width: { xs: '100%', lg: 'auto' },
                          justifyContent: 'center'
                        }}>
                        My Profile
                      </Link>
                    ) : topUser?.isFollowed ? (
                      <Link
                        href={`/c/${topUser?.username}`}
                        sx={{
                          textDecoration: 'none',
                          border: '1px solid #e2e8f0',
                          borderRadius: { xs: '6px', lg: '35px' },
                          fontSize: '10px',
                          color: 'gray.500',
                          lineHeight: '15px',
                          padding: '2.5px 7px',
                          backgroundColor: 'transparent',
                          height: { xs: '24px', lg: '20px' },
                          minHeight: { xs: '24px', lg: '20px' },
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: 'medium',
                          width: { xs: '100%', lg: 'auto' },
                          minWidth: '65px',
                          justifyContent: 'center'
                        }}>
                        View Profile
                      </Link>
                    ) : (
                      <TopRatedSubscribeButton topUser={topUser} />
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
                minWidth: { xs: '140px', lg: 'auto' },
                padding: '8px',
                borderBottom: '1px solid',
                borderColor: 'gray.200',
                backgroundColor: 'neutrals.content',
                borderRadius: '8px'
              }}>
              <Button
                onClick={() => setTopRatedModal(true)}
                variant='text'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                <Icon name='arrowRightCircle' w={33} h={33} />
                <Typography sx={{ color: 'primary.500' }}>See more</Typography>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              mt: '12px'
            }}>
            <Button onClick={() => setTopRatedModal(true)} variant='text'>
              <Typography
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: '600',
                  fontSize: '12px',
                  color: 'gray.500',
                  minWidth: 'min-content',
                  whiteSpace: 'nowrap',
                  '& svg': {
                    width: '16px',
                    height: '16px',
                    stroke: `${theme.palette.gray[500]} !important`
                  }
                })}>
                See more
                <ArrowRightIcon />
              </Typography>
            </Button>
          </Box>
        </>
      )}
      <TopRatedModal
        topRatedModal={topRatedModal}
        setTopRatedModal={setTopRatedModal}
        topUsers={topRated?.data}
        myUsername={myUsername}
      />
    </Box>
  );
};

export default TopRated;
