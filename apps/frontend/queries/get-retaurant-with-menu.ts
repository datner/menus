import { gql } from '@apollo/client';
import { Item } from 'entities/menu-item';
import { Locale } from 'utils/zod';
import { z } from 'zod';

export const RestaurantWithMenu = z
  .object({
    restaurants: z.object({
      data: z
        .object({
          id: z.string(),
          attributes: z.object({
            name: z.string(),
            menu: z
              .object({
                data: z.object({
                  id: z.string(),
                  attributes: z.object({
                    name: z.string(),
                    description: z.string().nullable(),
                    items: Item.array(),
                  }),
                }),
              })
              .transform(({ data: { id, attributes } }) => ({
                id,
                ...attributes,
              })),
          }),
        })
        .transform(({ id, attributes }) => ({ id, ...attributes }))
        .array()
        .transform((value) => value[0]),
    }),
  })
  .transform((value) => value.restaurants.data);

export const ThumbnailFragment = gql`
  fragment ThumbnailFragment on UploadFileEntityResponse {
    data {
      id
      attributes {
        name
        alternativeText
        hash
        url
        width
        height
      }
    }
  }
`;

export const GET_RESTAURANT_WITH_MENU = gql`
  query GetRestaurantWithMenu($slug: String!, $locale: I18NLocaleCode) {
    restaurants(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        id
        attributes {
          name
          menu {
            data {
              id
              attributes {
                name
                description
                items {
                  id
                  price
                  name
                  thumbnail {
                    ...ThumbnailFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  ${ThumbnailFragment}
`;

export interface GetRestaurantWithMenuVariables {
  slug: string;
  locale: Locale;
}

export type RestaurantWithMenuInput = z.infer<typeof RestaurantWithMenu>;
export type RestaurantWithMenu = z.infer<typeof RestaurantWithMenu>;
