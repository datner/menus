import { getSdk } from 'generated/graphql';
import { GraphQLClient } from 'graphql-request';
import { invariant } from './invariant';

export function getClient() {
  const url = process.env.NEXT_PUBLIC_API_GRAPHQL;
  invariant(url, 'no api url found');
  const client = new GraphQLClient(url);
  return getSdk(client);
}
