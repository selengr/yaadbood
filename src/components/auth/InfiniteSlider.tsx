'use client';
// TODO: This code can be updated according to our new standard at an appropriate time

import { Avatar, Box, Stack, Typography } from '@mui/material';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface Data {
  avatar: string;
  name: string;
  message: string;
  time: string;
}

const InfiniteSlider = ({ duration = 30, data }: { duration?: number; data: Data[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = Array.from(slider.children) as HTMLDivElement[];
    const slideWidth = slides[0].offsetWidth;

    const totalWidth = slideWidth * slides.length;

    // Set initial position
    gsap.set(slider, { x: 0 });

    gsap.to(slider, {
      x: `-=${totalWidth / 2}`,
      duration,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        x: (x: string) => `${parseFloat(x) % totalWidth}px` // Ensures seamless infinite scrolling
      }
    });
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}>
      <Box
        ref={sliderRef}
        sx={{
          gap: '16px',
          display: 'flex',
          whiteSpace: 'nowrap',
        }}>
        {/* Duplicate slides to ensure infinite effect */}
        {[...data, ...data].map((post, index) => (
          <Stack
            direction={'row'}
            spacing={2}
            key={index}
            sx={{
              p: '12px',
              minWidth: 272,
              maxWidth: 272,
              overflow: 'hidden',
              bgcolor: 'white',
              borderRadius: '12px',
            }}>
            <Box>
              <Avatar src={post.avatar} sx={{ width: 32, height: 32 }} />
            </Box>

            <Stack direction='column' sx={{  }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography sx={{ fontSize: '14px', color: '#334155', fontWeight: 400 }} >
                  {post.name}
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#64748B', fontWeight: 300 }} >
                  3h ago
                </Typography>
              </Box>

              <Typography
                sx={{
                  textWrap: 'wrap',
                  fontSize: '12px',
                  color: '#64748B',
                  fontWeight: 300,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {post.message}
              </Typography>

            </Stack>
          </Stack>
        ))}
      </Box>
    </Box >
  );
};

export default InfiniteSlider;
