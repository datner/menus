import { Item, ItemI18L } from '@prisma/client';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { memo, useRef } from 'react';
import { ItemData } from './ItemData';

type Props = {
  item: Item;
  content: ItemI18L;
  onOrder(item: Item): void;
};

export const MenuItem = memo<Props>((props) => {
  const { item, onOrder, content } = props;
  const { t } = useTranslation('menu');
  const { x, opacity } = useSpring({ x: 0, opacity: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const bind = useDrag(({ active, movement: [mx] }) => {
    const width = ref.current?.getBoundingClientRect().width ?? Infinity;
    const trigger = mx > width / 2;
    const opacityTrigger = Math.min(width / 3, 100);
    const fromThird = mx - opacityTrigger;
    if (!active && trigger) {
      x.start(width * 1.5).then(() => {
        onOrder(item);
        x.set(-width * 1.5);
        x.start(0);
      });
    }

    active && fromThird > 0
      ? opacity.set(fromThird / (width / 2))
      : opacity.start(0);

    if (!x.isAnimating) {
      active && mx > 0 ? x.set(mx) : x.start(0);
    }
  });

  return (
    <animated.li className="relative col-span-1 overflow-hidden p-2">
      <animated.div
        style={{ opacity }}
        className="just absolute inset-0 flex items-center bg-gradient-to-r from-green-400 to-green-700 pl-2 shadow-inner shadow-green-500/50 rtl:flex-row-reverse"
      >
        <span className="text-2xl text-green-900">{t('give me')}</span>
      </animated.div>
      <animated.div
        style={{ x }}
        ref={ref}
        {...bind()}
        className="relative flex flex-1 touch-none overflow-hidden rounded-lg bg-white object-fill shadow"
      >
        <ItemData content={content} price={item.price} />
        <div className="relative h-28 w-56 flex-shrink-0 translate-x-1/4 rtl:-translate-x-1/4">
          <Image
            priority
            layout="fill"
            objectFit="cover"
            src={item.image}
            alt={content.name}
          />
          <div className="absolute inset-y-0 -left-px right-1/2 bg-gradient-to-r from-white rtl:left-1/2 rtl:-right-px rtl:bg-gradient-to-l" />
        </div>
      </animated.div>
    </animated.li>
  );
});

MenuItem.displayName = 'MenuItem';
