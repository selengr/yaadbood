import { getUserFollowingsData } from '@/networks/user';
import { Subscription } from '@/types/subscriptions';

import useApi from '../core/useApi';

export function useGetUserFollowingsData({
  search,
  sort
}: {
  search?: string;
  sort?: 'oldest' | 'recently' | 'popular';
}) {
  const { data, isLoading, error, refetch } = useApi<Subscription[] | undefined>({
    queryKey: ['userFollowingsData', sort, search],
    queryFn: () => getUserFollowingsData({ search, sort })
  });

  return { data: data || [], isLoading, error, refetch };
}
