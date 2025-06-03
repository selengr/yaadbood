import { getUserData } from '@/networks/user';
import { UserState } from '@/types/auth';

import useApi from '../core/useApi';

export function useGetUserData(username?: string) {
  const { data, isLoading, error, refetch } = useApi<
    { user: UserState; subscribes: { followersCount: number; followingCount: number } } | undefined
  >({
    queryKey: ['getUserData'],
    queryFn: () => getUserData(username)
  });

  return { data, isLoading, error, refetch };
}
