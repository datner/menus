import { gql } from '@apollo/client';
import { z } from 'zod';

export const Localizations = z
  .object({
    data: z
      .object({
        attributes: z.object({
          slug: z.string(),
          locale: z.string(),
        }),
      })
      .transform((value) => ({
        restaurant: value.attributes.slug,
        locale: value.attributes.locale,
      }))
      .array(),
  })
  .transform((value) => value.data);

export const Restaurant = z.object({
  slug: z.string(),
  locale: z.string(),
  localizations: Localizations,
});

export const Paths = z
  .object({
    restaurants: z.object({
      data: z
        .object({
          attributes: Restaurant.transform((value) => [
            ...value.localizations,
            {
              restaurant: value.slug,
              locale: value.locale,
            },
          ]),
        })
        .array(),
    }),
  })
  .transform((value) =>
    value.restaurants.data
      .flatMap((it) => it.attributes)
      .map(({ locale, ...params }) => ({
        params,
        locale,
      }))
  );

export const GET_PATHS = gql`
  query GetPaths {
    restaurants {
      data {
        attributes {
          slug
          locale
          localizations {
            data {
              attributes {
                slug
                locale
              }
            }
          }
        }
      }
    }
  }
`;

export type PathsInput = z.input<typeof Paths>;
export type Paths = z.infer<typeof Paths>;
