import { CategoryCreateInput } from '@generated/type-graphql';
import { gql } from '@apollo/client';
import { Locale } from '@prisma/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($category: CategoryCreateInput!) {
    createCategory(data: $category) {
      id
      content {
        name
        locale
      }
    }
  }
`;

export interface CreateCategoryResponse {
  createCategory: {
    id: number;
    content: { name: string; locale: Locale }[];
  };
}

export interface CreateCategoryVariables {
  category: CategoryCreateInput;
}
