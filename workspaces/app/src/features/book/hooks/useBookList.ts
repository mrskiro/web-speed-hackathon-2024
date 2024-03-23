import useSWR from 'swr';

import { bookApiClient } from '../apiClient/bookApiClient';

export function useBookList(...[options]: Parameters<typeof bookApiClient.fetchList>) {
  return useSWR(bookApiClient.fetchList$$key(options), options.query.name ? bookApiClient.fetchList : null, {
    suspense: false,
  });
}
