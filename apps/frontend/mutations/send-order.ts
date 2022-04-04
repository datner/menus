import { gql } from '@apollo/client';

export const SEND_ORDER = gql`
  mutation sendOrder($data: OrderCreateInput!) {
    createOrder(data: $data) {
      id
    }
  }
`;
