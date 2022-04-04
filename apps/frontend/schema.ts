import { Locales } from 'nexus-prisma';
import NexusPrismaScalars from 'nexus-prisma/scalars';
import { enumType, makeSchema } from 'nexus';
import { item } from './schema/item';
import { itemI18l } from './schema/item-i18l';
import { restaurant, restaurantQueries } from './schema/restaurant';
import { restaurantI18l } from './schema/restaurant-i18l';
import { menu } from './schema/menu';
import { category } from './schema/category';
import { join } from 'path';

export const schema = makeSchema({
  types: [
    item,
    itemI18l,
    restaurant,
    restaurantQueries,
    restaurantI18l,
    menu,
    category,
    enumType(Locales),
    NexusPrismaScalars,
  ],

  sourceTypes: {
    modules: [
      {
        module: require.resolve('@prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
  contextType: {
    module: require.resolve('./schema/context.ts'),
    export: 'Context',
  },
  outputs: {
    typegen: join(__dirname, 'generated/nexus-typegen.ts'),
    schema: join(__dirname, 'generated/schema.graphql'),
  },
});
