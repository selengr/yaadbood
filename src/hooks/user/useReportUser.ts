import { reportUser } from '@/networks/user';

import { useAppMutation } from '../core';

const useReportUser = (options?: { onSuccess?: (data: unknown) => void; onError?: (error: any) => void }) => {
  return useAppMutation({
    mutationFn: reportUser,
    ...options
  });
};

export default useReportUser;
