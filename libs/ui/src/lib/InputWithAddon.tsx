import type { InputProps } from './Input';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

interface InputWithAddonProps extends InputProps {
  addonText: string;
}

const InputWithAddonImpl = (
  { label, addonText, mono, ...props }: InputWithAddonProps,
  ref: ForwardedRef<HTMLInputElement>
) => (
  <div>
    <label
      htmlFor={props.id || props.name}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <div className="relative mt-1 flex rounded-md shadow-sm">
      <div className="pointer-events-none flex items-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-3 text-gray-500">
        <span className="pb-1 text-gray-500 sm:text-sm">{addonText}</span>
      </div>
      <input
        ref={ref}
        type="text"
        id={props.name}
        {...props}
        className={clsx(
          'block w-full rounded-md rounded-l-none border-gray-300 pl-0 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          mono && 'font-mono'
        )}
      />
    </div>
  </div>
);

export const InputWithAddon = forwardRef<HTMLInputElement, InputWithAddonProps>(
  InputWithAddonImpl
);
