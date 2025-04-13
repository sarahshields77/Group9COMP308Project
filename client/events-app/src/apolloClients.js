// client/community-app/src/apolloClients.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const communityClient = new ApolloClient({
  uri: "http://localhost:4002/graphql", // Community service
  cache: new InMemoryCache(),
  credentials: "include",
});

export const businessClient = new ApolloClient({
  uri: "http://localhost:4003/graphql", // Business service
  cache: new InMemoryCache(),
  credentials: "include",
});

export const personalizationClient = new ApolloClient({
  uri: "http://localhost:4004/graphql", // Personalization service
  cache: new InMemoryCache(),
  credentials: "include",
});