import { ForwardedGrid as _Grid } from './Grid';
import { ForwardedItem } from './Item';

export const Grid = Object.assign(_Grid, {
  Item: ForwardedItem,
});
