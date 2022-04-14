import { ForwardedGrid as _Grid } from './Grid';
import { ForwardedItem } from './Item';
import { ForwardedSpacer } from './Spacer';

export const Grid = Object.assign(_Grid, {
  Item: ForwardedItem,
  Spacer: ForwardedSpacer,
});
