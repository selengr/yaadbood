import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useCreateFollowReq } from '@/hooks/user/useCreateFollowReq';
import { TopUser } from '@/types/subscriptions';

import Button from '../atoms/Button/Button';

const TopRatedModalSubscribeButton = ({ topUser }: { topUser: TopUser }) => {
  const queryClient = useQueryClient();
  const [undoStates, setUndoStates] = useState<{ [key: string]: NodeJS.Timeout }>({});

  const createFollowReq = useCreateFollowReq({
    onSuccess: () => {
      queryClient.setQueryData(['topRatedData'], (oldData: TopUser[] | undefined) =>
        oldData?.map((user) => (user.id === topUser?.id ? { ...user, isFollowed: !user.isFollowed } : user))
      );
    }
  });

  const handleSubscribe = (id: string) => {
    const timeout = setTimeout(() => {
      createFollowReq.mutate({ targetId: id });
      setUndoStates((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    }, 2000);

    setUndoStates((prev) => ({ ...prev, [id]: timeout }));
  };

  const handleUndo = (id: string) => {
    if (undoStates[id]) {
      clearTimeout(undoStates[id]);
      setUndoStates((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const isUndoing = (id: string) => Boolean(undoStates[id]);

  return (
    <>
      {createFollowReq?.isPending || topUser?.isFollowed ? null : isUndoing(topUser?.id) ? (
        <Button
          onClick={() => handleUndo(topUser?.id)}
          variant='outlined'
          sx={{
            border: '1px solid gray.200',
            borderRadius: '35px',
            fontSize: '12px',
            color: 'gray.500',
            lineHeight: '15px',
            padding: '2.5px 9.5px',
            backgroundColor: 'transparent',
            height: '25px',
            minHeight: '25px',
            flexShrink: 0
          }}>
          Subscribed
        </Button>
      ) : (
        <Button
          onClick={() => handleSubscribe(topUser?.id)}
          variant='outlined'
          sx={{
            border: '1px solid gray.200',
            borderRadius: '36px',
            fontSize: '12px',
            color: 'primary.500',
            lineHeight: '15px',
            padding: '2.5px 7px',
            backgroundColor: 'transparent',
            height: '25px',
            fontWeight: 500,
            minHeight: '25px',
            flexShrink: 0,
            '&:hover': {
              border: '1px solid gray.200',
              borderRadius: '36px',
              fontSize: '12px',
              fontWeight: 500,
              color: 'primary.500',
              lineHeight: '15px',
              padding: '2.5px 7px',
              backgroundColor: 'transparent',
              height: '25px',
              minHeight: '25px'
            }
          }}>
          Subscribe
        </Button>
      )}
    </>
  );
};

export default TopRatedModalSubscribeButton;
