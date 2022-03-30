import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMutation } from '@apollo/client';
import client from 'apollo-client';
import { MenuItem } from 'components/MenuItem';
import { MenuList } from 'components/MenuList';
import { OrderButton } from 'components/OrderButton';
import {
  CreateOrder,
  CreateOrderResponse,
  OrderItem,
  SEND_ORDER,
} from 'mutations/send-order';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  GET_TABLE_PATHS,
  TablePaths,
  TablePathsInput,
} from 'queries/get-table-paths';
import {
  GetRestaurantWithMenuVariables,
  GET_RESTAURANT_WITH_MENU,
  RestaurantWithMenu,
  RestaurantWithMenuInput,
} from 'queries/get-retaurant-with-menu';
import { useState } from 'react';
import { invariant } from 'ts-invariant';
import { Locale } from 'utils/zod';

interface TableProps {
  restaurantWithMenu: RestaurantWithMenu;
  table: string;
}

type QueryParams = {
  restaurant: string;
  table: string;
};

export default function Table(props: TableProps) {
  const { restaurantWithMenu, table } = props;
  const { id, menu } = restaurantWithMenu;
  const [items, setItems] = useState<OrderItem[]>([]);
  const [sendOrder] = useMutation<CreateOrderResponse, CreateOrder>(
    SEND_ORDER,
    {
      variables: { order: { items, table, restaurant: id } },
      onCompleted() {
        setItems([]);
      },
    }
  );
  const hasOrders = items.length > 0;

  return (
    <div className="relative">
      <MenuList>
        {menu.items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onOrder={(it) => setItems((prev) => [...prev, OrderItem.parse(it)])}
          />
        ))}
      </MenuList>
      <OrderButton onClick={() => sendOrder()} show={hasOrders}>
        {items.length}
      </OrderButton>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const query = await client.query<TablePathsInput>({
    query: GET_TABLE_PATHS,
  });

  const paths = TablePaths.parse(query.data);

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<TableProps, QueryParams> = async (
  context
) => {
  const { locale: locale_, params } = context;
  const slug = params?.restaurant;
  const table = params?.table;

  invariant(table, 'table is required');
  invariant(slug, 'slug is required');

  const locale = Locale.parse(locale_);

  console.log({ slug, locale });
  const query = await client.query<
    RestaurantWithMenuInput,
    GetRestaurantWithMenuVariables
  >({
    query: GET_RESTAURANT_WITH_MENU,
    variables: { slug, locale },
  });

  const restaurantWithMenu = RestaurantWithMenu.parse(query.data);
  const i18props = await serverSideTranslations(locale, ['common', 'menu']);
  return {
    props: {
      ...i18props,
      restaurantWithMenu,
      table,
    },
  };
};
