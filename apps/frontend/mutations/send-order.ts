import { gql } from '@apollo/client';
import { Item, Thumbnail } from 'entities/menu-item';
import { z } from 'zod';

export const OrderItem = Item.omit({ id: true })
  .extend({ thumbnail: Thumbnail.extend({ id: z.string() }) })
  .transform((value) => ({
    ...value,
    thumbnail: value.thumbnail.id,
  }));

export const CreateOrder = z.object({
  order: z.object({
    restaurant: z.string(),
    items: OrderItem.array(),
    table: z.string(),
  }),
});

export type CreateOrder = z.infer<typeof CreateOrder>;
export type OrderItem = z.infer<typeof OrderItem>;

export interface CreateOrderResponse {
  data: {
    id: string;
  };
}

export const SEND_ORDER = gql`
  mutation sendOrder($order: OrderInput!) {
    createOrder(data: $order) {
      data {
        id
      }
    }
  }
`;
