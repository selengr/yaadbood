'use client';

import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import Avatar from '@/components/atoms/Avatar';
import UserOptions from '@/components/user/UserOptions';
import UserSubButton from '@/components/user/UserSubButton';
import { UserState } from '@/types/auth';

const StickyUserCard = ({ userData }: { userData: UserState }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isStickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setStickyVisible(!entry.isIntersecting);
        }, 100); // Debounce to prevent rapid toggling
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' } // Adjust margins to stabilize behavior
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) observer.unobserve(currentSection);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* Sticky Card */}
      {isStickyVisible && (
        <Box
          sx={{
            position: 'sticky',
            top: { xs: 60, md: 70 },
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'white',
            boxShadow: '0px 10px 40px 0px #8A9EA840',
            borderBottomLeftRadius: '6px',
            borderBottomRightRadius: '6px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar width='40px' height='40px' image={userData?.profilePhoto} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
                {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
              </Typography>
              <Typography
                sx={{ color: 'gray.600', fontWeight: 500, fontSize: '12px', mt: '-4px' }}
                variant='caption'>
                {userData?.job}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <UserSubButton userData={userData} />
            <UserOptions userData={userData} />
          </Box>
        </Box>
      )}

      {/* Intersection Reference */}
      <div ref={sectionRef} style={{ height: '1px', visibility: 'hidden' }} />
    </>
  );
};

export default StickyUserCard;
