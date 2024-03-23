import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetAuthorListAdminRequestQuerySchema } from '@wsh-2024/schema/src/api/authors/GetAuthorListRequestQuery';
import { GetAuthorListAdminResponseSchema } from '@wsh-2024/schema/src/api/authors/GetAuthorListResponse';

import { authorRepository } from '../../../repositories';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/admin/authors',
  request: {
    query: GetAuthorListAdminRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetAuthorListAdminResponseSchema,
        },
      },
      description: 'Get author list for admin.',
    },
  },
  tags: ['[Admin] Authors API'],
});

app.openapi(route, async (c) => {
  const query = c.req.valid('query');

  console.log('call me?', c.req);
  const res = await authorRepository.readAll({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getAuthorListAdminApp };
