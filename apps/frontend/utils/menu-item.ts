import { Thumbnail } from 'entities/menu-item';

export function getUrl(thumbnail: Thumbnail, format?: string) {
  if (!format) return `${process.env.ASSET_URL}/${thumbnail.url}`;
  const { ext, hash } = thumbnail.formats[format];
  return `${process.env.ASSET_URL}/${hash + ext}`;
}
