import { getTopRated } from '@/networks/user';
import { TopUser } from '@/types/subscriptions';

import useApi from '../core/useApi';

export function useTopRated() {
  const { data, isLoading, error, refetch } = useApi<TopUser[] | undefined>({
    queryKey: ['topRatedData'],
    queryFn: getTopRated
  });

  return { data, isLoading, error, refetch };
}
