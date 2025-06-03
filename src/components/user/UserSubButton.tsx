'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { useCreateFollowReq } from '@/hooks/user/useCreateFollowReq';
import { useRemoveFollowReq } from '@/hooks/user/useRemoveFollowReq';
import { UserState } from '@/types/auth';

import Button from '../atoms/Button/Button';
import DotPulse from '../atoms/DotSpinner/style';

const UserSubButton = ({ userData }: { userData: UserState }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const createFollowReq = useCreateFollowReq({
    onSuccess: () => {
      startTransition(() => router.refresh());
    }
  });
  const removeFollowReq = useRemoveFollowReq({
    onSuccess: () => {
      startTransition(() => router.refresh());
    }
  });

  if (userData?.isFollowing)
    return (
      <Button
        onClick={() => removeFollowReq.mutate({ id: userData?.isFollowing })}
        disabled={removeFollowReq.isPending || createFollowReq.isPending || isPending}
        variant='outlined'
        sx={{
          border: '1px solid gray.200',
          borderRadius: '35px',
          fontSize: '14px',
          color: 'primary.500',
          borderColor: 'primary.500',
          lineHeight: '15px',
          padding: '2.5px 12px',
          height: '28px',
          minHeight: '28px',
          fontWeight: '400'
        }}>
        {removeFollowReq?.isPending ? (
          <Box
            sx={{
              padding: '2.5px 28px'
            }}>
            <DotPulse
              sx={{
                color: 'primary.main',
                '&::before': {
                  color: 'primary.main'
                },
                '&::after': {
                  color: 'primary.main'
                }
              }}
            />
          </Box>
        ) : (
          'Subscribed'
        )}
      </Button>
    );
  return (
    <Button
      onClick={() => createFollowReq.mutate({ targetId: userData?.id })}
      variant='contained'
      disabled={removeFollowReq.isPending || createFollowReq.isPending || isPending}
      sx={{
        border: '1px solid gray.200',
        borderRadius: '35px',
        fontSize: '14px',
        color: 'neutrals.content',
        backgroundColor: 'primary.500',
        lineHeight: '15px',
        padding: '2.5px 12px',
        height: '28px',
        minHeight: '28px',
        fontWeight: '400'
      }}>
      {createFollowReq?.isPending ? (
        <Box
          sx={{
            padding: '2.5px 28px'
          }}>
          <DotPulse />
        </Box>
      ) : (
        'Subscribe'
      )}
    </Button>
  );
};

export default UserSubButton;
