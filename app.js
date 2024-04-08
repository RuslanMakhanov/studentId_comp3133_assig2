const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

// Connect to MongoDB
const DB_HOST = "cluster0.imr8hle.mongodb.net"
const DB_USER = "misterruslan1701"
const DB_PASSWORD = "544081"
const DB_NAME = "comp3133_assignment1"
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const { User, Employee } = require('./models/models');

// GraphQL Type Definitions
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    users: [User]
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee
    updateUser(id: ID!, username: String, email: String, password: String): User
    updateEmployee(id: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
    deleteUser(id: ID!): User
    deleteEmployee(id: ID!): Employee
  }
`;


const resolvers = {
  Query: {
    users: async () => await User.find({}),
    employees: async () => await Employee.find({}),
    employee: async (_, { id }) => await Employee.findById(id),
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const newUser = new User({ username, email, password }); // Consider hashing the password
      return await newUser.save();
    },
    createEmployee: async (_, args) => {
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },
    updateUser: async (_, { id, username, email, password }) => {
      return await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
    },
    updateEmployee: async (_, args) => {
      return await Employee.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return { id };
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return { id };
    },
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  const app = express();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
