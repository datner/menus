import { extract, gqlPayload, Locale } from 'utils/zod';
import { z } from 'zod';
import { Item } from './menu-item';

export const RestaurantMenu = z.object({
  name: z.string(),
  description: z.string().nullable(),
  items: Item.array(),
});

export const RestaurantFields = z.object({
  name: z.string(),
  slug: z.string(),
  locale: Locale,
  localizations: z
    .object({
      data: z.array(
        z.object({
          id: z.string(),
          attributes: z.object({
            name: z.string(),
            slug: z.string(),
            locale: Locale,
          }),
        })
      ),
    })
    .transform((value) =>
      value.data.map((it) => ({ id: it.id, ...it.attributes }))
    ),
});

export const Restaurant = gqlPayload(
  RestaurantFields.extend({
    menu: gqlPayload(RestaurantMenu).transform(extract),
  })
).transform(extract);

export const Restaurants = z
  .object({
    data: z
      .object({
        id: z.string(),
        attributes: RestaurantFields.extend({
          menu: gqlPayload(RestaurantMenu).transform(extract),
        }),
      })
      .array(),
  })
  .transform((value) =>
    value.data.map((it) => ({ id: it.id, ...it.attributes }))
  );

export type RestaurantFields = z.infer<typeof RestaurantFields>;
export type RestaurantMenu = z.infer<typeof RestaurantMenu>;
