// client/community-app/src/components/Businesses/BusinessList.jsx
import React from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";

const GET_BUSINESSES = gql`
  query GetBusinesses {
    getBusinesses {
      id
      name
      description
      location
      ownerId
      createdAt
    }
  }
`;

export default function BusinessList() {
  const client = useApolloClient();
  console.log("🔍 Using Apollo Client URI:", client.link.options.uri);
  const { data, loading, error } = useQuery(GET_BUSINESSES);
  console.log("🚀 BusinessList rendered");

  if (loading) return <p>Loading businesses...</p>;
  if (error) return <p>Error loading businesses.</p>;

  return (
    <div>
      {data.getBusinesses.map((biz) => (
        <div key={biz.id} className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{biz.name}</h5>
            <p className="card-text">{biz.description}</p>
            <p><strong>Location:</strong> {biz.location}</p>
            <p><strong>Contact:</strong> {biz.ownerId}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
