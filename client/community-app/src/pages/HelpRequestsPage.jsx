// client/community-app/src/pages/HelpRequestsPage.jsx
import React, { useState } from "react";
import CommunityNav from "../components/Shared/CommunityNav";
import HelpRequestForm from "../components/HelpRequests/HelpRequestForm";
import HelpRequestList from "../components/HelpRequests/HelpRequestList";
import VolunteerList from "../components/HelpRequests/VolunteerList";

export default function HelpRequestsPage() {
  const [showVolunteers, setShowVolunteers] = useState(false);

  return (
    <div className="container mt-4">
      <CommunityNav />
      <h2>🙋 Help Requests</h2>
      <HelpRequestForm />

      <button
        onClick={() => setShowVolunteers(!showVolunteers)}
        className="btn btn-outline-info mb-4"
      >
        {showVolunteers ? "Hide Volunteers" : "View Available Volunteers"}
      </button>

      {showVolunteers && <VolunteerList />}

      <HelpRequestList />
    </div>
  );
}
