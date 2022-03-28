import { z } from 'zod';

export const Menu = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
});

export type Menu = z.infer<typeof Menu>;
