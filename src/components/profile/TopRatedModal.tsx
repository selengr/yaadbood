import { Box, IconButton, Link, Typography, useMediaQuery } from '@mui/material';

import { TopUser } from '@/types/subscriptions';

import Avatar from '../atoms/Avatar';
import Modal from '../atoms/Modal/Modal';
import TopRatedModalSubscribeButton from './TopRatedModalSubscribeButton';

const TopRatedModal = ({
  setTopRatedModal,
  topRatedModal,
  topUsers,
  myUsername
}: {
  topRatedModal: boolean;
  setTopRatedModal: React.Dispatch<React.SetStateAction<boolean>>;
  topUsers: TopUser[] | undefined;
  myUsername: string | undefined;
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Modal
      open={topRatedModal}
      onClose={() => setTopRatedModal(false)}
      title={isMobile ? undefined : 'Top Rated on Tradido'}
      fullScreenOnMobile>
      <Box
        sx={{
          maxHeight: { xs: 'calc(100dvh - 24px)', md: '448px' },
          overflowY: 'auto',
          width: { xs: '100%', md: '744px' },
          pr: '8px',
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#CBD5E1 ',
            borderRadius: '99px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#CBD5E1'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            borderRadius: '99px'
          },
          '&::-webkit-scrollbar-track:hover': {
            backgroundColor: 'transparent'
          },
          '&::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#CBD5E1'
          }
        }}>
        <Box
          sx={{
            display: isMobile ? 'flex' : 'none',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderBottomColor: 'gray.200',
            padding: '12px'
          }}>
          <IconButton onClick={() => setTopRatedModal(false)} sx={{ p: 1 }}>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.0002 13.28L5.65355 8.9333C5.14022 8.41997 5.14022 7.57997 5.65355 7.06664L10.0002 2.71997'
                stroke='#64748B'
                strokeWidth='1.5'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </IconButton>
          <Typography sx={{ fontSize: '18px', fontWeight: 600, mx: 'auto' }}>Top Rated on Tradido</Typography>
        </Box>
        {topUsers?.map((topUser) => (
          <Box
            key={`topUserModal${topUser?.id}`}
            sx={(theme) => ({
              paddingY: '8px',
              borderBottom: '1px solid',
              borderColor: theme.palette.gray['200'],
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            })}>
            <Link href={myUsername === topUser?.username ? '/profile' : `/c/${topUser?.username}`}>
              <Avatar width={40} height={40} image={topUser?.profilePhoto} />
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'column', mr: 'auto', ml: '8px' }}>
              <Link
                href={myUsername === topUser?.username ? '/profile' : `/c/${topUser?.username}`}
                sx={(theme) => ({
                  textDecoration: 'none',
                  color: theme.palette.gray['700'],
                  wordBreak: 'break-word',
                  whiteSpace: 'wrap'
                })}>
                {`${topUser?.firstName || ''} ${topUser?.lastName || ''}`}
              </Link>
              <Typography
                sx={(theme) => ({
                  color: theme.palette.gray['500'],
                  fontSize: '12px',
                  fontWeight: 400
                })}>
                {topUser?.job}
              </Typography>
            </Box>
            {myUsername !== topUser?.username ? <TopRatedModalSubscribeButton topUser={topUser} /> : null}
            <Link
              href={myUsername === topUser?.username ? '/profile' : `/c/${topUser?.username}`}
              sx={{
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '35px',
                fontSize: '12px',
                color: 'gray.500',
                lineHeight: '15px',
                padding: '2.5px 9.5px',
                backgroundColor: 'transparent',
                height: '25px',
                minHeight: '25px',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'medium',
                flexShrink: 0
              }}>
              {myUsername === topUser?.username ? 'My' : 'View'} Profile
            </Link>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default TopRatedModal;
