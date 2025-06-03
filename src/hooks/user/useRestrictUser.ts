import { restrictUser } from '@/networks/user';

import { useAppMutation } from '../core';

const useRestrictUser = (options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: any) => void;
}) => {
  return useAppMutation({
    mutationFn: restrictUser,
    ...options
  });
};

export default useRestrictUser;
