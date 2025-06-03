import { deleteComment } from '@/networks/comment';

import useAppMutation from '../core/useAppMutation';

const useDeleteComment = (options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: any) => void;
}) => {
  return useAppMutation({
    mutationFn: deleteComment,
    ...options
  });
};

export default useDeleteComment;
