// client/community-app/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CommunityHub from "./CommunityHub";
import NewsPage from "./NewsPage";
import EventsPage from "./EventsPage";
import BusinessPage from "./BusinessPage";

// Apollo Client setup for GraphQL communication
const client = new ApolloClient({
  uri: "http://localhost:4002/graphql", // Placeholder for the future Community Service backend
  cache: new InMemoryCache(),
  credentials: "include"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename="/community">  
        <Routes>
          <Route path="/" element={<CommunityHub />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/business" element={<BusinessPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
