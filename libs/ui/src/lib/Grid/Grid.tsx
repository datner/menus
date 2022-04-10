import { ComponentPropsWithRef, CSSProperties, forwardRef } from 'react';

interface FormGridProps extends ComponentPropsWithRef<'div'> {
  cols: keyof typeof gridCols;
}

const gridCols = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  7: 'sm:grid-cols-7',
  8: 'sm:grid-cols-8',
  9: 'sm:grid-cols-9',
  10: 'sm:grid-cols-10',
  11: 'sm:grid-cols-11',
  12: 'sm:grid-cols-12',
};

export const ForwardedGrid = forwardRef<HTMLDivElement, FormGridProps>(
  function Grid({ children, cols, ...props }, ref) {
    return (
      <div
        ref={ref}
        {...props}
        style={{ '--cols': cols } as CSSProperties}
        className={`grid grid-cols-1 gap-4 ${gridCols[cols]}`}
      >
        {children}
      </div>
    );
  }
);
