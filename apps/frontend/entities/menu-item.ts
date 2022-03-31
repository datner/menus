import { extract, gqlPayload } from 'utils/zod';
import { z } from 'zod';

export const Thumbnail = z.object({
  alternativeText: z.string().default('delicious looking food-item'),
  name: z.string(),
  url: z.string(),
  hash: z.string(),
  height: z.number(),
  width: z.number(),
});

export const Item = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  thumbnail: gqlPayload(Thumbnail).transform(extract),
});

export type Item = z.infer<typeof Item>;
export type Thumbnail = Item['thumbnail'];
