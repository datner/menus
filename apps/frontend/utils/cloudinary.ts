import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { cld } from 'cloudinary-config';
import { pipe } from 'fp-ts/function';
import * as T from 'monocle-ts/Traversal';
import { thumbnail } from 'optics/thumbnail';

export type CloudinaryConfigure = (image: CloudinaryImage) => CloudinaryImage;

export const menuItem: CloudinaryConfigure = (img) =>
  img.resize(fill(448, 224).gravity('north'));

export const makeAssetTransormer = (config: CloudinaryConfigure) =>
  pipe(
    thumbnail,
    T.modify((it) => {
      it.url = pipe(it.hash, cld.image, config).toURL();
      return it;
    })
  );
