import clsx from 'clsx';
import { ComponentProps, forwardRef, memo } from 'react';

const base =
  'inline-flex items-center border border-transparent font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';

const colors = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
};
const sizes = {
  xs: 'text-xs px-2.5 py-1.5',
  sm: 'text-sm px-3 py-2 leading-4',
  md: 'text-sm px-4 py-2',
};

interface ButtonProps extends ComponentProps<'button'> {
  color: keyof typeof colors;
  size: keyof typeof sizes;
}

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, color, size, ...props }, ref) => (
      <button
        ref={ref}
        {...props}
        className={clsx(base, colors[color], sizes[size])}
      >
        {children}
      </button>
    )
  )
);
