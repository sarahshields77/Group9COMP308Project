import React from "react";
import { useNavigate } from "react-router-dom";

function NewsPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1>📰 Community News</h1>
      <p>Latest updates and discussions from your community.</p>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default NewsPage;
