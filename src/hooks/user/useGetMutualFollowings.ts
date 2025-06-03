import { useInfiniteQuery } from "@tanstack/react-query"
import { getMutualFollowingsData } from '@/networks/user';

export function useGetMutualFollowings({
  search,
  sort,
  username,
  limit = 10,
}: {
  search?: string;
  sort?: 'oldest' | 'recently' | 'popular';
  username: string;
  limit?: number
}) {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
      queryKey: ["userMutualFollowingsData", sort, search, username, limit],
      queryFn: async ({ pageParam = 0 }) => {
        const skip = pageParam * limit
        const result = await getMutualFollowingsData({ search, sort, username, limit, skip })
        return result
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length < limit ? undefined : allPages.length
      },
      initialPageParam: 0,
    })

  const flattenedData = data?.pages.flat() || []

  return {
    data: flattenedData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  }
}
