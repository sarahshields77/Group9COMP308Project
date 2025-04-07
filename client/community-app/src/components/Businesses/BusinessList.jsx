// client/community-app/src/components/Businesses/BusinessList.jsx
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { businessClient } from "../../apolloClients";

const GET_BUSINESSES = gql`
  query GetBusinesses {
    getBusinesses {
      id
      name
      description
      location
      ownerId
      imageUrl
      createdAt
    }
  }
`;

export default function BusinessList() {
  const { data, loading, error } = useQuery(GET_BUSINESSES, { client: businessClient });

  if (loading) return <p>Loading businesses...</p>;
  if (error) return <p>Error loading businesses.</p>;

  return (
    <div>
      {data.getBusinesses.map((biz) => (
        <div key={biz.id} className="card my-3">
          <div className="card-body">
            {biz.imageUrl && (
              <img
                src={biz.imageUrl}
                alt={`${biz.name} logo`}
                className="img-fluid mb-2"
                style={{ maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }}
              />
            )}
            <h5 className="card-title">{biz.name}</h5>
            <p className="card-text">{biz.description}</p>
            <p><strong>Location:</strong> {biz.location}</p>
            <p><strong>Owner:</strong> {biz.ownerId}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
