import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { matchSorter, MatchSorterOptions } from 'match-sorter';
import { ForwardedRef } from 'react';
import { forwardRef, Fragment, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import Loading from 'public/three-dots.svg';
import Image from 'next/image';

interface SelectProps<T> {
  options: T[];
  label: string;
  getOptionLabel(value: T | null): string;
  onChange(value: T | null): void;
  initialValue?: T | null;
  matchSorterOptions?: MatchSorterOptions<T>;
  disabled?: boolean;
  loading?: boolean;
}

function DropdownImpl<T>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    getOptionLabel,
    label,
    onChange,
    options,
    initialValue,
    matchSorterOptions,
    loading,
    disabled,
  } = props;
  const [selected, setSelected] = useState(initialValue);
  const [filtered, setFiltered] = useState(options);

  const handleFilter = (query: string) => {
    unstable_batchedUpdates(() => {
      setFiltered(matchSorter(options, query, matchSorterOptions));
    });
  };

  const handleChange = (value: T) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <Combobox disabled={disabled} value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <Combobox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Combobox.Label>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-md border border-gray-300 bg-white pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <Combobox.Input
                ref={ref}
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                placeholder="Select an Option"
                displayValue={(value) =>
                  value ? getOptionLabel(value as T) : ''
                }
                onChange={(event) => handleFilter(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                {loading ? (
                  <span className="mb-1 w-5">
                    <Image src={Loading} alt="loading" />
                  </span>
                ) : (
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </Combobox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filtered.length + options.length === options.length && (
                  <li
                    key="create"
                    className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                  >
                    <span className="block truncate font-normal">
                      No options found
                    </span>
                  </li>
                )}
                {filtered.map((it) => (
                  <Combobox.Option
                    key={getOptionLabel(it)}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={it}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {getOptionLabel(it)}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </>
      )}
    </Combobox>
  );
}

export const Dropdown = forwardRef(DropdownImpl);
