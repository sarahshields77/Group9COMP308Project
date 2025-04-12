// client/community-app/src/EventsPage.jsx
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_EVENTS = gql`
  query GetEvents {
    getEvents {
      name
      date
      location
    }
  }
`;

function EventsPage() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p className="text-center">Loading events...</p>;
  if (error) return <p className="text-center text-danger">Error loading events: {error.message}</p>;

  return (
    <div className="container mt-4 text-center">
      <h1>📅 Community Events</h1>
      <ul className="list-group">
        {data.getEvents.map((event, index) => (
          <li key={index} className="list-group-item">
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default EventsPage;
