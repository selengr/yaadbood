import { login } from '@/networks/auth';

import useAppMutation from '../core/useAppMutation';

export const useResendCode = (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => {
  return useAppMutation({
    mutationFn: login,
    ...options
  });
};
