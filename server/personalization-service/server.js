// server/personaization-service/server.js
 
require('dotenv').config();

const express = require('express');
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
  credentials: true
}));

// Enable JSON parsing
app.use(express.json());

// GraphQL setup
const typeDefs = gql`
  type Query {
    test: String
  }

  type Mutation {
    generateSummary(prompt: String!, size: Int!): String
    analyzeSentiment(prompt: String!, size: Int!): String
    matchVolunteers(requestedBy: String!, volunteers: String!): String
}
`;

const resolvers = {
  Query: {
    test: () => "Hello from Apollo Server!",
  },
  Mutation: {
    generateSummary: async (_, { prompt, size }) => {
      try {
        // Validate input
        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
          throw new Error("Invalid prompt. Please provide a valid string.");
        }
        if (!size || typeof size !== 'number' || size <= 0) {
          throw new Error("Invalid size. Please provide a positive integer.");
        }

        // Generate the summary
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const instructions = `In ${size} characters, summarize the following: `;
        const result = await model.generateContent(instructions + prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error("Error in generateSummary:", error);
        throw new Error("Failed to generate summary.");
      }
    },

    analyzeSentiment: async (_, { prompt, size }) => {
      try {
        // Validate input
        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
          throw new Error("Invalid prompt. Please provide a valid string.");
        }
        if (!size || typeof size !== 'number' || size <= 0) {
          throw new Error("Invalid size. Please provide a positive integer.");
        }

        // Perform sentiment analysis
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const instructions = `In ${size} characters, perform a sentiment analysis on the following: `;
        const result = await model.generateContent(instructions + prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error("Error in analyzeSentiment:", error);
        throw new Error("Failed to analyze sentiment.");
      }
    },

    matchVolunteers: async (_, { requestedBy, volunteers }) => {
      try {
        // Validate input
        if (!requestedBy || typeof requestedBy !== 'string' || requestedBy.trim() === '') {
          throw new Error("Invalid requestedBy. Please provide a valid string describing the requester and their needs.");
        }
        if (!volunteers || typeof volunteers !== 'string' || volunteers.trim() === '') {
          throw new Error("Invalid volunteers. Please provide a valid string describing the volunteers and their skills.");
        }
    
        // Match volunteers
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const instructions = "Please match a volunteer with the requester based on their needs and skills: ";
        const prompt = instructions + "\nRequested By: " + requestedBy + "\nVolunteers: " + volunteers;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error("Error in matchVolunteers:", error);
        throw new Error("Failed to match volunteers.");
      }
    },
  },
};

/* Manual Tests for the GraphQL API Playground 

mutation {
  generateSummary(prompt: "Summarize the latest advancements in AI technology.", size: 100)
}

mutation {
  analyzeSentiment(prompt: "I love how easy it is to use this new AI tool!", size: 150)
}

mutation {
  analyzeSentiment(prompt: "This class has way too much homework. It's killing me", size: 150)
}

mutation {
  matchVolunteers(
    requestedBy: "A community center needs volunteers to teach coding to children.",
    volunteers: "John Doe: Experienced in teaching Python. Jane Smith: Skilled in JavaScript and web development. Alex Johnson: Beginner in programming but eager to help."
  )
}

*/

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  // Start the server
  app.listen({ port: 4004 }, () => {
    console.log("🚀 Personalization Service running at:");
    console.log("GraphQL API: http://localhost:4004/graphql");
  });
});