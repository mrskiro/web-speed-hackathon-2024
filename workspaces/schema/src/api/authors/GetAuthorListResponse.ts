import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { author } from '../../models';

export const GetAuthorListResponseSchema = createSelectSchema(author)
  .pick({
    id: true,
    name: true,
  })
  // .extend({
  //   books: createSelectSchema(book)
  //     .pick({
  //       description: true,
  //       id: true,
  //       name: true,
  //     })
  //     .extend({
  //       episodes: createSelectSchema(episode)
  //         .pick({
  //           chapter: true,
  //           description: true,
  //           id: true,
  //           name: true,
  //         })
  //         .array(),
  //       image: createSelectSchema(image).pick({
  //         alt: true,
  //         id: true,
  //       }),
  //     })
  //     .array(),
  //   image: createSelectSchema(image).pick({
  //     alt: true,
  //     id: true,
  //   }),
  // })
  .array();

export type GetAuthorListResponse = z.infer<typeof GetAuthorListResponseSchema>;

export const GetAuthorListAdminResponseSchema = createSelectSchema(author)
  .pick({
    id: true,
    name: true,
  })
  .array();

export type GetAuthorListAdminResponse = z.infer<typeof GetAuthorListAdminResponseSchema>;
