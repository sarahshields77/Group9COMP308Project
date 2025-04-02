// client/community-app/src/pages/CommunityHub.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CommunityNav from "../components/Shared/CommunityNav";

function CommunityHub() {
  const navigate = useNavigate(); 

  return (
    <div className="container text-center mt-5">
      <CommunityNav />
      <h1>🌍 Community Hub</h1>
      <p>Choose where you want to go:</p>
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-info" onClick={() => navigate("/news")}>
          View Local News
        </button>
        <button className="btn btn-warning" onClick={() => navigate("/discussions")}>
          Join a Discussion
        </button>
        <button className="btn btn-success" onClick={() => navigate("/business")}>
          Support Local Businesses
        </button>
      </div>
    </div>
  );
}

export default CommunityHub;