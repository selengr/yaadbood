import { blockUser } from '@/networks/user';

import { useAppMutation } from '../core';

const useBlockUser = (options?: { onSuccess?: (data: unknown) => void; onError?: (error: any) => void }) => {
  return useAppMutation({
    mutationFn: blockUser,
    ...options
  });
};

export default useBlockUser;
