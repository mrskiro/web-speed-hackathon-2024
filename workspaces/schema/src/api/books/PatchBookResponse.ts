import { z } from 'zod';

export const PatchBookResponseSchema = z.object({});

export type PatchBookResponse = z.infer<typeof PatchBookResponseSchema>;
