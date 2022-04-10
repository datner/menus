import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

interface FormGridItemProps extends ComponentPropsWithRef<'div'> {
  w: keyof typeof spans;
}

const spans = {
  1: 'sm:col-span-1',
  2: 'sm:col-span-2',
  3: 'sm:col-span-3',
  4: 'sm:col-span-4',
  5: 'sm:col-span-5',
  6: 'sm:col-span-6',
  7: 'sm:col-span-7',
  8: 'sm:col-span-8',
  9: 'sm:col-span-9',
  10: 'sm:col-span-10',
  11: 'sm:col-span-11',
  12: 'sm:col-span-12',
};

export const ForwardedItem = forwardRef<HTMLDivElement, FormGridItemProps>(
  function GridItem({ children, w, ...props }, ref) {
    return (
      <div ref={ref} {...props} className={clsx(spans[w], props.className)}>
        {children}
      </div>
    );
  }
);
