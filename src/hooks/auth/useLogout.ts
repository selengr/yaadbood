import { useMutation } from '@tanstack/react-query';

import { logout } from '@/networks/auth';

export const useLogout = (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => {
  return useMutation({
    mutationFn: logout,
    ...options
  });
};
