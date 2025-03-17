// server/community-service/server.js
require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
  credentials: true 
}));
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/community-service-db", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define GraphQL Schema
const typeDefs = gql`
  type News {
    id: ID!
    title: String!
    content: String!
  }

  type Event {
    id: ID!
    name: String!
    date: String!
    location: String!
  }

  type Business {
    id: ID!
    name: String!
    category: String!
  }

  type Query {
    getNews: [News]
    getEvents: [Event]
    getBusinesses: [Business]
  }
`;

// Sample Data
const news = [
  { id: "1", title: "Community Cleanup Drive", content: "Join us this weekend for a neighborhood cleanup event!" },
  { id: "2", title: "New Park Opening", content: "A brand new park is opening in our community this Friday!" }
];

const events = [
  { id: "1", name: "Farmers Market", date: "2024-06-15", location: "Downtown Plaza" },
  { id: "2", name: "Tech Meetup", date: "2024-06-22", location: "Co-working Space" }
];

const businesses = [
  { id: "1", name: "Joe's Coffee Shop", category: "Cafe" },
  { id: "2", name: "Green Grocers", category: "Grocery Store" }
];

// Define Resolvers
const resolvers = {
  Query: {
    getNews: () => news,
    getEvents: () => events,
    getBusinesses: () => businesses
  }
};

// Create GraphQL Server
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  app.listen({ port: 4002 }, () => console.log("🚀 Community Service running at http://localhost:4002/graphql"));
});
