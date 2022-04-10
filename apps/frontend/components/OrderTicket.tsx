import { useTranslation } from 'next-i18next';
import { Order } from '../queries/get-orders';
import Image from 'next/image';
import { Item } from '../entities/menu-item';

interface OrderTiketProps {
  order: Order;
  onClick(): void;
}
export function OrderTicket(props: OrderTiketProps): JSX.Element {
  const { order, onClick } = props;
  const { t } = useTranslation();

  return (
    <div
      key={order.id}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="min-w-0 flex-1">
        <button onClick={onClick} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">
            {t('table')} {order.table}
          </p>
          <p className="truncate text-sm text-gray-500">
            {order.items.length} {t('items')}
          </p>
          <div className="mt-2 flow-root">
            <ul role="list" className="-mb-8">
              {order.items.map((item, eventIdx) => (
                <li key={item.id}>
                  <OrderItem
                    item={item}
                    last={eventIdx === order.items.length - 1}
                  />
                </li>
              ))}
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
}

interface OrderItemProps {
  item: Item;
  last: boolean;
}

function OrderItem(props: OrderItemProps) {
  const { item, last } = props;

  return (
    <div className="relative pb-8 pr-6">
      {!last ? (
        <span
          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        />
      ) : null}
      <div className="relative flex space-x-3">
        <div>
          <span className="relative flex h-8 w-8 overflow-hidden rounded-full ring-8 ring-white">
            <Image
              priority
              layout="fill"
              objectFit="cover"
              src={item.thumbnail.url}
              alt={item.thumbnail.alternativeText}
              aria-hidden
            />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-500">{item.name}</p>
          </div>
          <div className="whitespace-nowrap text-right text-sm text-gray-800">
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              {item.price} ₪
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
