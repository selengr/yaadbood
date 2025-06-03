'use client';

import { Box, IconButton, Popover } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { Post } from '@/types/posts';
import { Icon } from '@/components/atoms';
import { useReportUser, useBlockUser, useRestrictUser } from '@/hooks/user';
import { useDeleteComment } from '@/hooks/comment';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const CommentOptions = ({ post }: { post: Post }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const client = useQueryClient();
  const { mutate: reportUser } = useReportUser();
  const { mutate: blockUser } = useBlockUser();
  const { mutate: restrictUser } = useRestrictUser();
  const { mutate: deleteComment } = useDeleteComment({
    onSuccess: (data: unknown) => {
      client.invalidateQueries({ queryKey: ['getUserContent'] });
      const response = data as { data: { message: string } };
      toast.success(response?.data?.message);
    }
  });

  const handleReport = () => {
    reportUser({ username: post.user.username, cat: 'Spam' });
  };

  const handleBlock = () => {
    blockUser(
      { username: post.user.username },
      {
        onSuccess: (data: unknown) => {
          const response = data as { data: { message: string } };
          toast.success(response?.data?.message);
        }
      }
    );
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRestrict = () => {
    restrictUser(
      { username: post.user.username },
      {
        onSuccess: (data: unknown) => {
          console.log('data', data);

          const response = data as { data: { message: string } };
          toast.success(response?.data?.message);
        }
      }
    );
  };

  const handleDelete = () => {
    deleteComment({ id: '67a37ff03aeddcf8ecef3893' });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          alignSelf: 'start',
          flexShrink: 0,
          aspectRatio: '1/1',
          width: '28px',
          height: '28px'
        }}>
        <Icon name='option' w={16} h={28} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        sx={{
          '& .MuiPaper-rounded': {
            borderRadius: '6px',
            boxShadow: '0px 16px 24px 0px #94A3B83D'
          }
        }}
        transformOrigin={{
          vertical: 'top', // Align the top of the popover with the bottom of the button
          horizontal: 'right' // Center the popover horizontally
        }}>
        <Box
          onClick={handleReport}
          sx={{
            fontSize: '14px',
            fontWeight: 'medium',
            cursor: 'pointer',
            color: 'gray.600',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            padding: '0px 16px',
            height: '40px',
            minHeight: '40px'
          }}>
          Report
        </Box>
        <Box
          onClick={handleRestrict}
          sx={{
            fontSize: '14px',
            fontWeight: 'medium',
            cursor: 'pointer',
            color: 'gray.600',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            padding: '0px 16px',
            height: '40px',
            minHeight: '40px'
          }}>
          Restrict
        </Box>
        <Box
          onClick={handleBlock}
          sx={{
            fontSize: '14px',
            fontWeight: 'medium',
            cursor: 'pointer',
            color: 'gray.600',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            padding: '0px 16px',
            height: '40px',
            minHeight: '40px'
          }}>
          Block
        </Box>
        <Box
          onClick={handleDelete}
          sx={{
            fontSize: '14px',
            fontWeight: 'medium',
            cursor: 'pointer',
            color: 'red.500',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            padding: '0px 16px',
            height: '40px',
            minHeight: '40px'
          }}>
          Remove
        </Box>
      </Popover>
    </>
  );
};

export default CommentOptions;
