import { checkUsernameFunc } from '@/networks/user';

import useAppMutation from '../core/useAppMutation';

export const useCheckUsername = (options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: any) => void;
}) => {
  return useAppMutation({
    mutationFn: checkUsernameFunc,
    ...options
  });
};
