import { getUserFollowersData } from '@/networks/user';
import { Subscription } from '@/types/subscriptions';

import useApi from '../core/useApi';

export function useGetUserFollowersData({
  search,
  sort
}: {
  search?: string;
  sort?: 'oldest' | 'recently' | 'popular';
}) {
  const { data, isLoading, error, refetch } = useApi<Subscription[] | undefined>({
    queryKey: ['userFollowersData', sort, search],
    queryFn: () => getUserFollowersData({ search, sort })
  });

  return { data: data || [], isLoading, error, refetch };
}
