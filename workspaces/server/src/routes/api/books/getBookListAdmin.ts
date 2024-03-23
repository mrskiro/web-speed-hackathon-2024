import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetBookListRequestQuerySchema } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';
import { GetBookListAdminResponseSchema } from '@wsh-2024/schema/src/api/books/GetBookListResponse';

import { bookRepository } from '../../../repositories';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/admin/books',
  request: {
    query: GetBookListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBookListAdminResponseSchema,
        },
      },
      description: 'Get book list.',
    },
  },
  tags: ['[Admin] Books API'],
});

app.openapi(route, async (c) => {
  const query = c.req.valid('query');
  const res = await bookRepository.readAllForAdmin({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getBookListAdminApp };
