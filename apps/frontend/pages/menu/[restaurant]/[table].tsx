import { GetStaticPaths, GetStaticProps } from 'next';
import { FindRestaurantMenuQuery, getSdk } from 'generated/graphql';
import { z } from 'zod';
import { RestaurantMenu } from 'entities/restaurant';
import { MenuList } from 'components/MenuList';
import { MenuItem } from 'components/MenuItem';
import { invariant } from 'utils/invariant';
import { GraphQLClient } from 'graphql-request';
import { useState } from 'react';
import { Item } from 'entities/menu-item';
import { OrderButton } from 'components/OrderButton';
import { getClient } from 'utils/client';

interface TableProps {
  findRestaurantMenuQuery: FindRestaurantMenuQuery;
}

type QueryParams = {
  restaurant: string;
  table: string;
};

export default function Table(props: TableProps) {
  const { findRestaurantMenuQuery } = props;
  const { restaurant } = findRestaurantMenuQuery;
  const menu = RestaurantMenu.parse(restaurant);
  const [orders, setOrders] = useState<Item[]>([]);
  const hasOrders = orders.length > 0;

  const sendOrders = () => {
    const sdk = getClient();
  };

  return (
    <div className="relative">
      <hr />
      <h2>{menu.name}</h2>
      <p>{menu.description}</p>
      <MenuList>
        {menu.items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onOrder={(it) => setOrders((prev) => [...prev, it])}
          />
        ))}
      </MenuList>
      <OrderButton show={hasOrders}>{orders.length}</OrderButton>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const sdk = getClient();
  const { restaurants } = await sdk.findRestaurants();
  invariant(restaurants, 'no restaurants found');

  const slugs = await z
    .string()
    .array()
    .parseAsync(
      restaurants.data.map((restaurant) => restaurant.attributes?.slug)
    );

  return {
    fallback: 'blocking',
    paths: slugs.map((restaurant) => ({
      params: { restaurant, table: '*' },
      locale: restaurant.endsWith('he') ? 'he' : 'en-US',
    })),
  };
};

export const getStaticProps: GetStaticProps<TableProps, QueryParams> = async (
  context
) => {
  const sdk = getClient();
  const slug = context.params?.restaurant;

  invariant(slug, 'restaurant slug is required');

  const { restaurants } = await sdk.findRestaurants({
    filter: {
      slug: {
        eq: slug,
      },
    },
  });

  console.log(restaurants, slug);

  const restaurantId = await z.string().parseAsync(restaurants?.data[0].id);

  const findRestaurantMenuQuery = await sdk.findRestaurantMenu({
    restaurantId,
  });

  return {
    props: {
      findRestaurantMenuQuery,
    },
  };
};
