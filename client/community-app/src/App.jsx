// client/community-app/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { communityClient } from "./apolloClients";
import CommunityHub from "./pages/CommunityHub";
import NewsPage from "./pages/NewsPage";
import EventsPage from "./pages/EventsPage";
import DiscussionsPage from "./pages/DiscussionPage";
import HelpRequestsPage from "./pages/HelpRequestsPage";
import BusinessPage from "./pages/BusinessPage";
import "bootstrap/dist/css/bootstrap.min.css";
import EmergencyAlertsPage from "./components/EmergencyAlerts/EmergencyAlert";

const client = new ApolloClient({
  uri: "http://localhost:4002/graphql",
  cache: new InMemoryCache(),
  credentials: "include"
});

function App() {
  return (
    <ApolloProvider client={communityClient}>
      <BrowserRouter basename="/community">
        <Routes>
          <Route path="/" element={<CommunityHub />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/discussions" element={<DiscussionsPage />} />
          <Route path="/help" element={<HelpRequestsPage />} />
          <Route path="/emergencies" element={<EmergencyAlertsPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
