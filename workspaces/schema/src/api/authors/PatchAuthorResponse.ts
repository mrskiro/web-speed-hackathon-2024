import { z } from 'zod';

export const PatchAuthorResponseSchema = z.object({});
export type PatchAuthorResponse = z.infer<typeof PatchAuthorResponseSchema>;
