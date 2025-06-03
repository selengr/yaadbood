'use client';
// TODO: This code can be updated according to our new standard at an appropriate time

import { Box, Stack } from '@mui/material';

import InfiniteSlider from './InfiniteSlider';
import { data } from './InfiniteSliderData';

const InfiniteSliderContainer = () => {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      spacing={2}
      sx={{
        position: 'relative',
        py: {xs:4,lg:2,xl:2},
        height: {xs:'auto',lg:'100vh'},
        userSelect: 'none',
        border: '0px solid red',
        overflow:'clip'
      }}>
      <InfiniteSlider duration={200} data={data.slice(0, 10)} />
      <InfiniteSlider duration={300} data={data.slice(10, 20)} />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <InfiniteSlider duration={350} data={data.slice(20, 30)} />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <InfiniteSlider duration={250} data={data.slice(40, 50)} />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <InfiniteSlider duration={400} data={data.slice(50, 60)} />
      </Box>
      <Box sx={{ display: { xs: 'none', xl: 'flex' } }}>
        <InfiniteSlider duration={500} data={data.slice(30, 40)} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: { xs: '0%', md: '40%' },
          zIndex: 1,
          top: '-20px',
          right: 0,
          bottom: 0,
          background: (theme) =>
            `linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), #F5F6FA)`
        }}
      />
    </Stack>
  );
};

export default InfiniteSliderContainer;
