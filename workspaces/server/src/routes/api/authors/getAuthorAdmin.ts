import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetAuthorRequestParamsSchema } from '@wsh-2024/schema/src/api/authors/GetAuthorRequestParams';
import { GetAuthorAdminResponseSchema } from '@wsh-2024/schema/src/api/authors/GetAuthorResponse';

import { authorRepository } from '../../../repositories';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/admin/authors/{authorId}',
  request: {
    params: GetAuthorRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetAuthorAdminResponseSchema,
        },
      },
      description: 'Get author. for admin',
    },
  },
  tags: ['[Admin] Authors API'],
});

app.openapi(route, async (c) => {
  const params = c.req.valid('param');
  const res = await authorRepository.readForAdmin({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getAuthorAdminApp };
