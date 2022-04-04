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
    <animated.li className="col-span-1 p-2 relative overflow-hidden">
      <animated.div
        style={{ opacity }}
        className="bg-gradient-to-r pl-2 shadow-inner shadow-green-500/50 from-green-400 to-green-700 flex rtl:flex-row-reverse just items-center absolute inset-0"
      >
        <span className="text-2xl text-green-900">{t('give me')}</span>
      </animated.div>
      <animated.div
        style={{ x }}
        ref={ref}
        {...bind()}
        className="flex-1 flex relative object-fill touch-none bg-white rounded-lg overflow-hidden shadow"
      >
        <ItemData content={content} price={item.price} />
        <div className="h-28 relative w-56 flex-shrink-0 translate-x-1/4 rtl:-translate-x-1/4">
          <Image
            priority
            layout="fill"
            objectFit="cover"
            src={item.image}
            alt={content.name}
          />
          <div className="absolute inset-y-0 -left-px right-1/2 rtl:left-1/2 rtl:-right-px bg-gradient-to-r rtl:bg-gradient-to-l from-white" />
        </div>
      </animated.div>
    </animated.li>
  );
});

MenuItem.displayName = 'MenuItem';
