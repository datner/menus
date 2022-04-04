import { Locale } from '@prisma/client';
import { CreateOrderArgs, ItemWhereUniqueInput } from '@generated/type-graphql';
import client from 'prisma-client';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { z } from 'zod';
import { useMutation } from '@apollo/client';
import { MenuItem } from 'components/MenuItem';
import { MenuList } from 'components/MenuList';
import { OrderButton } from 'components/OrderButton';
import { SEND_ORDER } from 'mutations/send-order';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Table(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { restaurant, table } = props;
  const { id, menu } = restaurant;
  const { locale } = useRouter();
  const [items, setItems] = useState<ItemWhereUniqueInput[]>([]);
  const [sendOrder] = useMutation<never, CreateOrderArgs>(SEND_ORDER, {
    variables: {
      data: {
        table,
        identifier: `${restaurant.identifier}-${table}-${Date.now()}`,
        restaurant: { connect: { id } },
        items: { connect: items },
      },
    },
    onCompleted() {
      setItems([]);
    },
  });
  const hasOrders = items.length > 0;

  return (
    <div className="relative">
      <MenuList>
        {menu?.categories.map((cat) =>
          cat.items.map((item) => {
            const content = item.content.find((it) => it.locale === locale);

            return content ? (
              <MenuItem
                key={item.id}
                item={item}
                content={content}
                onOrder={({ id }) => setItems((prev) => [...prev, { id }])}
              />
            ) : null;
          })
        )}
      </MenuList>
      <OrderButton onClick={() => sendOrder()} show={hasOrders}>
        {items.length}
      </OrderButton>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const qs = await client.restaurant.findMany({
    select: {
      slug: true,
    },
  });

  const paths = qs.flatMap((it) =>
    locales.map((locale) => ({ locale, params: { restaurant: it.slug } }))
  );
  console.log(qs, paths);
  return {
    fallback: 'blocking',
    paths,
  };
};

const locales = [Locale.en, Locale.he] as const;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const restaurant = await client.restaurant.findUnique({
    where: { slug: z.string().parse(context.params?.restaurant) },
    rejectOnNotFound: true,
    include: {
      content: true,
      menu: {
        include: {
          categories: {
            include: {
              items: {
                include: {
                  content: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return {
    props: {
      restaurant,
      table: z.string().default('general').parse(context.params?.table),
    },
    revalidate: 10,
  };
};
