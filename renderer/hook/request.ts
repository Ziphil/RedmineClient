//

import {
  QueryClient,
  UseQueryOptions,
  UseQueryResult,
  useQuery as useRawQuery
} from "react-query";


export const queryClient = new QueryClient();

export function useResponse<A, D>(name: string, api: (arg: A) => Promise<D>, arg: A | FalsyData, config?: ResponseConfig<D>): [D | undefined, unknown, ResponseRest<D>] {
  const {data: queryData, error: queryError, ...rest} = useRawQuery<D>([name, arg], async () => {
    if (arg) {
      const response = await api(arg);
      return response;
    } else {
      throw new Error("cannot happen");
    }
  }, {...config, enabled: !!arg});
  return [queryData, queryError, rest];
}

export function useSuspenseResponse<A, D>(name: string, api: (arg: A) => Promise<D>, arg: A, config?: ResponseConfig<D>): [D, ResponseRest<D>] {
  const {data: queryData, ...rest} = useRawQuery<D>([name, arg], async () => {
    const response = await api(arg);
    return response;
  }, {suspense: true, ...config});
  return [queryData!, rest];
}

export async function invalidateResponses(name: string, predicate?: (arg: any) => boolean): Promise<void> {
  await queryClient.invalidateQueries({predicate: (query) => {
    if (predicate !== undefined) {
      return query.queryKey[0] === name && predicate(query.queryKey[1] as any);
    } else {
      return query.queryKey[0] === name;
    }
  }});
}

type ResponseConfig<D> = UseQueryOptions<D>;
type ResponseRest<D> = Omit<UseQueryResult<D>, "data" | "error">;

type FalsyData = undefined | null | false;