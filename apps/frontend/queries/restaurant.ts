import { gql, useQuery } from '@apollo/client';
import { RestaurantWhereUniqueInput } from '@generated/type-graphql';
import { Restaurant } from '@prisma/client';

const RESTAURANT_CONTENT = gql`
  fragment RestaurantContent on Restaurant {
    content {
      id
      locale
      name
    }
  }
`;

const RESTAURANT_UNIQUES = gql`
  fragment RestaurantUniques on Restaurant {
    id
    identifier
    slug
  }
`;

export type RestaurantUniques = Pick<Restaurant, 'id' | 'slug' | 'identifier'>;

export const GET_RESTAURANT_UNIQUES = gql`
  query GetRestaurantUniques($where: RestaurantWhereUniqueInput!) {
    restaurant(where: $where) {
      ...RestaurantUniques
    }
  }

  ${RESTAURANT_UNIQUES}
`;

export interface GetRestaurantUniquesResponse {
  restaurant: RestaurantUniques;
}
export interface GetRestaurantUniquesVariables {
  where: RestaurantWhereUniqueInput;
}

export const useGetRestaurantUniques = (where: RestaurantWhereUniqueInput) =>
  useQuery<GetRestaurantUniquesResponse, GetRestaurantUniquesVariables>(
    GET_RESTAURANT_UNIQUES,
    { variables: { where } }
  );
