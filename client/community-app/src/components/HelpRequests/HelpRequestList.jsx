// client/community-app/src/components/HelpRequests/HelpRequestList.jsx
import React from "react";
import { gql, useQuery } from "@apollo/client";

export const GET_HELP_REQUESTS = gql`
  query GetHelpRequests {
    getHelpRequests {
      id
      title
      description
      category
      postedBy
      createdAt
    }
  }
`;

export default function HelpRequestList() {
  const { data, loading, error } = useQuery(GET_HELP_REQUESTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading help requests.</p>;

  return (
    <div>
      {data.getHelpRequests.map(req => (
        <div key={req.id} className="card mb-3">
          <div className="card-body">
            <h5>{req.title}</h5>
            <p>{req.description}</p>
            <p><strong>Category:</strong> {req.category}</p>
            <p className="text-muted" style={{ fontSize: "0.8em" }}>
              Posted by {req.postedBy} on {new Date(parseInt(req.createdAt)).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
