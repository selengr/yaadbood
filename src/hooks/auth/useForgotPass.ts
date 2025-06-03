import { forgotPass } from '@/networks/auth';

import useAppMutation from '../core/useAppMutation';

export const useForgotPass = (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => {
  return useAppMutation({
    mutationFn: forgotPass,
    ...options
  });
};
