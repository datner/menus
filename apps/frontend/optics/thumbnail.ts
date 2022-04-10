import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as L from 'monocle-ts/Lens';
import * as T from 'monocle-ts/Traversal';
import { RestaurantWithMenu } from '../queries/get-retaurant-with-menu';

export const thumbnail = pipe(
  L.id<RestaurantWithMenu>(),
  L.prop('menu'),
  L.prop('items'),
  L.traverse(A.Traversable),
  T.prop('thumbnail')
);
