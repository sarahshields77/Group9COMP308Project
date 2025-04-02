// client/community-app/src/pages/HelpRequestsPage.jsx
import React from "react";
import CommunityNav from "../components/Shared/CommunityNav";
import HelpRequestForm from "../components/HelpRequests/HelpRequestForm";
import HelpRequestList from "../components/HelpRequests/HelpRequestList";

export default function HelpRequestsPage() {
  return (
    <div className="container mt-4">
      <CommunityNav />
      <h2>🙋 Help Requests</h2>
      <HelpRequestForm />
      <HelpRequestList />
    </div>
  );
}
