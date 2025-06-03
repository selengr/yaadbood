'use client';

import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import Button from '@/components/atoms/Button/Button';

const UserAboutSection = ({ description }: { description?: string }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = 28;
      const maxHeight = lineHeight * 4;
      setIsOverflowing(textRef.current.scrollHeight > maxHeight);
    }
  }, [description]);

  const toggleExpanded = () => setExpanded(true);

  return (
    <Box
      component='section'
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '18px',
        borderRadius: '6px'
      }}>
      <Box
        component='header'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 0'
        }}>
        <Typography
          variant='h1'
          sx={{
            color: 'gray.700',
            fontWeight: 500,
            fontSize: '20px'
          }}>
          About
        </Typography>
      </Box>
      <Box component='main'>
        <Typography
          ref={textRef}
          variant='caption'
          sx={{
            color: 'gray.500',
            fontSize: '16px',
            lineHeight: '28px',
            fontWeight: 400,
            overflow: expanded ? 'visible' : 'hidden',
            textOverflow: expanded ? 'initial' : 'ellipsis',
            display: expanded || !description || description.length <= 100 ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'none' : 4,
            WebkitBoxOrient: 'vertical',
            position: 'relative'
          }}>
          {description}
          {!expanded && isOverflowing ? (
            <Button
              variant='text'
              onClick={toggleExpanded}
              sx={{
                position: 'absolute',
                bottom: -5,
                right: 0,
                // transform: 'translateY(50%)',
                color: 'gray.900',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 400,
                backgroundColor: '#fff',
                padding: '0 4px',
                marginLeft: '4px',
                '&:hover': {
                  backgroundColor: '#fff',
                  textDecoration: 'underline'
                }
              }}>
              more
            </Button>
          ) : null}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserAboutSection;
