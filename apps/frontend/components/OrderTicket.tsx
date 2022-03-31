import { useTranslation } from 'next-i18next';
import { Order } from 'queries/get-orders';
import Image from 'next/image';
import { Item } from 'entities/menu-item';

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
      className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    >
      <div className="flex-1 min-w-0">
        <button onClick={onClick} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">
            {t('table')} {order.table}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {order.items.length} {t('items')}
          </p>
          <div className="flow-root mt-2">
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
          <span className="h-8 w-8 rounded-full relative overflow-hidden flex ring-8 ring-white">
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
        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
          <div>
            <p className="text-sm text-gray-500">{item.name}</p>
          </div>
          <div className="text-right text-sm whitespace-nowrap text-gray-800">
            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              {item.price} ₪
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
