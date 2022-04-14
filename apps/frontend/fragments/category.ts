import { gql } from "@apollo/client";
import { Category, CategoryI18L } from "@prisma/client";

export const CATEGORY_UNIQUES = gql`
  fragment CategoryUniques on Category {
    id
    identifier
  }
`;

export type CategoryUniques = Pick<Category, 'id' | 'identifier'>;

export const CATEGORY_CONTENT = gql`
  fragment CategoryContent on Category {
    content {
      id
      locale
      name
      description
    }
  }
`;

export type CategoryContent = {
  content: Pick<CategoryI18L, 'locale' | 'id' | 'name' | 'description'>[];
};
