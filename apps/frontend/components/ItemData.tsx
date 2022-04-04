import { ItemI18L } from '@prisma/client';
import { useTranslation } from 'next-i18next';

type Props = {
  price: number;
  content: ItemI18L;
};

export function ItemData(props: Props) {
  const { price, content } = props;
  const { t } = useTranslation();
  return (
    <dl className="z-10 p-3 flex-grow flex flex-col">
      <dt className="sr-only">{t('name')}</dt>
      <dd className="text-gray-800 text-base">{content.name}</dd>
      <dt className="sr-only">{t('description')}</dt>
      <dd className="text-gray-500 text-sm truncate">{content.description}</dd>
      <dt className="sr-only">{t('price')}</dt>
      <dd className="mt-3">
        <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
          {price} ₪
        </span>
      </dd>
    </dl>
  );
}
