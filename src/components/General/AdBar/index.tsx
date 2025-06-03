'use client';

import { Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';

import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import TopRated from '@/components/profile/TopRated';
import VerifyIcon from '@/components/atoms/Icon/icons/VerifyIcon';

const AdBar = ({
  showTopRated,
  display = 'flex'
}: {
  showTopRated?: boolean;
  display?: { xs: string; lg: string } | string;
}) => {
  return (
    <Box
      sx={(theme) => ({
        width: '270px',
        height: 'fit-content',
        minWidth: '270px',
        position: { lg: 'sticky' },
        top: '88px',
        display,
        flexDirection: { xs: 'column-reverse', sm: 'column' },
        justifyContent: 'space-between',
        [theme.breakpoints.down('lg')]: {
          width: '100%'
        }
      })}>
      <Box
        sx={(theme) => ({
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: theme.palette.neutrals['content'],
          display: 'flex',
          flexDirection: 'column'
        })}>
        <Box sx={{ padding: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '12px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar color='red' width={32} height={32} />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  svg: { width: '12px', height: '12px' }
                }}>
                <Typography lineHeight={'16px'} fontSize={14} fontWeight={500}>{`{Brand name}`}</Typography>
                <VerifyIcon />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Chip
                label='AD'
                size='small'
                sx={(theme) => ({
                  fontSize: '10px',
                  borderRadius: '4px',
                  padding: '1px 8px',
                  fontWeight: 500,
                  color: theme.palette.gray['400'],
                  backgroundColor: theme.palette.gray['100']
                })}
              />
              <Icon name='option' w={16} h={16} />
            </Box>
          </Box>
          <Typography sx={(theme) => ({ fontWeight: 500, color: theme.palette.gray['500'] })}>
            Title content is here
          </Typography>
          <Typography
            sx={(theme) => ({
              fontWeight: 400,
              fontSize: '14px',
              color: theme.palette.gray['400'],
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineClamp: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            })}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
            in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>
        <Image
          src='/imgs/rightBarImage.png'
          width={270}
          height={225}
          alt='sidebar banner'
          style={{ width: '100%', borderRadius: '0px 0px 6px 6px', objectFit: 'contain', overflow: 'hidden' }}
          loading='lazy'
        />
      </Box>
      {showTopRated ? <TopRated /> : null}
    </Box>
  );
};

export default AdBar;
