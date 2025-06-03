import { Avatar, Box, Button, List, ListItem, Paper, Popper, Typography } from '@mui/material';
import React, { useRef } from 'react';

import { useOnClickOutside } from '@/hooks/util/useOnClickOutside';
import { Subscription } from '@/types/subscriptions';

const MentionSuggestionBox = ({
  followings,
  handleClose,
  handleSelectMention,
  popperAnchor
}: {
  handleClose: () => void;
  popperAnchor: { top: number; left: number } | null;
  followings: Subscription[];
  handleSelectMention: (username: string) => void;
}) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(calendarRef, handleClose);

  return (
    <Popper
      ref={calendarRef}
      open={true}
      anchorEl={null}
      placement='bottom-start'
      style={{
        position: 'absolute',
        top: `${popperAnchor?.top}px`,
        left: `${popperAnchor?.left}px`,
        zIndex: 1000000000000004
      }}>
      <Paper
        sx={{
          boxShadow: '0px 10px 40px 0px #8A9EA840',
          borderRadius: '6px',
          py: 0,
          width: '220px',
          maxHeight: '212px',
          overflowY: 'auto',
          pr: '2px',
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
        <List sx={{ px: 0, py: '6px' }}>
          {followings?.map((follower, index) => (
            <ListItem
              sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 0.5, py: 1.5, borderRadius: 0 }}
              key={index}
              component={Button}
              onClick={() => handleSelectMention(follower?.target?.username)}>
              <Avatar
                src={follower?.target?.profilePhoto}
                sx={{ width: { xs: '24px', lg: '40px' }, height: { xs: '24px', lg: '40px' } }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, color: 'gray.700' }}>
                  {follower?.target?.firstName || ''} {follower?.target?.lastName || ''}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'gray.500'
                  }}>
                  {follower?.target?.job}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Popper>
  );
};

export default MentionSuggestionBox;
