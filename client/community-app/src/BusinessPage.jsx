// client/community-app/src/BusinessPage.jsx
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_BUSINESSES = gql`
  query GetBusinesses {
    getBusinesses {
      name
      category
    }
  }
`;

function BusinessPage() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BUSINESSES);

  if (loading) return <p className="text-center">Loading businesses...</p>;
  if (error) return <p className="text-center text-danger">Error loading businesses: {error.message}</p>;

  return (
    <div className="container mt-5 text-center">
      <h1>🏢 Local Businesses</h1>
      <ul className="list-group">
        {data.getBusinesses.map((business, index) => (
          <li key={index} className="list-group-item">
            <h3>{business.name}</h3>
            <p><strong>Category:</strong> {business.category}</p>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default BusinessPage;
