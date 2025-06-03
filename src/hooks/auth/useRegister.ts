import { useMutation } from '@tanstack/react-query';

import { register } from '@/networks/auth';

export const useRegister = (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => {
  return useMutation({
    mutationFn: register,
    ...options
  });
};
