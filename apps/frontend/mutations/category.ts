import { CategoryCreateInput, CategoryWhereUniqueInput, CategoryUpdateInput } from '@generated/type-graphql';
import { gql } from '@apollo/client';
import { CategoryContent, CategoryUniques, CATEGORY_CONTENT, CATEGORY_UNIQUES } from '../fragments/category';

export const UPSERT_CATEGORY = gql`
  mutation UpsertCategory(
    $where: CategoryWhereUniqueInput!
    $create: CategoryCreateInput!
    $update: CategoryUpdateInput!
  ) {
    upsertCategory(where: $where, create: $create, update: $update) {
      ...CategoryUniques
      ...CategoryContent
    }
  }

 ${CATEGORY_UNIQUES}
 ${CATEGORY_CONTENT}
`;

export interface UpsertCategoryResponse {
  upsertCategory: CategoryContent & CategoryUniques
}

export interface UpsertCategoryVariables {
  where: CategoryWhereUniqueInput
  create: CategoryCreateInput
  update: CategoryUpdateInput
}

