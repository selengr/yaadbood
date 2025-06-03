import useApi from '../core/useApi';
import { getUserContent } from '@/networks/user';
// types
import { Post, UserContentBody } from '@/types/posts';

export function useGetUserContent(body: UserContentBody) {
  return useApi<Post[]>({
    queryKey: ['getUserContent', body],
    queryFn: () => getUserContent(body)
  });
}
