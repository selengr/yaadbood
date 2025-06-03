import {
  alpha,
  Backdrop,
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';


import CreateNewTweet from '@/components/post/CreateNewTweet';
import EditUnderlineIcon from '@/components/atoms/Icon/icons/EditUnderlineIcon';
import ChartTweetIcon from '@/components/atoms/Icon/icons/ChartTweetIcon';
import SearchIcon from '@/components/atoms/Icon/icons/SearchIcon';
import SubscribersIcon from '@/components/atoms/Icon/icons/SubscribersIcon';
import AcademyIcon from '@/components/atoms/Icon/icons/AcademyIcon';
import ProfileIcon from '@/components/atoms/Icon/icons/ProfileIcon';
import CloseIcon from '@/components/atoms/Icon/icons/CloseIcon';
import PlusIcon from '@/components/atoms/Icon/icons/PlusIcon';

const menuItems = [
  {
    title: 'Tweet',
    icon: <EditUnderlineIcon />
  },
  {
    title: 'Chart',
    icon: <ChartTweetIcon />
  }
];

export default function BottomNavigation() {
  const theme = useTheme();
  const [newTweet, setNewTweet] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleClick = () => {
    setNewTweet((old) => !old);
  };
  const handleClose = () => {
    setNewTweet(false);
  };
  const createWaveSvg = (width: number, color: string) => {
    const encodedColor = encodeURIComponent(color);
    return `data:image/svg+xml,%3Csvg width='100%' height='72' viewBox='0 0 ${width} 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 25 H${width * 0.35} C${width * 0.4} 25, ${width * 0.45} 50, ${width * 0.5} 50 C${width * 0.55} 50, ${width * 0.6} 25, ${width * 0.65} 25 H${width} V72 H0 V25z' fill='${encodedColor}'/%3E%3C/svg%3E`;
  };
  const createContentWaveSvg = (width: number, color: string) => {
    const encodedColor = encodeURIComponent(color);
    const radius = 16; // Adjust radius size as needed
    return `data:image/svg+xml,%3Csvg width='100%' height='100' viewBox='0 0 ${width} 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 H${width} V${80 - radius} Q${width} 80 ${width - radius} 80 H${width * 0.65} C${width * 0.6} 80, ${width * 0.55} 50, ${width * 0.5} 50 C${width * 0.45} 50, ${width * 0.4} 80, ${width * 0.35} 80 H${radius} Q0 80 0 ${80 - radius} V0' fill='${encodedColor}'/%3E%3C/svg%3E`;
  };
  const [newTweetDrawer, setNewTweetDrawer] = useState(false);
  const onNewTwwet = () => {
    setNewTweet(false);
    setTimeout(() => {
      setNewTweetDrawer(true);
    }, 100);
  };
  const handleCloseDrawer = () => {
    setNewTweetDrawer(false);
  };
  return (
    <Box sx={{ height: { xs: '72px', sm: '0px' } }}>
      <Backdrop
        open={newTweet}
        onClick={handleClose}
        sx={{
          zIndex: theme.zIndex.drawer - 4,
          backgroundColor: alpha(theme.palette.gray[900], 0.5)
        }}
      />
      <Slide direction='up' in={newTweet} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: '42px',
            height: 'auto',
            left: 5,
            right: 5,
            zIndex: theme.zIndex.drawer - 2,
            borderRadius: theme.spacing(2),
            overflow: 'hidden'
          }}>
          <Stack
            sx={{
              width: '100%',
              background: 'transparent',
              backgroundImage: `url("${createContentWaveSvg(windowWidth, theme.palette.neutrals.content)}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom',
              backgroundSize: '100%'
            }}>
            <List
              sx={{
                paddingX: theme.spacing(2),
                paddingBottom: theme.spacing(3),
                paddingTop: theme.spacing(0.5)
              }}>
              {menuItems.map((item) => (
                <ListItem
                  disableGutters
                  sx={{
                    background: 'transparent',

                    ':hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                  key={item.title}
                  disablePadding>
                  <ListItemButton
                    onClick={onNewTwwet}
                    sx={{
                      padding: theme.spacing(0),
                      fontSize: theme.typography.caption.fontSize,
                      ':hover': {
                        backgroundColor: 'transparent'
                      }
                    }}>
                    <ListItemIcon
                      sx={{
                        minWidth: '32px'
                      }}>
                      {item.icon &&
                        React.cloneElement(item.icon, {
                          sx: { fontSize: '20px', color: theme.palette.gray[600] }
                        })}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ fontSize: theme.typography.caption.fontSize, color: theme.palette.gray[600] }}
                      primary={item.title}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Box>
      </Slide>
      <Box
        sx={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          height: '72px',
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'end',
          justifyContent: 'center',
          zIndex: theme.zIndex.drawer - 2,
          backgroundColor: 'transparent',
          backgroundImage: `url("${createWaveSvg(windowWidth, theme.palette.neutrals.content)}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: '100% 72px'
        }}>
        {/* <Box position={'relative'}> */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '44px'
          }}>
          <Link
            href='/explore'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: theme.palette.gray[500],
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              svg: {
                stroke: theme.palette.gray[500],
                width: '20px',
                height: '20px'
              }
            }}
            flexDirection={'column'}
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            gap={0.5}>
            <SearchIcon />
            Explore
          </Link>
          <Link
            href='/profile/subscriptions'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: theme.palette.gray[500],
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              svg: {
                stroke: theme.palette.gray[500],
                width: '20px',
                height: '20px'
              }
            }}
            flexDirection={'column'}
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            gap={0.5}>
            <SubscribersIcon width={18} height={18} />
            Subscriptions
          </Link>
          <Box flex={1} />
          <Link
            href='#'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: theme.palette.gray[500],
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              svg: {
                stroke: theme.palette.gray[500],
                width: '20px',
                height: '20px'
              }
            }}
            flexDirection={'column'}
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            gap={0.5}>
            <AcademyIcon />
            Academy
          </Link>
          <Link
            href='/profile'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: theme.palette.gray[500],
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              svg: {
                stroke: theme.palette.gray[500],
                width: '20px',
                height: '20px'
              }
            }}
            flexDirection={'column'}
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            gap={0.5}>
            <ProfileIcon />
            Profile
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '32px',
          width: '100%',
          flex: 1,
          display: { xs: 'flex', sm: 'none', md: 'none' },
          justifyContent: 'center',
          zIndex: theme.zIndex.drawer - 2
        }}>
        <IconButton
          onClick={handleClick}
          size='large'
          sx={{
            backgroundColor: theme.palette.neutrals.content,
            '&:hover': {
              backgroundColor: theme.palette.neutrals.content
            },
            boxShadow: '0px 10px 40px 0px rgba(138, 158, 168, 0.25)',
            svg: {
              stroke: newTweet ? theme.palette.primary.main : theme.palette.gray[600],
              width: '24px',
              height: '24px'
            }
          }}>
          {newTweet ? <CloseIcon /> : <PlusIcon />}
        </IconButton>
      </Box>
      <CreateNewTweet open={newTweetDrawer} onClose={handleCloseDrawer} />
    </Box>
  );
}
