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
    matchVolunteers(requestedBy: String!, volunteers: String!, size: Int!): String
    engagementAnalysis(prompt: String!, size: Int!): String
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
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
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
        const instructions = `In ${size} characters, analyze the following reviews for sentiment but, where applicable, pay special attention to exaggerated complaints, sarcasm, or over-the-top expectations. Look for inconsistencies, contradictions, and absurd demands that indicate the reviewer is being unreasonable or overly dramatic. The sentiment may still be negative, but the tone could be comically disproportionate to the situation. Consider the language used, such as hyperbole, or any signs that the reviewer has unrealistic expectations of the service or product. Reviews: `;
        const result = await model.generateContent(instructions + prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error("Error in analyzeSentiment:", error);
        throw new Error("Failed to analyze sentiment.");
      }
    },

    matchVolunteers: async (_, { requestedBy, volunteers, size }) => {
      try {
        // Validate input
        if (!requestedBy || typeof requestedBy !== 'string' || requestedBy.trim() === '') {
          throw new Error("Invalid requestedBy. Please provide a valid string describing the requester and their needs.");
        }
        if (!volunteers || typeof volunteers !== 'string' || volunteers.trim() === '') {
          throw new Error("Invalid volunteers. Please provide a valid string describing the volunteers and their skills.");
        }
        if (!size || typeof size !== 'number' || size <= 0) {
          throw new Error("Invalid size. Please provide a positive integer.");
        }
    
        // Match volunteers
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const instructions = "In ${size} characters, please match a volunteer with the requester based on their needs and skills: ";
        const prompt = instructions + "\nRequested By: " + requestedBy + "\nVolunteers: " + volunteers + ". Where there is no exact match, suggest the best possible match. Don't forget to provide the volunteer's contact information in the format Contact: <contact info>";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error("Error in matchVolunteers:", error);
        throw new Error("Failed to match volunteers.");
      }
    },

    engagementAnalysis: async (_, { prompt, size }) => {
      try {
        // Validate input
        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
          throw new Error("Invalid prompt. Please provide a valid string.");
        }
        if (!size || typeof size !== 'number' || size <= 0) {
          throw new Error("Invalid size. Please provide a positive integer.");
        }

        // Perform engagement analysis
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const instructions1 = `In ${size} characters, based on local engagement patterns in the Greater Toronto and Surrounding Area (GTA), analyze the likely turnout and community interaction level for the following event: `;
        const instructions2 = ` Using historical engagement trends, day-of-week preferences, time-of-day behaviors, and local seasonal patterns, identify the most OPTIMAL SCHEDULING (month, day of week and time slot) for maximum participation. Also include a PREDICTED ENGAGEMENT for the date/time provided (if any), a GENERAL OVEVIEW with the predicted engagement level for different day/time options (e.g., high / moderate / low); a RECOMMENDED OPTION with an explanation; and analyze KEY FACTORS influencing the outcome (e.g., weather seasonality, work schedules, school calendar, past event behavior, etc.) Capitalize section headings and no asterisks. Use the following format: \n\nPREDICTED ENGAGEMENT: \n\nGENERAL OVERVIEW: \n\nRECOMMENDED OPTION: \n\nKEY FACTORS: \n\nEvent: `;
        const result = await model.generateContent(instructions1 + prompt + instructions2);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error("Error in engagementAnalysis:", error);
        throw new Error("Failed to analyze engagement.");
      }
    }

  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  // Start the server
  app.listen({ port: 4004 }, () => {
    console.log("🚀 Personalization Service running at:");
    console.log("GraphQL API: http://localhost:4004/graphql");
  });
});


/* Tests for the GraphQL API Playground 

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
    volunteers: "John Doe: Experienced in teaching Python. Jane Smith: Skilled in JavaScript and web development. Alex Johnson: Beginner in programming but eager to help.",
    size: 200
  )
}

mutation {
  engagementAnalysis(prompt: "Parkinson's Walk for the Cure fundraising event taking place at Earl Bales Park, Toronto", size: 150)
}

*/