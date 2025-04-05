// server/business-service/typeDefs/schema.js
const { gql } = require("apollo-server-express");

module.exports = gql`
  type Business {
    id: ID!
    name: String!
    description: String
    location: String
    ownerId: String!
    createdAt: String
  }

  type Deal {
    id: ID!
    title: String!
    description: String
    businessId: ID!
    validUntil: String
    createdAt: String
  }

  type Event {
    id: ID!
    title: String!
    description: String
    location: String
    date: String
    organizerId: String!
    createdAt: String
  }

  type Query {
    getBusinesses: [Business]
    getDeals: [Deal]
    getEvents: [Event]
  }

  type Mutation {
    addBusiness(name: String!, description: String, location: String, ownerId: String!): Business
    addDeal(title: String!, description: String, businessId: ID!, validUntil: String): Deal
    addEvent(title: String!, description: String, location: String, date: String, organizerId: String!): Event
  }
`;
