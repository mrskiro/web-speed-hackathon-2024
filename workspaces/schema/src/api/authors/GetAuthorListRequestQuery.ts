import { z } from 'zod';

export const GetAuthorListRequestQuerySchema = z.object({
  limit: z.coerce.number().optional(),
  name: z.string().optional(),
  offset: z.coerce.number().optional(),
});

export type GetAuthorListRequestQuery = z.infer<typeof GetAuthorListRequestQuerySchema>;

export const GetAuthorListAdminRequestQuerySchema = z.object({
  limit: z.coerce.number().optional(),
  name: z.string().optional(),
  offset: z.coerce.number().optional(),
});

export type GetAuthorListAdminRequestQuery = z.infer<typeof GetAuthorListAdminRequestQuerySchema>;
