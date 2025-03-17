import React from "react";
import { useNavigate } from "react-router-dom";

function BusinessPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1>🏢 Local Businesses</h1>
      <p>Discover and support businesses in your community.</p>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default BusinessPage;
