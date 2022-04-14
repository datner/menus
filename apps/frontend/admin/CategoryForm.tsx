import { useMutation } from '@apollo/client';
import { Locale } from '@prisma/client';
import { InputWithAddon, Input, Grid, Button } from '@datner/ui';
import {
  UpsertCategoryResponse,
  UpsertCategoryVariables,
  UPSERT_CATEGORY
} from '../mutations/category';
import { useGetRestaurantUniques } from '../queries/restaurant';
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { useEffect } from 'react';
import { useGetCategory } from '../queries/category';
import { getContent } from '../utils/category';

interface Form {
  en: NestedValue<{
    name: string;
  }>;
  he: NestedValue<{
    name: string;
  }>;
  identifier: string;
}

const CategoryLocale = z.object({
  locale: z.enum([Locale.en, Locale.he]),
  name: z.string(),
  description: z.string().default('')
})

const Form = z
  .object({
    content: CategoryLocale.array(),
    identifier: z
      .string()
      .default('')
      .transform((it) => it.split('-').slice(2).join('-')),
  }).nullish().transform(it => ({
    en: getContent(it, Locale.en),
    he: getContent(it, Locale.he),
    identifier: it ? it.identifier : ''
  }))


const Query = z.object({
  restaurant: z.string().optional(),
  category: z.string().optional(),
});

const IdentifierPrefix = z
  .string()
  .default('loading')
  .transform((it) => `${it}-category-`);

export function CategoryForm() {
  const router = useRouter();
  const query = Query.parse(router.query);
  const { restaurant: slug, category: identifier } = query;
  const { data: { category } = {} } = useGetCategory({
    variables: { where: { identifier } },
    skip: !identifier
  });

  const { register, handleSubmit, reset } = useForm<Form>({
    defaultValues: Form.parse(category),
  });

  useEffect(() => {
    reset(Form.parse(category));
  }, [reset, category]);

  const { data: { restaurant } = {} } = useGetRestaurantUniques({ slug });
  const identifierPrefix = IdentifierPrefix.parse(restaurant?.identifier);

  const [upsertCategory] = useMutation<
    UpsertCategoryResponse,
    UpsertCategoryVariables
  >(UPSERT_CATEGORY);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const identifier = `${identifierPrefix}${data.identifier}`
    await upsertCategory({
      variables: {
        where: { id: category?.id },
        create: {
          identifier,
          content: {
            create: [
              {
                locale: Locale.en,
                name: data.en.name,
              },
              {
                locale: Locale.he,
                name: data.he.name,
              },
            ],
          },
          restaurant: {
            connect: {
              slug,
            },
          },
        },
        update: {
          identifier: { set: identifier },
          content: {
            updateMany: [
              { where: { locale: { equals: Locale.en } }, data: { name: { set: data.en.name } } },
              { where: { locale: { equals: Locale.he } }, data: { name: { set: data.he.name } } },
            ]
          }
        }
      }
    })

    const message = category ?
      `Category ${category.identifier} was successfully updated!` :
      `Category ${data.identifier} was successfully created!`

    toast.success(message);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8"
    >
      <Grid cols={4}>
        <Grid.Item w={4}>
          <div className="flex flex-row-reverse">
            <Button color="primary" type="submit" size="md">
              Save
            </Button>
          </div>
          <hr className="mt-2" />
        </Grid.Item>
        <Grid.Item w={2}>
          <InputWithAddon
            addonText={identifierPrefix}
            mono
            label="Identifier"
            {...register('identifier', { required: 'Identifier is Required' })}
          />
        </Grid.Item>
        <Grid.Spacer w={2} />
        <Grid.Item w={2}>
          <Input
            label="English Name"
            {...register('en.name', {
              required: 'An English name is Required',
            })}
          />
        </Grid.Item>
        <Grid.Item w={2}>
          <Input
            label="Hebrew Name"
            {...register('he.name', { required: 'A Hebrew name is Required' })}
          />
        </Grid.Item>
      </Grid>
    </form>
  );
}
