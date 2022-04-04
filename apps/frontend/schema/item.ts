import { objectType } from 'nexus';
import { Item } from 'nexus-prisma';

export const item = objectType({
  name: Item.$name,
  description: Item.$description,
  definition(t) {
    t.field(Item.id);
    t.field(Item.category);
    t.field(Item.content);
    t.field(Item.price);
    t.field(Item.image);
  },
});
