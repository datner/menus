import { objectType } from 'nexus';
import { ItemI18L } from 'nexus-prisma';

export const itemI18l = objectType({
  name: ItemI18L.$name,
  description: ItemI18L.$description,
  definition(t) {
    t.field(ItemI18L.id);
    t.field(ItemI18L.item);
    t.field(ItemI18L.locale);
    t.field(ItemI18L.name);
  },
});
