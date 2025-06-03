import { Avatar, Box, Link, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

import Button from '@/components/atoms/Button/Button';
import { Subscription } from '@/types/subscriptions';

import SubscriptionOptions from '../SubscriptionOptions';

const SubscriptionsCard = ({
  following,
  undoStates,
  handleUndo,
  handleUnsubscribe
}: {
  following: Subscription;
  undoStates: { [key: string]: NodeJS.Timeout };
  handleUnsubscribe: (id: string) => void;
  handleUndo: (id: string) => void;
}) => {
  const isUndoing = (id: string) => Boolean(undoStates[id]);

  return (
    <Box
      sx={(theme) => ({
        padding: { xs: '8px', sm: '8px 20px' },
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: theme.palette.gray['100'],
        opacity: isUndoing(following._id) ? 0.5 : 1,
        transition: 'opacity 0.3s ease-out'
      })}>
      <Link href={`/c/${following?.target?.username}`}>
        <Avatar
          sx={{ width: { xs: '48px', sm: '72px' }, height: { xs: '48px', sm: '72px' } }}
          src={following?.target?.profilePhoto}
        />
      </Link>
      <Link
        href={`/c/${following?.target?.username}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none'
        }}>
        <Typography
          variant='h6'
          sx={(theme) => ({
            color: theme.palette.gray['700'],
            fontSize: '16px',
            lineHeight: '24px'
          })}>
          {`${following?.target?.firstName || ''} ${following?.target?.lastName || ''}`}
        </Typography>
        <Typography
          variant='caption'
          sx={(theme) => ({
            color: theme.palette.gray['500'],
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '18px'
          })}>
          {following?.target?.job}
        </Typography>
        <Typography
          variant='caption'
          sx={(theme) => ({
            color: theme.palette.gray['500'],
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '18px'
          })}>
          Subscribed {moment(following.createdAt).fromNow()}
        </Typography>
      </Link>
      <Box
        sx={{
          ml: 'auto',
          alignSelf: 'center',
          justifySelf: 'center',
          display: 'flex',
          gap: { xs: 0, sm: 1 },
          alignItems: 'center'
        }}>
        {isUndoing(following._id) ? (
          <Button
            onClick={() => handleUndo(following._id)}
            variant='outlined'
            sx={{
              width: { xs: '100%', lg: 'auto' },
              border: '1px solid gray.200',
              borderRadius: { xs: '6px', lg: '36px' },
              fontSize: '12px',
              color: { xs: '#ffffff', lg: 'primary.500' },
              lineHeight: '15px',
              padding: '2.5px 7px',
              backgroundColor: { xs: 'primary.500', lg: 'transparent' },
              height: '25px',
              fontWeight: 500,
              minHeight: '25px',
              '&:hover': {
                border: '1px solid gray.200',
                borderRadius: { xs: '6px', lg: '36px' },
                fontSize: '12px',
                fontWeight: 500,
                color: { xs: '#ffffff', lg: 'primary.500' },
                lineHeight: '15px',
                padding: '2.5px 7px',
                backgroundColor: { xs: 'primary.500', lg: 'transparent' },
                height: '25px',
                minHeight: '25px'
              }
            }}>
            Subscribe
          </Button>
        ) : (
          <Button
            onClick={() => handleUnsubscribe(following._id)}
            variant='outlined'
            sx={{
              border: '1px solid #e2e8f0',
              borderRadius: '35px',
              fontSize: '10px',
              color: '#64748b',
              lineHeight: '15px',
              padding: '2.5px 9.5px',
              backgroundColor: 'transparent',
              height: '25px',
              minHeight: '25px'
            }}>
            Subscribed
          </Button>
        )}
        <SubscriptionOptions userData={following?.target} />
      </Box>
    </Box>
  );
};

export default SubscriptionsCard;
