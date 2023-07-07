require("dotenv").config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./controllers/user-controller');
const sequelize = require('./utils/db');
const { seedDatabase } = require('./models/user')

const typeDefs = gql`
type User {
    id: UUID!
    name: String!
    email: String!
    age: Int!
  }
  
  scalar UUID
  
  type Query {
    users: [User!]!
    user(id: UUID!): User
  }
  
  type Mutation {
    createUser(name: String!, email: String!, age: Int!): User
    updateUser(id: UUID!, name: String!, email: String!, age: Int!): User
    deleteUser(id: UUID!): User
  }
  
`;

const resolvers = {
    // analogous to GET
    Query: {
        users: () => getUsers(),
        user: (_, { id }) => getUserById(id),
    },
    // analogous to POST, PUT, DELETE
    Mutation: {
        createUser: (_, { name, email, age }) => createUser(name, email, age),
        updateUser: (_, { id, name, email, age }) => updateUser(id, name, email, age),
        deleteUser: (_, { id }) => deleteUser(id),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

(async () => {
    try {
        await sequelize.sync({ alter: false });
        console.log('Database synchronized successfully.');
        const port = process.env.APP_PORT || 3000;
        await server.start();
        await server.applyMiddleware({ app });
        await seedDatabase();
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error('Error: ', error);
    }
})();
