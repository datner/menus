import { z } from 'zod';

export const MenuItem = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

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

export type Format = z.infer<typeof Format>;

const Formats = z.record(Format);

export type Formats = z.infer<typeof Formats>;

const Thumbnail = z
  .object({
    data: z.object({
      attributes: z.object({
        alternativeText: z.string().default('delicious looking food-item'),
        formats: Formats,
        name: z.string(),
        url: z.string(),
        height: z.number(),
        width: z.number(),
      }),
    }),
  })
  .transform((value) => value.data.attributes);

export type Thumbnail = z.infer<typeof Thumbnail>;

export const Item = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  thumbnail: Thumbnail,
});

export type Item = z.infer<typeof Item>;
