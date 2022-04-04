import { objectType, queryField, nonNull, stringArg, intArg } from 'nexus';
import { Restaurant } from 'nexus-prisma';

export const restaurant = objectType({
  name: Restaurant.$name,
  description: Restaurant.$description,
  definition(t) {
    t.field(Restaurant.id);
    t.field(Restaurant.logo);
    t.field(Restaurant.slug);
    t.field(Restaurant.content);
    t.field(Restaurant.menu);
  },
});

export const restaurantQueries = queryField((t) => {
  t.field('restaurant', {
    type: Restaurant.$name,
    args: {
      id: nonNull(intArg()),
    },
    resolve(_, { id }, ctx) {
      return ctx.db.restaurant.findUnique({ where: { id } });
    },
  });
  t.field('restaurantBySlug', {
    type: Restaurant.$name,
    args: {
      slug: nonNull(stringArg()),
    },
    resolve(_, { slug }, ctx) {
      return ctx.db.restaurant.findUnique({ where: { slug } });
    },
  });
  t.list.field('restaurants', {
    type: Restaurant.$name,
    resolve(_, __, ctx) {
      return ctx.db.restaurant.findMany();
    },
  });
});
