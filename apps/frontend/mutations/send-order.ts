import { gql } from '@apollo/client';

export const SEND_ORDER = gql`
  mutation sendOrder($order: OrderCreateInput!) {
    createOrder(data: $order) {
      id
    }
  }
`;
