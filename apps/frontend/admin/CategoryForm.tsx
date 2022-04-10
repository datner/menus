import { useMutation } from '@apollo/client';
import { Locale } from '@prisma/client';
import { InputWithAddon, Input, Grid } from '@datner/ui';
import {
  CreateCategoryResponse,
  CreateCategoryVariables,
  CREATE_CATEGORY,
} from '../mutations/category';
import { useGetRestaurantUniques } from '../queries/restaurant';
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Form {
  en: NestedValue<{
    name: string;
    description: string;
  }>;
  he: NestedValue<{
    name: string;
    description: string;
  }>;
  identifier: string;
}

type Props = {
  restaurant?: string;
};

export function CategoryForm(props: Props) {
  const { restaurant: slug } = props;
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      en: {
        name: '',
        description: '',
      },
      he: {
        name: '',
        description: '',
      },
      identifier: '',
    },
  });

  const { data: { restaurant } = {} } = useGetRestaurantUniques({ slug });
  const identifierPrefix = `${restaurant?.identifier}-category-`;

  const [createCategory] = useMutation<
    CreateCategoryResponse,
    CreateCategoryVariables
  >(CREATE_CATEGORY);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await createCategory({
      variables: {
        category: {
          identifier: `${identifierPrefix}${data.identifier}`,
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
      },
    });

    toast.success(`Category ${data.identifier} was successfully created!`);
  };

  return (
    <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
      <Grid onSubmit={handleSubmit(onSubmit)} cols={4}>
        <Grid.Item w={4}>
          <div className="flex">
            <div className="flex-1">
              <h3 className="text-lg font-medium leading-6 text-gray-800">
                Properties
              </h3>
            </div>
            <div className="flex-shrink-0">bababooi</div>
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
        <Grid.Item w={4}>
          <h3 className="text-lg font-medium leading-6 text-gray-800">
            Content
          </h3>
          <hr className="mt-2" />
        </Grid.Item>
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
    </div>
  );
}
