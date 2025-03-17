// client/community-app/src/CommunityHub.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function CommunityHub() {
  const navigate = useNavigate(); 

  return (
    <div className="container text-center mt-5">
      <h1>🌍 Community Hub</h1>
      <p>Choose where you want to go:</p>
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-info" onClick={() => navigate("/news")}>
          View Local News
        </button>
        <button className="btn btn-warning" onClick={() => navigate("/events")}>
          Find Local Events
        </button>
        <button className="btn btn-success" onClick={() => navigate("/business")}>
          Support Local Businesses
        </button>
      </div>
    </div>
  );
}

export default CommunityHub;