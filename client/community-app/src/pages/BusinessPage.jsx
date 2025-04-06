// client/community-app/src/pages/BusinessPage.jsx
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { businessClient } from "../apolloClients";
import CommunityNav from "../components/Shared/CommunityNav";
import BusinessList from "../components/Businesses/BusinessList";
import BusinessForm from "../components/Businesses/BusinessForm";
import BusinessDealsForm from "../components/Businesses/BusinessDealsForm";

export default function BusinessPage() {
  return (
    <ApolloProvider client={businessClient}>
      <div className="container mt-4">
        <CommunityNav />
        <h2>🏪 Local Businesses</h2>
        <p>Explore local businesses in your community.</p>

        <BusinessForm />
        <BusinessDealsForm businessId="6611f68f3c5d56ff2fdf5d23" /> {/* <- temporary ID for testing */}
        
        <BusinessList />
      </div>
    </ApolloProvider>
  );
}
