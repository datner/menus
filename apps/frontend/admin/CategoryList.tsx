import { FilterIcon, SearchIcon } from '@heroicons/react/solid';
import { GetAllCategory, useGetAllCategories } from '../queries/category';
import { matchSorter, MatchSorterOptions } from 'match-sorter';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import { Locale } from '@prisma/client';
import { useState } from 'react';
import { useCategoryState } from './category/CategoryContext';
import Link from 'next/link';

const getName = (category: GetAllCategory, locale: Locale) =>
  pipe(
    category.content,
    A.findFirst((it) => it.locale === locale),
    O.match(
      () =>
        pipe(
          category,
          O.fromNullable,
          O.map((it) => it.identifier),
          O.getOrElse(() => 'unknown')
        ),
      (it) => it.name
    )
  );

type Props = {
  restaurant?: string;
};

export function CategoryList(props: Props) {
  const { restaurant } = props;
  const [filtered, setFiltered] = useState<GetAllCategory[]>([]);

  const { data: { categories = [] } = {} } = useGetAllCategories({
    variables: {
      where: {
        restaurant: { is: { slug: { equals: restaurant } } },
      },
    },
    onCompleted({ categories }) {
      setFiltered(categories);
    },
  });

  const handleFilter = (query: string) => {
    setFiltered(
      matchSorter(categories, query, { keys: ['identifier', 'content.*.name'] })
    );
  };

  return (
    <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
      <div className="px-6 pt-6 pb-4">
        <div className="flex">
          <div className="flex-1">
            <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            <p className="mt-1 text-sm text-gray-600">
              Search directory of {categories.length} categories
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="ml-4 mt-2 flex-shrink-0">
              <Link
                href={{
                  query: { restaurant },
                }}
              >
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create new category
                </button>
              </Link>
            </div>
          </div>
        </div>
        <form className="mt-6 flex space-x-4" action="#">
          <div className="min-w-0 flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                placeholder="Search"
                onChange={(e) => handleFilter(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      {/* Directory list */}
      <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
        <ul
          role="list"
          className="relative z-0 divide-y divide-gray-200 border-y border-gray-200"
        >
          {filtered.map((category) => (
            <li key={category.id}>
              <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-slate-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={{
                      query: { category: category.identifier, restaurant },
                    }}
                  >
                    <a className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {category.identifier}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {getName(category, Locale.en)}/
                        {getName(category, Locale.he)}
                      </p>
                    </a>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
