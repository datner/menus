import { Dropdown } from 'components/Dropdown';
import { Category } from '@generated/type-graphql';
import { ComponentPropsWithRef, forwardRef, ForwardedRef } from 'react';
import { NestedValue, useController, useForm } from 'react-hook-form';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/ReadonlyArray';

interface Form {
  en: NestedValue<{
    name: string;
    description: string;
  }>;
  he: NestedValue<{
    name: string;
    description: string;
  }>;
  price: number;
  identifier: string;
  category: string;
  image: File;
}

export function ItemForm() {
  const { register, control } = useForm<Form>({
    defaultValues: {
      en: {
        name: '',
        description: '',
      },
      he: {
        name: '',
        description: '',
      },
      price: 0,
      identifier: '',
      category: '',
    },
  });

  const { field } = useController({ control, name: 'category' });

  const findLabel = (category: Category | null) =>
    pipe(
      category?.content,
      O.fromNullable,
      O.chain(A.findFirst((it) => it.locale === 'en')),
      O.map((it) => it.name),
      O.getOrElse(() => '')
    );

  return (
    <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
      <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="w-28 sm:col-span-1">
          <Input label="Price (in NIS)" {...register('price')} />
        </div>
        <div className="sm:col-span-1">
          <Dropdown
            {...field}
            options={[] as Category[]}
            getOptionLabel={findLabel}
            label="Category"
            onChange={(it) => field.onChange(it?.id ?? '')}
          />
        </div>
        <div className="sm:col-span-2">
          <h3 className="text-lg font-medium leading-6 text-gray-800">
            Content
          </h3>
          <hr className="mt-2" />
        </div>
        <div className="sm:col-span-1">
          <Input label="English Name" {...register('en.name')} />
        </div>
        <div className="sm:col-span-1">
          <Input label="English Description" {...register('en.description')} />
        </div>
        <div className="sm:col-span-1">
          <Input label="Hebrew Name" {...register('he.name')} />
        </div>
        <div className="sm:col-span-1">
          <Input label="Hebrew Description" {...register('he.description')} />
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">About</dt>
          <dd
            className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
            dangerouslySetInnerHTML={{ __html: 'yuh' }}
          />
        </div>
      </form>
    </div>
  );
}

interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string;
}

const InputImpl = (
  { label, ...props }: InputProps,
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
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>
);

const Input = forwardRef<HTMLInputElement, InputProps>(InputImpl);
