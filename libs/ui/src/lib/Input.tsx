import clsx from 'clsx';
import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string;
  mono?: boolean;
}

const InputImpl = (
  { label, mono, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => (
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        ref={ref}
        type="text"
        {...props}
        className={clsx(
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          mono && 'font-mono'
        )}
      />
    </div>
  </div>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(InputImpl);
