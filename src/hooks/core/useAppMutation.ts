import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { toast } from 'react-toastify';

const useMutateApi = <TData, TVariables, TContext>(
  params: Parameters<typeof useMutation<TData, ApiError, TVariables, TContext>>[0]
) => {
  return useMutation<TData, ApiError, TVariables, TContext>({
    ...params,
    onError: (error: ApiError, ...rest) => {
      if (params?.onError)
        params?.onError?.(error, ...rest);
      else
        toast.error(error?.message);
    }
  });
};
export default useMutateApi;
