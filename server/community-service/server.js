// server/community-service/server.js
require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const typeDefs = require("./typeDefs/schema");
const resolvers = require("./resolvers");

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
  credentials: true 
}));
app.use(cookieParser());

const News = require("./models/News");
const Discussion = require("./models/Discussion");
const HelpRequest = require("./models/HelpRequest");
const Volunteer = require("./models/Volunteer");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const seedIfEmpty = async (model, entries, label) => {
      const count = await model.countDocuments();
      if (count === 0) {
        await model.insertMany(entries);
        console.log(`🌱 Seeded ${entries.length} sample ${label}!`);
      }
    };

    await seedIfEmpty(Volunteer, [
      { name: "Emily R.", type: "Pet Care", contact: "emily@example.com" },
      { name: "Carlos M.", type: "Gardening", contact: "carlos@example.com" },
      { name: "Fatima A.", type: "Tech Help", contact: "fatima@example.com" },
    ], "volunteers");

    await seedIfEmpty(HelpRequest, [
      {
        title: "Need a dog walker for next weekend",
        description: "Looking for someone to walk my Labrador while I'm away.",
        category: "Pet Care",
        postedBy: "Jenna T.",
        createdAt: new Date()
      },
      {
        title: "Borrow a ladder?",
        description: "I need to reach my roof to clean the gutters. Can anyone lend a ladder?",
        category: "Tool Sharing",
        postedBy: "Raj K.",
        createdAt: new Date()
      }
    ], "help requests");

    await seedIfEmpty(News, [
      {
        title: "Community Pool Reopening!",
        content: "After months of renovation, the pool reopens this Saturday with free admission.",
        createdAt: new Date()
      },
      {
        title: "Local Library Adds Sunday Hours",
        content: "The neighborhood library will now be open from 12-5 PM on Sundays.",
        createdAt: new Date()
      }
    ], "news");

    await seedIfEmpty(Discussion, [
      {
        topic: "Best pizza place in the area?",
        message: "I'm new here and would love some pizza recommendations!",
        author: "Sam L.",
        createdAt: new Date()
      },
      {
        topic: "Ideas for a block party?",
        message: "Would anyone be interested in organizing a summer block party?",
        author: "Mina C.",
        createdAt: new Date()
      }
    ], "discussions");

  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Create GraphQL Server
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  app.listen({ port: 4002 }, () => console.log("🚀 Community Service running at http://localhost:4002/graphql"));
});
