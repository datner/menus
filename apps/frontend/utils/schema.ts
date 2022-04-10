import 'reflect-metadata';
import { resolvers } from '@generated/type-graphql';
import { buildSchema } from 'type-graphql';

export const schema = await buildSchema({
  resolvers,
  validate: false,
  emitSchemaFile: true,
});
