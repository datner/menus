import { gql } from '@apollo/client';
import { Item } from 'entities/menu-item';
import { z } from 'zod';
import { ThumbnailFragment } from './get-retaurant-with-menu';

const Order = z
  .object({
    id: z.string(),
    attributes: z.object({
      table: z.string(),
      items: Item.array(),
    }),
  })
  .transform(({ id, attributes }) => ({ id, ...attributes }));

export const Orders = z
  .object({
    orders: z.object({
      data: Order.array(),
    }),
  })
  .transform((value) => value.orders.data);

export interface GetOrdersVariables {
  slug: string;
}

export const GET_ORDERS = gql`
  query GetOrders($slug: String!) {
    orders(filters: { restaurant: { slug: { startsWith: $slug } } }) {
      data {
        id
        attributes {
          table
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

  ${ThumbnailFragment}
`;

export type Order = z.infer<typeof Order>;
export type OrdersInput = z.input<typeof Orders>;
export type Orders = z.infer<typeof Orders>;
