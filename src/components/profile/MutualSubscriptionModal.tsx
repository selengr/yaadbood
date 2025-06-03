"use client"
import { Avatar, Box, Link, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGetMutualFollowings } from '@/hooks/user/useGetMutualFollowings';
import { useRemoveFollowReq } from '@/hooks/user/useRemoveFollowReq';

import Button from '../atoms/Button/Button';
import DotPulse from '../atoms/DotSpinner/style';
import Modal from '../atoms/Modal/Modal';
import SubscriptionOptions from './SubscriptionOptions';

type UndoState = { [key: string]: NodeJS.Timeout };

interface MutualSubscriptionModalProps {
  mutualModal: boolean;
  setMutualModal: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
}

const MutualSubscriptionModal = ({ setMutualModal, mutualModal, username }: MutualSubscriptionModalProps) => {
  const [undoStates, setUndoStates] = useState<UndoState>({});
  const mutualConnections = useGetMutualFollowings({ username });

  const queryClient = useQueryClient();
  const router = useRouter();
  const removeFollowReq = useRemoveFollowReq({
    onSuccess: (removed: any) => {
      router.refresh();
      queryClient.setQueryData(['userMutualFollowingsData', undefined, undefined, username], (oldData: any) =>
        oldData?.filter((conn: any) => conn._id !== removed?.data?.id)
      );
    }
  });

  const handleUnsubscribe = (id: string) => {
    const timeout = setTimeout(() => {
      removeFollowReq.mutate({ id });
      removeUndoState(id);
    }, 2000);
    setUndoStates((prev) => ({ ...prev, [id]: timeout }));
  };

  const handleUndo = (id: string) => {
    if (undoStates[id]) {
      clearTimeout(undoStates[id]);
      removeUndoState(id);
    }
  };

  const removeUndoState = (id: string) => {
    setUndoStates((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const isUndoing = (id: string) => !!undoStates[id];

  if (mutualConnections?.isLoading) {
    return (
      <Modal open={mutualModal} onClose={() => setMutualModal(false)} title='Mutual Friends'>
        <LoadingSpinner />
      </Modal>
    );
  }

  return (
    <Modal open={mutualModal} onClose={() => setMutualModal(false)} title='Mutual Friends' fullScreenOnMobile>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', width: { xs: '100%', md: '644px' } }}>
        {mutualConnections?.data?.map((following) => (
          <MutualFriendItem
            key={following._id}
            following={following}
            isUndoing={isUndoing(following._id)}
            onUnsubscribe={() => handleUnsubscribe(following._id)}
            onUndo={() => handleUndo(following._id)}
          />
        ))}
      </Box>
    </Modal>
  );
};

const MutualFriendItem = ({
  following,
  isUndoing,
  onUnsubscribe,
  onUndo
}: {
  following: any; // Replace `any` with the proper type for your following object
  isUndoing: boolean;
  onUnsubscribe: () => void;
  onUndo: () => void;
}) => (
  <Box
    sx={(theme) => ({
      padding: { xs: '8px', sm: '8px 20px' },
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      borderBottom: '1px solid',
      borderColor: theme.palette.gray['100'],
      opacity: isUndoing ? 0.5 : 1,
      transition: 'opacity 0.3s ease-out'
    })}>
    <Link href={`/c/${following?.target?.username}`}>
      <Avatar sx={{ width: '48px', height: '48px' }} src={following?.target?.profilePhoto} />
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
          fontWeight: 500,
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
    </Link>
    <Box
      sx={{
        ml: 'auto',
        alignSelf: 'center',
        display: 'flex',
        gap: { xs: 0, sm: 1 },
        alignItems: 'center'
      }}>
      {isUndoing ? (
        <ActionButton label='Subscribe' onClick={onUndo} />
      ) : (
        <ActionButton label='Subscribed' onClick={onUnsubscribe} />
      )}
      <SubscriptionOptions userData={following?.target} />
    </Box>
  </Box>
);

const ActionButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <Button
    onClick={onClick}
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
    {label}
  </Button>
);

const LoadingSpinner = () => (
  <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
    <DotPulse
      sx={{
        color: 'primary.main',
        '&::before': { color: 'primary.main' },
        '&::after': { color: 'primary.main' }
      }}
    />
  </Box>
);

export default MutualSubscriptionModal;
