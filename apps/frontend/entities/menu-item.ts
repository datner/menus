import { extract, gqlPayload } from 'utils/zod';
import { z } from 'zod';

const Format = z
  .object({
    ext: z.string(),
    hash: z.string(),
    size: z.number(),
    width: z.number(),
    height: z.number(),
  })
  .transform((value) => {
    return {
      ...value,
      url: `${process.env.NEXT_PUBLIC_ASSET_URL}/${value.hash}${value.ext}`,
    };
  });

const Formats = z.record(Format);

export const Thumbnail = z.object({
  alternativeText: z.string().default('delicious looking food-item'),
  formats: Formats,
  name: z.string(),
  url: z.string(),
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

export type Format = z.infer<typeof Format>;
export type Formats = z.infer<typeof Formats>;
export type Item = z.infer<typeof Item>;
export type Thumbnail = Item['thumbnail'];
