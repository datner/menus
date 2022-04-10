import { Dropdown } from '../components/Dropdown';
import { Category, CategoryWhereInput } from '@generated/type-graphql';
import { NestedValue, useController, useForm } from 'react-hook-form';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/ReadonlyArray';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Locale } from '@prisma/client';
import { Grid, Input } from '@datner/ui';

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

const GET_CATEGORY_OPTIONS = gql`
  query GetCategoryOptions($where: CategoryWhereInput) {
    categories(where: $where) {
      id
      content {
        name
      }
      identifier
    }
  }
`;

type Props = {
  restaurant?: string;
};

export function ItemForm(props: Props) {
  const { restaurant: slug } = props;
  const { locale = Locale.en } = useRouter();
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

  const { data: { categories = [] } = {}, loading } = useQuery<
    { categories: Category[] },
    { where: CategoryWhereInput }
  >(GET_CATEGORY_OPTIONS, {
    variables: {
      where: {
        restaurant: { is: { slug: { equals: slug } } },
      },
    },
  });

  const { field } = useController({ control, name: 'category' });

  const findLabel = (category: Category | null) =>
    pipe(
      category?.content,
      O.fromNullable,
      O.chain(A.findFirst((it) => it.locale === locale)),
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

  return (
    <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
      <Grid cols={4}>
        <Grid.Item w={4}>
          <h3 className="text-lg font-medium leading-6 text-gray-800">
            Properties
          </h3>
          <hr className="mt-2" />
        </Grid.Item>
        <Grid.Item w={2}>
          <Dropdown
            loading={loading}
            options={categories}
            getOptionLabel={findLabel}
            label="Category"
            onChange={(it) => field.onChange(it?.id ?? '')}
          />
        </Grid.Item>
        <Grid.Item w={1}>
          <Input label="Price (in NIS)" {...register('price')} />
        </Grid.Item>
        <Grid.Item w={1}>
          <Input mono label="Identifier" {...register('identifier')} />
        </Grid.Item>
        <Grid.Item w={4}>
          <h3 className="text-lg font-medium leading-6 text-gray-800">
            Content
          </h3>
          <hr className="mt-2" />
        </Grid.Item>
        <Grid.Item w={2}>
          <Input label="English Name" {...register('en.name')} />
        </Grid.Item>
        <Grid.Item w={2}>
          <Input label="English Description" {...register('en.description')} />
        </Grid.Item>
        <Grid.Item w={2}>
          <Input label="Hebrew Name" {...register('he.name')} />
        </Grid.Item>
        <Grid.Item w={2}>
          <Input label="Hebrew Description" {...register('he.description')} />
        </Grid.Item>
      </Grid>
    </div>
  );
}
