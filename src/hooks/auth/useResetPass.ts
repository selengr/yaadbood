import { resetPass } from '@/networks/auth';

import useAppMutation from '../core/useAppMutation';

export const useResetPass = (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => {
  return useAppMutation({
    mutationFn: resetPass,
    ...options
  });
};
