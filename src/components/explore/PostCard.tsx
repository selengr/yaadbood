import { Avatar, Box, Divider, Link, Typography } from '@mui/material';

import { Post } from '@/app/(pages)/(backNav)/(pathnameNav)/explore/page';

import BookmarkIcon from '../../../public/icons/explore/comments/Bookmark.svg';
import GlobIcon from '../../../public/icons/explore/comments/global.svg';
import HeartIcon from '../../../public/icons/explore/comments/heart.svg';
import MessagesIcon from '../../../public/icons/explore/comments/messages-2.svg';
import MessagesOutlinedIcon from '../../../public/icons/explore/comments/messages-2-outlined.svg';
import SendOutlinedIcon from '../../../public/icons/explore/comments/send-2-outlined.svg';
import Button from '../atoms/Button/Button';
import CommentInput from './CommentInput';
import PostCardDescription from './PostCardDescription';
import VerifyIcon from '../atoms/Icon/icons/VerifyIcon';
import { PostOptions } from '@/components/profile/Activity/components/PostCard/components';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <Avatar sx={{ width: '48px', height: '48px' }} src={post?.userProfile} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, svg: { width: '16px', height: '16px' } }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, color: 'gray.700' }}>
              {post?.firstName || ''} {post?.lastName || ''}
            </Typography>
            <VerifyIcon />
          </Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: 'gray.500' }}>
            {post?.jobTitle}
          </Typography>
        </Box>
        <Button
          variant='text'
          sx={{ p: 0.75, ml: 'auto', alignSelf: 'start', height: '24px', minHeight: '24px', mr: -1 }}>
          + Subscribe
        </Button>
        <PostOptions post={post as any} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', pl: { lg: '60px' }, pb: '12px' }}>
        <PostCardDescription description={post?.description} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'end', gap: '4px' }}>
            <Box sx={{ alignSelf: 'center', pr: '4px', height: '22px' }}>
              <MessagesIcon />
            </Box>
            {post?.followers?.slice(0, 8)?.map((postCommentedUsers, postCommentedUsersIdx) => (
              <Link
                href={`#`}
                key={`postCommentedUsers${postCommentedUsersIdx}`}
                sx={{ display: 'inline-block' }}>
                <Avatar
                  src={postCommentedUsers?.avatar}
                  sx={{
                    width: '32px',
                    height: '32px',
                    transition: 'transform 0.3s ease 0.1s, margin 0.3s ease 0.1s',
                    transformOrigin: 'bottom',
                    '&:hover': {
                      transform: 'scale(2)',
                      marginX: '10px' // Adds spacing when hovered
                    }
                  }}
                />
              </Link>
            ))}
            <Typography
              sx={{
                border: '1px solid',
                borderColor: 'gray.200',
                borderRadius: 9999,
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'gray.500',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '18px'
              }}>
              +{post?.followers?.length - 8}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 0.25 }}>
            <GlobIcon />
            <Typography color='gray' sx={{ fontSize: '14px' }}>
              ∙
            </Typography>
            <Box
              sx={{
                textDecoration: 'none',
                fontSize: '12px',
                color: 'gray.500'
              }}>
              6mo ago
            </Box>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'gray.200' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <Button
            variant='text'
            color='gray.500'
            sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 500 }}>
            <HeartIcon />
            254.5K
          </Button>
          <Button
            variant='text'
            color='gray.500'
            sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 500 }}>
            <MessagesOutlinedIcon />
            254.5K
          </Button>
          <Button
            variant='text'
            color='gray.500'
            sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 500 }}>
            <SendOutlinedIcon />
          </Button>
          <Button
            variant='text'
            color='gray.500'
            sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 500 }}>
            <BookmarkIcon />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar sx={{ width: '32px', height: '32px' }} />
          <CommentInput />
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
