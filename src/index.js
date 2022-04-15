import express from 'express';
import { ApolloServer } from 'apollo-server-express'; // Crée le serveur
import { Query } from './resolvers/Query.mjs';
import { Mutation } from './resolvers/Mutation.mjs';
import { loadFile } from 'graphql-import-files'; // librairie pour charger les fichiers
import { db } from './db/db.mjs';

const app = express();
const typeDefs = loadFile('src/schemas/schema.graphql'); // schemas

let apolloServer = null;

// resolvers : gestionnaire de requêtes.
const resolvers = {
  Query,
  Mutation,
};

// lancement du server
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // permet l'accès à la db depuis les résolveurs (en 3ème paramètre)
    context: async ({ req }) => {
      return {
        db,
      };
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen({ port: 4005 }, () => {
  console.log(`Serveur sur http://localhost:4005${apolloServer.graphqlPath}`);
});
