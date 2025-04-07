// server/auth-service/index.js
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001',
  'http://localhost:3002','https://studio.apollographql.com'], // Adjust the origin according to your micro frontends' host
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Resident", "BusinessOwner", "CommunityOrganizer"], required: true }
});
const User = mongoose.model("User", userSchema);

// GraphQL TypeDefs
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
  }
  type Query {
    currentUser: User
  }
  type Mutation {
    register(username: String!, password: String!, role: String!): Boolean
    login(username: String!, password: String!): String
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    currentUser: (_, __, { req }) => {
      const token = req.cookies["token"];
      if (!token) return null;
      try {
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        return null;
      }
    }
  },
  Mutation: {
    register: async (_, { username, password, role }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await new User({ username, password: hashedPassword, role }).save();
      return true;
    },
    login: async (_, { username, password }, { res }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.cookie("token", token, {
        httpOnly: false, // Set to true in production
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,         // ⚠️ Set to true in production
        sameSite: "Lax",       // use "None" + "Secure" if cross-origin - Lax ok for same-origin
      });
      return token;
    }
  }
};

// Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res }) });
server.start().then(() => {
  server.applyMiddleware({ app, cors: false });
  app.listen({ port: 4001 }, () =>
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
  );
});
