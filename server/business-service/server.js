// business-service/server.js
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Business = require("./models/Business");
const Deal = require("./models/Deal");
const Event = require("./models/Event");


const typeDefs = require("./typeDefs/schema");
const resolvers = require("./resolvers");

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
  credentials: true
}));
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/business-service-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

    // Seed sample businesses
    await seedIfEmpty(Business, [
      {
        name: "Green Leaf Café",
        description: "A cozy local café with fresh and healthy options.",
        location: "Main Street",
        ownerId: "test-business-owner-1"
      },
      {
        name: "QuickFix Electronics",
        description: "Affordable repair services for phones and laptops.",
        location: "Tech Plaza",
        ownerId: "test-business-owner-2"
      }
    ], "businesses");

    // Find one business to link deals to
    const sampleBusiness = await Business.findOne();

    // Seed sample deals
    await seedIfEmpty(Deal, [
      {
        title: "10% Off All Beverages",
        description: "Enjoy a discount all week at Green Leaf Café!",
        businessId: sampleBusiness?._id,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    ], "deals");

    // Seed sample events
    await seedIfEmpty(Event, [
      {
        title: "Community Garden Cleanup",
        description: "Join us for a community effort to clean and beautify the local garden.",
        location: "Maple Park",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        organizerId: "test-organizer-1"
      },
      {
        title: "Local Artisan Fair",
        description: "Support local artisans and explore handmade crafts and foods.",
        location: "Community Hall",
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        organizerId: "test-organizer-2"
      }
    ], "events");

  })
  .catch((err) => console.error("MongoDB connection error:", err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  app.listen({ port: 4003 }, () => {
    console.log(`🚀 Business Service running at http://localhost:4003${server.graphqlPath}`);
  });
});
