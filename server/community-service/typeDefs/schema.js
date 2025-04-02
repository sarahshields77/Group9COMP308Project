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

  type Discussion {
  id: ID!
  topic: String!
  message: String!
  author: String!
  createdAt: String!
  }

  extend type Query {
    getDiscussions: [Discussion]
  }

  extend type Mutation {
    addDiscussion(topic: String!, message: String!, author: String): Discussion
  }

  type HelpRequest {
  id: ID!
  title: String!
  description: String!
  category: String!
  postedBy: String!
  createdAt: String!
}

extend type Query {
  getHelpRequests: [HelpRequest]
}

extend type Mutation {
  addHelpRequest(title: String!, description: String!, category: String!, postedBy: String!): HelpRequest
}
`;
