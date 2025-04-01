// server/community-service/typeDefs/schema.js

const { gql } = require("apollo-server-express");

module.exports = gql`
  type News {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
  }

  type Query {
    getNews: [News]
  }

  type Mutation {
    addNews(title: String!, content: String!): News
  }
`;
