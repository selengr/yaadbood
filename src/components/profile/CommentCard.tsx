import { Box, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

import { Post } from '@/types/posts';

import CommentOptions from './CommentOptions';

const CommentCard = ({ post }: { post: Post }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Box
        sx={{
          padding: '12px 0',
          borderBottom: '1px solid #e2e8f0'
        }}>
        <Box
          sx={{
            fontSize: '14px',
            padding: '12px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
          <Typography
            variant='caption'
            sx={{
              fontWeight: '500',
              color: '#475569'
            }}>
            {post?.user?.username}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: 'gray.500',
              fontWeight: 400,
              fontSize: '12px'
            }}>
            ∙ {moment(post?.createdAt).fromNow()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Typography
              variant='body1'
              sx={{
                fontWeight: '500',
                color: 'gray.600'
              }}>
              {post?.title}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                fontSize: '14px',
                color: 'gray.600'
              }}>
              {post?.description}
            </Typography>
          </Box>
          <CommentOptions post={post} />
        </Box>
      </Box>
    </Box>
  );
};

export default CommentCard;
