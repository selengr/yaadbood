import { createFollowRequest } from '@/networks/user';

import useAppMutation from '../core/useAppMutation';

export const useCreateFollowReq = (options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: any) => void;
}) => {
  return useAppMutation({
    mutationFn: createFollowRequest,
    ...options
  });
};
