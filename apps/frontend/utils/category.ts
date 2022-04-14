import { CategoryI18L, Locale } from '@prisma/client';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import { GetAllCategory } from '../queries/category';
import { Nullish } from './types';

export const getName = (category: GetAllCategory, locale: Locale) =>
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

interface CategoryLike {
  content: Pick<CategoryI18L, 'name' | 'description' | 'locale'>[]
}

export const getContent = (category: Nullish<CategoryLike>, locale: Locale) =>
  pipe(
    category?.content,
    O.fromNullable,
    O.chain(
      A.findFirst((it) => it.locale === locale),
    ),
    O.getOrElse<Pick<CategoryI18L, 'name' | 'description'>>(() => ({
      description: '',
      name: '',
    }))
  );
