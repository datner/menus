import { gql } from '@apollo/client';
import { z } from 'zod';
import { Restaurant } from './get-paths';

const Table = z.object({
  id: z.string(),
  name: z.string(),
});

export const TablePaths = z
  .object({
    restaurants: z.object({
      data: z
        .object({
          attributes: Restaurant.extend({ tables: Table.array() }).transform(
            (value) => [
              ...value.localizations.flatMap((loc) =>
                value.tables.map(({ name }) => ({ table: name, ...loc }))
              ),
              ...value.tables.map(({ name }) => ({
                restaurant: value.slug,
                locale: value.locale,
                table: name,
              })),
            ]
          ),
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

export const GET_TABLE_PATHS = gql`
  query GetTablePaths {
    restaurants {
      data {
        attributes {
          slug
          locale
          tables {
            id
            name
          }
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

export type TablePathsInput = z.input<typeof TablePaths>;
export type TablePaths = z.infer<typeof TablePaths>;
