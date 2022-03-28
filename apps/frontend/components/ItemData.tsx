import { Item } from 'entities/menu-item';

type Props = {
  item: Item;
};

export function ItemData(props: Props) {
  const { item } = props;
  return (
    <dl className="z-10 p-3 flex-grow flex flex-col">
      <dt className="sr-only">Name</dt>
      <dd className="text-gray-800 text-base">{item.name}</dd>
      <dt className="sr-only">Description</dt>
      <dd className="text-gray-500 text-sm truncate">{item.description}</dd>
      <dt className="sr-only">Price</dt>
      <dd className="mt-3">
        <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
          {item.price} ₪
        </span>
      </dd>
    </dl>
  );
}
