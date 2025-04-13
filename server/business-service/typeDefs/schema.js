// server/business-service/typeDefs/schema.js
const { gql } = require("apollo-server-express");

module.exports = gql`
  type Business {
    id: ID!
    name: String!
    description: String
    location: String
    ownerId: String!
    imageUrl: String
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

  type Review {
    id: ID!
    businessId: ID!
    author: String!
    text: String!
    rating: Int!
    reply: String
    createdAt: String
  }

  type Query {
    getBusinesses: [Business]
    getDeals: [Deal]
    getEvents: [Event]
    getReviews(businessId: ID!): [Review]  # <-- filtered by business
  }

  type Mutation {
    addBusiness(name: String!, description: String, location: String, ownerId: String!, imageUrl: String): Business
    addDeal(title: String!, description: String, businessId: ID!, validUntil: String): Deal
    addEvent(id: ID, title: String!, description: String, location: String, date: String, organizerId: String!): Event
    addReview(businessId: ID!, author: String!, text: String!, rating: Int!): Review
    replyToReview(reviewId: ID!, reply: String!): Review
  }
`;
