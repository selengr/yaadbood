import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';

import { UserState } from '@/types/auth';
import { updateProfile } from '@/networks/user';

import useAppMutation from '../core/useAppMutation';

export const useUpdateProfile = (options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: any) => void;
}) => {
  const { update } = useSession();
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationKey: ['mutateUserData'],
    mutationFn: updateProfile,
    onSuccess: async (data: any) => {
      const newUserData: UserState = data?.data;
      queryClient.setQueryData(
        ['getUserData'],
        (
          oldData:
            | { user: UserState; subscribes: { followersCount: number; followingCount: number } }
            | undefined
        ) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            user: {
              ...oldData.user,
              ...newUserData
            }
          };
        }
      );
      toast.success('Profile updated successfully');
      options?.onSuccess?.(data);
    },
    onError: options?.onError
  });
};
