import { PropsWithChildren } from 'react';

type Props = object;

export function MenuList(props: PropsWithChildren<Props>) {
  const { children } = props;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 bg-gray-50 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      {children}
    </ul>
  );
}
