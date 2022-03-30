import client from 'apollo-client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  GetOrdersVariables,
  GET_ORDERS,
  Order,
  Orders,
  OrdersInput,
} from 'queries/get-orders';
import { GET_PATHS, Paths, PathsInput } from 'queries/get-paths';
import { invariant } from 'utils/invariant';
import Modal from 'components/Modal';
import { useState } from 'react';
import { OrderTicket } from '../../../components/OrderTicket';

type QueryParams = {
  restaurant: string;
};

interface OrdersPageProps {
  orders: Orders;
}

export default function OrdersPage(props: OrdersPageProps) {
  const { orders } = props;
  const [order, setOrder] = useState<Order | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-2 max-w-md mx-auto">
        {orders.map((order) => (
          <OrderTicket
            key={order.id}
            order={order}
            onClick={() => setOrder(order)}
          />
        ))}
      </div>
      <Modal open={Boolean(order)} onClose={() => setOrder(null)} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const query = await client.query<PathsInput>({
    query: GET_PATHS,
  });

  const paths = Paths.parse(query.data);
  return {
    fallback: 'blocking',
    paths,
  };
};

export const getStaticProps: GetStaticProps<
  OrdersPageProps,
  QueryParams
> = async (context) => {
  const { locale } = context;
  const slugWithZone = context.params?.restaurant;
  invariant(slugWithZone, 'restaurant slug is required');
  invariant(locale, 'locale is required');

  const [slug] = slugWithZone.split('-');

  const query = await client.query<OrdersInput, GetOrdersVariables>({
    query: GET_ORDERS,
    variables: { slug },
  });

  const orders = Orders.parse(query.data);

  const i18props = await serverSideTranslations(locale, ['common', 'orders']);

  return {
    props: {
      ...i18props,
      orders,
    },
  };
};
