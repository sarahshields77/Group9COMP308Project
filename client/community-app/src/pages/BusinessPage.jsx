// client/community-app/src/pages/BusinessPage.jsx
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { businessClient } from "../apolloClients";
import CommunityNav from "../components/Shared/CommunityNav";
import BusinessList from "../components/Businesses/BusinessList";

export default function BusinessPage() {
  return (
    <ApolloProvider client={businessClient}>
      <div className="container mt-4">
        <CommunityNav />
        <h2>🏪 Local Businesses</h2>
        <p>Explore local businesses in your community.</p>
        <BusinessList />
      </div>
    </ApolloProvider>
  );
}
