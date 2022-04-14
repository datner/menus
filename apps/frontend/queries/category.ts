import {
  CategoryWhereInput,
  CategoryWhereUniqueInput,
} from '@generated/type-graphql';
import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { CategoryContent, CategoryUniques, CATEGORY_CONTENT, CATEGORY_UNIQUES } from '../fragments/category';

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories($where: CategoryWhereInput!) {
    categories(where: $where) {
      ...CategoryUniques
      ...CategoryContent
    }
  }

  ${CATEGORY_UNIQUES}
  ${CATEGORY_CONTENT}
`;

export const GET_CATEGORY = gql`
  query GetCategory($where: CategoryWhereUniqueInput!) {
    category(where: $where) {
      ...CategoryUniques
      ...CategoryContent
    }
  }

  ${CATEGORY_UNIQUES}
  ${CATEGORY_CONTENT}
`;

export type GetAllCategory = CategoryUniques & CategoryContent;
export type GetCategory = CategoryUniques & CategoryContent;

export type GetCategoryVariables = { where: CategoryWhereUniqueInput };
export type GetCategoryResponse = {
  category: GetCategory;
};

export type GetAllCategoriesVariables = { where: CategoryWhereInput };
export type GetAllCategoriesResponse = {
  categories: GetAllCategory[];
};

export const useGetCategory = (
  options?: QueryHookOptions<GetCategoryResponse, GetCategoryVariables>
) => useQuery(GET_CATEGORY, options);

export const useGetAllCategories = (
  options?: QueryHookOptions<
    GetAllCategoriesResponse,
    GetAllCategoriesVariables
  >
) => useQuery(GET_ALL_CATEGORIES, options);
