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
const Review = require("./models/Review");


const typeDefs = require("./typeDefs/schema");
const resolvers = require("./resolvers");

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
  credentials: true
}));
app.use(cookieParser());

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

    // Seed sample businesses
    await seedIfEmpty(Business, [
      {
        name: "Green Leaf Café",
        description: "A cozy local café with fresh and healthy options.",
        location: "Main Street",
        ownerId: "test-business-owner-1",
        imageUrl: "https://greenleafcafe.uwo.ca/files/Green_Leaf_1.png"
      },
      {
        name: "QuickFix Electronics",
        description: "Affordable repair services for phones and laptops.",
        location: "Tech Plaza",
        ownerId: "test-business-owner-2",
        imageUrl: "https://img.freepik.com/free-vector/tech-computer-logo-template_23-2149204146.jpg?semt=ais_hybrid&w=740"
      }
    ], "businesses");

    // Fetch freshly seeded businesses by name
    const greenLeaf = await Business.findOne({ name: "Green Leaf Café" });
    const quickFix = await Business.findOne({ name: "QuickFix Electronics" });

    // Seed sample reviews
    await seedIfEmpty(Review, [
      // Reviews for Green Leaf Café
      {
        businessId: greenLeaf?._id,
        author: "Samantha L.",
        text: "The matcha latte is my favorite. Super friendly staff too!",
        rating: 5,
        reply: "Thanks so much, Samantha! See you again soon!",
        createdAt: new Date()
      },
      {
        businessId: greenLeaf?._id,
        author: "Jordan M.",
        text: "Appreciate the healthy options, but the service was a bit slow.",
        rating: 3,
        reply: "Thanks for your patience, Jordan. We’re working on improving speed!",
        createdAt: new Date()
      },

      // Reviews for QuickFix Electronics
      {
        businessId: quickFix?._id,
        author: "Devon R.",
        text: "Repaired my cracked screen in under an hour. Lifesaver!",
        rating: 5,
        reply: "Happy to help, Devon! Glad you're back up and running.",
        createdAt: new Date()
      },
      {
        businessId: quickFix?._id,
        author: "Alex T.",
        text: "Great prices but had to wait a few extra days for a part.",
        rating: 4,
        reply: "Thanks for your patience, Alex — hope everything's working great now!",
        createdAt: new Date()
      }
    ], "reviews");
    

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
