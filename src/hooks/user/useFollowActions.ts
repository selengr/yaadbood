'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useRemoveFollowReq, useCreateFollowReq } from '@/hooks/user';

export const useFollowActions = (onToggle?: () => void) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
      onToggle?.();
    });
  };

  const { mutate: createFollow, isPending: isCreating } = useCreateFollowReq({
    onSuccess: handleSuccess,
  });

  const { mutate: removeFollow, isPending: isRemoving } = useRemoveFollowReq({
    onSuccess: handleSuccess,
  });

  const isLoading = isCreating || isRemoving || isPending;

  const handleFollowAction = (isCurrentlyFollowing: boolean, userId: string, followId?: string) => {
    if (isCurrentlyFollowing) {
      removeFollow({ id: "6825c5a755c32c9a0d3d41b9" });
    } else {
      createFollow({ targetId: "6825c5a755c32c9a0d3d41b9" });
    }
  };

  return {
    handleFollowAction,
    isLoading,
  };
};