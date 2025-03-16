// client/auth-app/src/App.jsx
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LoginPage from "./LoginPage";

// Set up Apollo Client for GraphQL authentication requests
const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
  credentials: "include"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <LoginPage />
    </ApolloProvider>
  );
}

export default App;
