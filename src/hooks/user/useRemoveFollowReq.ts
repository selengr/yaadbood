import { removeFollowRequest } from '@/networks/user';

import useAppMutation from '../core/useAppMutation';

export const useRemoveFollowReq = (options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: any) => void;
}) => {
  return useAppMutation({
    mutationFn: removeFollowRequest,
    ...options
  });
};
