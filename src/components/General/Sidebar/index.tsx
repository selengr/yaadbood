'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // اضافه شد

import * as S from './Styles';
import Trend from './Trend';
import SubscribersIcon from '@/components/atoms/Icon/icons/SubscribersIcon';
import SearchIcon from '@/components/atoms/Icon/icons/SearchIcon';
import ProfileIcon from '@/components/atoms/Icon/icons/ProfileIcon';
import AcademyIcon from '@/components/atoms/Icon/icons/AcademyIcon';

const menuList = [
  {
    icon: <SubscribersIcon />,
    link: '/profile/subscriptions',
    name: 'Subscriptions'
  },
  {
    icon: <SearchIcon />,
    link: '/explore',
    name: 'Explore'
  },
  {
    icon: <ProfileIcon />,
    link: '/profile',
    name: 'Profile'
  },
  {
    icon: <AcademyIcon />,
    link: '#',
    name: 'Academy'
  }
];

const Sidebar = () => {
  const [pathname] = usePathname().split('?');

  return (
    <Box
      sx={{
        alignSelf: 'start',
        width: '270px',
        minWidth: '270px',
        position: 'sticky',
        top: '88px',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'neutrals.content',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
        <Image
          src='/imgs/sidebarImage.jpg'
          width={270}
          height={300}
          alt='sidebar banner'
          style={{ width: '100%', borderRadius: '0px 0px 6px 6px' }}
          loading='lazy'
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
            gap: '8px',
            pb: 0
          }}>
          {menuList.map((item) => {
            return (
              <Link href={item.link} key={item.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                <S.Item isActive={item.link === pathname}>
                  {item.icon}
                  <Typography
                    sx={{ color: item.link === pathname ? 'gray.950' : 'gray.400', fontWeight: 400 }}>
                    {item.name}
                  </Typography>
                </S.Item>
              </Link>
            );
          })}
        </Box>
      </Box>
      <Trend />
      <Box sx={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', aspectRatio: '270/170' }}>
        <Image
          src={'/images/common/sideImage.jpeg'}
          width={270}
          height={170}
          alt='article banner'
          style={{ objectFit: 'cover' }}
        />
        <Typography
          sx={{
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 500,
            color: 'neutrals.content',
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            zIndex: 1
          }}>
          The title of the Academy article is displayed here.
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
