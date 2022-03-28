import { z } from 'zod';
import { Item } from './menu-item';

export const RestaurantMenu = z
  .object({
    data: z.object({
      attributes: z.object({
        menu: z.object({
          data: z.object({
            attributes: z.object({
              name: z.string(),
              description: z.string().optional().nullable(),
              items: Item.array(),
            }),
          }),
        }),
      }),
    }),
  })
  .transform((value) => ({
    name: value.data.attributes.menu.data.attributes.name,
    description: value.data.attributes.menu.data.attributes.name,
    items: value.data.attributes.menu.data.attributes.items,
  }));

export type RestaurantMenu = z.infer<typeof RestaurantMenu>;
