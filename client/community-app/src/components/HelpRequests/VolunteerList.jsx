// client/community-app/src/components/HelpRequests/VolunteerList.jsx
import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_VOLUNTEERS = gql`
  query GetVolunteers {
    getVolunteers {
      id
      name
      type
      contact
    }
  }
`;

export default function VolunteerList() {
  const { data, loading, error } = useQuery(GET_VOLUNTEERS);

  if (loading) return <p>Loading volunteers...</p>;
  if (error) return <p>Error loading volunteers.</p>;

  return (
    <div>
      {data.getVolunteers.map(v => (
        <div key={v.id} className="card my-2">
          <div className="card-body">
            <h5>{v.name}</h5>
            <p><strong>Type:</strong> {v.type}</p>
            <p><strong>Contact:</strong> {v.contact}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
