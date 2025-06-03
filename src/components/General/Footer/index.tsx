'use client';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import Icon from '@/components/atoms/Icon';
import { lightColors } from '@/themes/colors';

import * as S from './Styles';

const links = [
  [
    { name: 'Explore', link: '/explore' },
    { name: 'Profile', link: '/profile' }
  ],
  [
    { name: 'Trends', link: '' },
    { name: 'Tweets', link: '' },
    { name: 'Charts', link: '' }
  ],
  [
    { name: 'Forex', link: '' },
    { name: 'Crypto', link: '' },
    { name: 'Stocks', link: '' },
    { name: 'Futures', link: '' },
    { name: 'Bonds', link: '' },
    { name: 'Indices', link: '' },
    { name: 'NFT', link: '' },
    { name: 'Metaverse', link: '' }
  ],
  [
    { name: 'دلار آمریکا', link: '' },
    { name: 'طلاگرمی', link: '' },
    { name: 'بورس', link: '' },
    { name: 'سکه طلا', link: '' },
    { name: 'ماشین', link: '' },
    { name: 'مسکن', link: '' }
  ],
  [
    { name: 'Partnership', link: '' },
    { name: 'Careers', link: '' },
    { name: 'FAQs', link: '' },
    { name: 'Contact Us', link: '' },
    { name: 'About Us', link: '' }
  ]
];

const Footer = () => {
  const [aboutStatus, setAboutStatus] = useState(false);

  return (
    <Box
      component='footer'
      sx={(theme) => ({
        backgroundColor: lightColors.gray['950'],
        padding: { xs: '48px 24px', lg: '48px 112px' },
        color: lightColors.gray['200'],
        transition: 'all .5s',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      })}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1360px'
        }}>
        <Box
          sx={(theme) => ({
            width: '100%',
            display: { xs: 'grid', sm: 'none' },
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '48px 24px',
            mb: '48px',
            gridTemplateColumns: '1fr 1fr'
          })}>
          {links.map((link, index) => {
            return (
              <Box key={`link-${index}`} sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {link.map((item) => {
                  return (
                    <S.LinkStyle key={item.name} href={item.link}>
                      <S.liStyle>{item.name}</S.liStyle>
                    </S.LinkStyle>
                  );
                })}
              </Box>
            );
          })}
        </Box>
        <Icon name='whiteLogo' />
        <Box
          sx={(theme) => ({
            display: 'flex',
            marginTop: '24px',
            gap: '92px',
            flexDirection: { xs: 'column', lg: 'row' }
          })}>
          <Box
            sx={(theme) => ({
              width: { xs: '100%', lg: '350px' },
              minWidth: { xs: '0px', lg: '350px' },
              backgroundColor: lightColors.gray['900'],
              padding: '16px',
              borderRadius: '16px',
              height: 'fit-content',
              transition: 'all .5s',
              maxHeight: { sx: aboutStatus ? '350px' : '250px', lg: aboutStatus ? '320px' : '250px' },
              overflow: 'hidden'
            })}>
            <Box
              sx={(theme) => ({
                overflow: 'hidden',
                height: '85%',
                transition: 'all .5s',
                maxHeight: aboutStatus ? '230px' : '180px',
                textAlign: 'justify',
                position: 'relative',
                [theme.breakpoints.down('md')]: {
                  maxHeight: aboutStatus ? '250px' : '180px'
                }
              })}>
              Welcome to{' '}
              <Link href='/' style={{ textDecoration: 'none' }}>
                <Typography
                  sx={(theme) => ({
                    display: 'inline',
                    color: lightColors.primary['500'],
                    textDecoration: 'underline'
                  })}>
                  Tradido
                </Typography>
              </Link>
              , the innovative social media platform transforming the way everyday people engage with the
              world of finance. In a realm where financial markets seem vast and complex, Tradido emerges as
              your ultimate navigator, providing clarity, guidance, and unparalleled access to insight from
              leading content creators and analysts within the fintech space.
              <Box
                sx={{
                  background: 'linear-gradient(transparent, #0F172A);',
                  position: 'absolute',
                  bottom: '0',
                  transition: 'all .5s',
                  width: '100%',
                  height: '100%',
                  maxHeight: aboutStatus ? '1px' : '146px'
                }}
              />
            </Box>
            <Box
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                color: lightColors.primary['500'],
                fontSize: '14px',
                fontWeight: 500,
                gap: '4px',
                cursor: 'pointer',
                marginTop: '16px'
              })}
              onClick={() => {
                setAboutStatus((prev) => !prev);
              }}>
              See {aboutStatus ? 'less' : 'more'}{' '}
              <Box
                sx={{
                  marginBottom: aboutStatus ? '' : '5px',
                  transition: 'all .5s',
                  transform: aboutStatus ? 'rotate(180deg)' : ''
                }}>
                <Icon name='arrowDown' w={12} h={12} iconStyle={{ stroke: '#1DA1F3 !important' }} />
              </Box>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              width: '100%',
              display: { xs: 'none', sm: 'grid', lg: 'flex' },
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '48px 24px',
              mb: { xs: '48px', lg: '0px' }
            })}>
            {links.map((link, index) => {
              return (
                <Box key={`link-${index}`} sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {link.map((item) => {
                    return (
                      <S.LinkStyle key={item.name} href={item.link}>
                        <S.liStyle>{item.name}</S.liStyle>
                      </S.LinkStyle>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: { xs: 'center', lg: 'left' },
            [theme.breakpoints.down('md')]: {
              marginTop: '45px'
            }
          })}>
          <Icon name='grayLinkedIn' w={18} h={18} />
          <Typography
            sx={(theme) => ({
              fontSize: '14px',
              color: lightColors.gray['300'],
              marginTop: '3px'
            })}>
            © 2022, All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
