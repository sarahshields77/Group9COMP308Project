// client/community-app/src/components/Shared/CommunityNav.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import "./CommunityNav.css";
import EmergencyAlertsPage from "../EmergencyAlerts/EmergencyAlert";
import { ApolloProvider } from "@apollo/client";
import { communityClient } from "../../apolloClients";

export default function CommunityNav() {
  return (
    <nav className="community-nav">
      <NavLink to="/" className="nav-item" end>
        🏡 <span>Hub</span>
      </NavLink>
      <NavLink to="/news" className="nav-item">
        🗞️ <span>News</span>
      </NavLink>
      <NavLink to="/discussions" className="nav-item">
        💬 <span>Discussions</span>
      </NavLink>
      <NavLink to="/help" className="nav-item">
        🙋 <span>Help Requests</span>
      </NavLink>
      <NavLink to="/business" className="nav-item">
        🏪 <span>Local Businesses</span>
      </NavLink>
      <div className="nav-item">
      <ApolloProvider client={communityClient}>
          <EmergencyAlertsPage />
        </ApolloProvider>
      </div>
    </nav>
  );
}
