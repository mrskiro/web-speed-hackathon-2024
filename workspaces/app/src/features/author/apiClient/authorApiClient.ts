import { inject } from 'regexparam';

import type { GetAuthorRequestParams } from '@wsh-2024/schema/src/api/authors/GetAuthorRequestParams';
import type { GetAuthorResponse } from '@wsh-2024/schema/src/api/authors/GetAuthorResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';
import { apiClient } from '../../../lib/api/apiClient';

type AuthorApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetAuthorRequestParams }, GetAuthorResponse];
}>;

export const authorApiClient: AuthorApiClient = {
  fetch: async ({ params }) => {
    const response = await apiClient.get<GetAuthorResponse>(inject('/api/v1/authors/:authorId', params));
    return response.data;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/authors/:authorId`,
    ...options,
  }),
};
