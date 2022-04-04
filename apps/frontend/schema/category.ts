import { objectType } from 'nexus';
import { Cateogry } from 'nexus-prisma';

export const category = objectType({
  name: Cateogry.$name,
  description: Cateogry.$description,
  definition(t) {
    t.field(Cateogry.id);
    t.field(Cateogry.items);
    t.field(Cateogry.menu);
  },
});
