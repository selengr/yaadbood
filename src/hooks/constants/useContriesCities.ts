import QueryKeys from '@/constants/queryKeys';
import { getContriesCities } from '@/networks/constants';

import useApi from '../core/useApi';

export function useContries() {
  const { data, isLoading, error, refetch } = useApi({
    queryKey: [QueryKeys.GET_CONTRIES],
    queryFn: () => getContriesCities({})
  });

  return { data, isLoading, error, refetch };
}

export function useCities(country?: string) {
  const { data, isLoading, error, refetch } = useApi({
    queryKey: [QueryKeys.GET_CITIES, country],
    queryFn: () => getContriesCities({ country }),
    enabled: !!country,
    select: (data) => {
      return data.countries[0].states;
    }
  });

  return { data, isLoading, error, refetch };
}
