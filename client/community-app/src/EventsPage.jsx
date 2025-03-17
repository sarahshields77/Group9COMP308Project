import React from "react";
import { useNavigate } from "react-router-dom";

function EventsPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1>📅 Community Events</h1>
      <p>Find upcoming events and volunteer opportunities.</p>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default EventsPage;
