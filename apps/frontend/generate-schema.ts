import 'reflect-metadata';
import { resolvers } from '@generated/type-graphql';
import { join } from 'path';
import { buildSchema } from 'type-graphql';

(async () => {
  await buildSchema({
    resolvers,
    emitSchemaFile: join(__dirname, 'generated/schema.graphql'),
  });
})();
