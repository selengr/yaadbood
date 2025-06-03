import { updateProfile } from '@/networks/user';
import useMutateApi from '../core/useAppMutation';

export const useUpdateProfile = (options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: any) => void;
}) => {
  return useMutateApi({
    mutationFn: updateProfile,
    mutationKey: ['updateProfile'],
    ...options
  });
};
