import { objectType } from 'nexus';
import { Menu } from 'nexus-prisma';

export const menu = objectType({
  name: Menu.$name,
  description: Menu.$description,
  definition(t) {
    t.field(Menu.id);
    t.field(Menu.categories);
    t.field(Menu.restaurant);
  },
});
