import { objectType } from 'nexus';
import { RestaurantI18L } from 'nexus-prisma';

export const restaurantI18l = objectType({
  name: RestaurantI18L.$name,
  description: RestaurantI18L.$description,
  definition(t) {
    t.field(RestaurantI18L.id);
    t.field(RestaurantI18L.locale);
    t.field(RestaurantI18L.name);
    t.field(RestaurantI18L.restaurant);
  },
});
