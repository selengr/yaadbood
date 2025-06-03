import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import Button from '@/components/atoms/Button/Button';

const Trend = () => {
  const coins = [
    {
      name: 'BTC',
      value: '91,383.46',
      icon: '/images/common/btc.svg'
    },
    {
      name: 'BTC',
      value: '91,383.46',
      icon: '/images/common/btc.svg'
    },
    {
      name: 'BTC',
      value: '91,383.46',
      icon: '/images/common/btc.svg'
    },
    {
      name: 'BTC',
      value: '91,383.46',
      icon: '/images/common/btc.svg'
    },
    {
      name: 'BTC',
      value: '91,383.46',
      icon: '/images/common/btc.svg'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'neutrals.content',
        p: '8px 12px',
        borderRadius: '6px',
        overflow: 'hidden',
        gap: '12px'
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Trends</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '2px',
            gap: '2px',
            backgroundColor: 'neutrals.page',
            borderRadius: '6px'
          }}>
          <Button
            sx={{
              height: '22px',
              padding: '2px 4px',
              minHeight: '22px',
              color: 'gray.700',
              fontWeight: 400,
              borderRadius: '4px',
              backgroundColor: 'neutrals.content',
              '&:hover': {
                backgroundColor: 'neutrals.content'
              }
            }}
            variant='contained'>
            Crypto
          </Button>
          <Button
            sx={{
              height: '22px',
              padding: '2px 4px',
              minHeight: '22px',
              color: 'gray.500',
              '&:hover': {
                color: 'gray.400'
              },
              fontWeight: 400,
              borderRadius: '4px',
              backgroundColor: 'transparent'
            }}
            variant='contained'>
            Forex
          </Button>
          <Button
            sx={{
              height: '22px',
              padding: '2px 4px',
              minHeight: '22px',
              color: 'gray.500',
              '&:hover': {
                color: 'gray.400'
              },
              fontWeight: 400,
              borderRadius: '4px',
              backgroundColor: 'transparent'
            }}
            variant='contained'>
            Local
          </Button>
        </Box>
      </Box>
      {coins?.map((coin, coinIdx) => (
        <Box
          key={`coinTopList${coinIdx}`}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'gray.700',
            fontSize: '12px',
            fontWeight: 500,
            opacity: '0.5'
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
            {coinIdx + 1} <Image src={coin?.icon} width={20} height={20} alt={`${coin?.name} image`} />
            {coin?.name}
          </Box>
          <Typography
            sx={{
              color: 'gray.700',
              fontSize: '12px',
              fontWeight: 500
            }}>
            ${coin?.value}
          </Typography>
          <Image src={'/images/common/Chart.svg'} width={56} height={20} alt={`${coin?.name} image`} />
        
        </Box>
      ))}
    </Box>
  );
};

export default Trend;
