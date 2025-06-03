import { verifyOtp } from '@/networks/auth';
import { AuthResponse } from '@/types/auth';

import useAppMutation from '../core/useAppMutation';

export const useVerifyOtp = (options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: any) => void;
}) => {
  return useAppMutation({
    mutationFn: verifyOtp,
    ...options
  });
};
