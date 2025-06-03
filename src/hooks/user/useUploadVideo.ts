import { uploadVideo } from '@/networks/user';

import useAppMutation from '../core/useAppMutation';
import { useUploadProgress } from '../util/useUploadProgress';

export default function useUploadVideo({ onSuccess }: { onSuccess?: () => void }) {
  const { progress, onUploadProgress } = useUploadProgress();
  const { mutate, isPending, isSuccess } = useAppMutation({
    mutationFn: (data: FormData) => {
      return uploadVideo(data, onUploadProgress);
    },
    onSuccess
  });

  return {
    uploadVideo: mutate,
    isPending,
    isSuccess,
    progress
  };
}
