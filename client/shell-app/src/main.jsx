// client/shell-app/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RoleProvider } from "./contexts/RoleContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './index.css';
import './App.css';

// Set up Apollo Client for GraphQL communication
const client = new ApolloClient({
  uri: "http://localhost:4001/graphql", // Auth-microservice endpoint
  cache: new InMemoryCache(),
  credentials: "include"
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RoleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RoleProvider>
    </ApolloProvider>
  </React.StrictMode>
);
