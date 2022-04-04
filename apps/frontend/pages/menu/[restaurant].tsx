import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locale } from '@prisma/client';
import {
  CreateOrderArgs,
  OrderItemCreateManyOrderInput,
} from '@generated/type-graphql';
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
import { menuItem } from 'utils/cloudinary';
import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as O from 'monocle-ts/Optional';
import * as T from 'monocle-ts/Traversal';
import { cld } from 'cloudinary-config';

export default function Table(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { restaurant, table } = props;
  const { id, menu } = restaurant;
  const { locale } = useRouter();
  const [items, setItems] = useState<OrderItemCreateManyOrderInput[]>([]);
  const [sendOrder] = useMutation<never, CreateOrderArgs>(SEND_ORDER, {
    variables: {
      data: {
        table,
        identifier: `${restaurant.identifier}-${table}-${Date.now()}`,
        restaurant: { connect: { id } },
        orderItems: {
          createMany: {
            data: items,
          },
        },
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
                onOrder={({ id }) =>
                  setItems((prev) => [...prev, { itemId: id }])
                }
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
  const { params, locale = Locale.en } = context;
  const raw = await client.restaurant.findUnique({
    where: { slug: z.string().parse(params?.restaurant) },
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

  const restaurant = pipe(
    O.id<typeof raw>(),
    O.prop('menu'),
    O.fromNullable,
    O.prop('categories'),
    O.traverse(A.Traversable),
    T.prop('items'),
    T.traverse(A.Traversable),
    T.prop('image'),
    T.modify((it) => menuItem(cld.image(it)).toURL())
  )(raw);

  const i18lProps = await serverSideTranslations(locale, ['common', 'menu']);

  return {
    props: {
      ...i18lProps,
      restaurant,
      table: z.string().default('general').parse(context.params?.table),
    },
    revalidate: 10,
  };
};
