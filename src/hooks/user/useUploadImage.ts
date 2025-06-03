import { toast } from 'react-toastify';

import { uploadImage } from '@/networks/user';

import useAppMutation from '../core/useAppMutation';
import { useUploadProgress } from '../util/useUploadProgress';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export default function useUploadImage({ onSuccess }: { onSuccess?: (data: unknown) => void }) {
  const { progress, onUploadProgress } = useUploadProgress();

  // Use mutateAsync to get a promise-based API.
  const { mutateAsync, isPending, isSuccess, error, reset } = useAppMutation({
    mutationKey: ['uploadImageMutation'],
    mutationFn: (data: FormData) => uploadImage(data, onUploadProgress),
    onSuccess
  });

  const validateAndUpload = async (data: FormData) => {
    const file = data.get('file') as File;
    if (!file) throw new Error('No file provided');
    if (!file.type) throw new Error('File type is missing');

    if (file.size > MAX_FILE_SIZE) {
      toast.error('The selected file exceeds the 5 MB limit. Please upload a smaller file.');
      throw new Error('File exceeds maximum size');
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Invalid file type. Please upload an image in JPG, PNG, or GIF format.');
      throw new Error('Invalid file type');
    }

    // Return the promise from mutateAsync so that callers can await the response.
    return await mutateAsync(data);
  };

  return {
    uploadImage: validateAndUpload,
    isPending,
    isSuccess,
    progress,
    error,
    reset
  };
}
