import { notInterestedtUser } from '@/networks/user';

import useAppMutation from '../core/useAppMutation';

export const useNotInterestedUser = (options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: any) => void;
}) => {
  return useAppMutation({
    mutationFn: notInterestedtUser,
    ...options
  });
};
