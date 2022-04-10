import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-micro';
import { NextApiHandler } from 'next';
import { schema } from '../../utils/schema';

const apolloServer = new ApolloServer({
  schema,
  context: {
    prisma: new PrismaClient(),
  },
});

const startServer = apolloServer.start();
let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await startServer;

    apolloServerHandler = apolloServer.createHandler({
      path: '/api/graphql',
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
