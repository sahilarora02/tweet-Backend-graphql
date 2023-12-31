const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { expressMiddleware } = require('@apollo/server/express4');
const userSchema = require('./Schema/userSchema');
const userResolver = require('./Resolvers/userResolver');
const postResolver = require('./Resolvers/postResolver')
const User = require('./Models/userModel');
const Post = require('./Models/postModel')
const postSchema = require('./Schema/postSchema');
require('dotenv').config();

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: [userSchema, postSchema],
    resolvers: [userResolver, postResolver],
    context: () => ({ User, Post }),
  });

  app.use(bodyParser.json());
  app.use(cors());

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Start the Apollo Server
  await server.start();

  // Apply Apollo Server middleware
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(8000, () => console.log('PORT LISTEN ON 8000'));
}

startServer();
