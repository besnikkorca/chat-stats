import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import context from './context';
import resolvers from './resolvers';

const typeDefs = fs.readFileSync(path.join(__dirname, './schema.graphql'), 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

export default server;
