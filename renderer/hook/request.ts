//

import {
  QueryClient,
  UseQueryOptions,
  UseQueryResult,
  useQuery as useRawQuery
} from "react-query";


export const queryClient = new QueryClient();

export function useQuery<A, D>(name: string, api: (arg: A) => Promise<D>, arg: A, config?: QueryConfig<D>): [D | undefined, unknown, UseQueryRestResult<D>] {
  const {data: queryData, error: queryError, ...rest} = useRawQuery<D>([name, arg], async () => {
    const response = await api(arg);
    return response;
  }, config);
  return [queryData, queryError, rest];
}

export function useSuspenseQuery<A, D>(name: string, api: (arg: A) => Promise<D>, arg: A, config?: QueryConfig<D>): [D, UseQueryRestResult<D>] {
  const {data: queryData, ...rest} = useRawQuery<D>([name, arg], async () => {
    const response = await api(arg);
    return response;
  }, {suspense: true, ...config});
  return [queryData!, rest];
}

export async function invalidateQueries(name: string, predicate?: (arg: any) => boolean): Promise<void> {
  await queryClient.invalidateQueries({predicate: (query) => {
    if (predicate !== undefined) {
      return query.queryKey[0] === name && predicate(query.queryKey[1] as any);
    } else {
      return query.queryKey[0] === name;
    }
  }});
}

type QueryConfig<D> = UseQueryOptions<D>;
type UseQueryRestResult<D> = Omit<UseQueryResult<D>, "data" | "error">;