'use client';

import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import Button from '../atoms/Button/Button';

const PostCardDescription = ({ description }: { description: string }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = 28;
      const maxHeight = lineHeight * 3;
      const needOverflow = textRef.current.scrollHeight > maxHeight;
      setIsOverflowing(needOverflow);
      setExpanded(!needOverflow);
    }
  }, [description, textRef?.current?.scrollHeight]);

  const toggleExpanded = () => setExpanded(true);

  return (
    <>
      <Typography
        ref={textRef}
        variant='caption'
        sx={{
          color: 'gray.500',
          fontSize: '16px',
          lineHeight: '28px',
          fontWeight: 400,
          overflow: expanded ? 'visible' : 'hidden',
          textOverflow: 'ellipsis',
          display: expanded ? 'block' : '-webkit-box',
          WebkitLineClamp: expanded ? 'none' : 3,
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
      <Button
        variant='text'
        color='gray.400'
        sx={{ fontWeight: 500, fontSize: '12px', pl: { lg: '8px' }, alignSelf: 'start', mt: -2.5 }}>
        See translation
      </Button>
    </>
  );
};

export default PostCardDescription;
