// client/community-app/src/pages/EventsPage.jsx
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import useUser from "../../hooks/useUser";
import { businessClient } from "../../apolloClients";
import EventForm from "./EventForm";

const GET_EVENTS = gql`
  query GetEvents {
    getEvents {
      id
      title
      description
      location
      date
      createdAt
    }
  }
`;

function EventsPage() {
  const user = useUser();
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
    client: businessClient,
  });

  if (loading) return <p>Loading events...</p>;
  if (error) {
    console.error("❌ GraphQL Error:", error);
    return <p className="text-danger">Error loading events: {error.message}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>📅 Community Events</h2>

      {user?.role === "CommunityOrganizer" && (
        <>
          <button
            className="btn btn-primary mb-3"
            onClick={() => {
              setShowForm(!showForm);
              setEditEvent(null); // Reset editing mode
            }}
          >
            {showForm ? "➖ Cancel" : "➕ Create New Event"}
          </button>
          {showForm && (
            <EventForm
              onCreatedOrUpdated={() => {
                setShowForm(false);
                setEditEvent(null);
                refetch();
              }}
              initialEvent={editEvent}
            />
          )}
        </>
      )}

      <ul className="list-group">
        {data.getEvents.map((event) => (
          <li key={event.id} className="list-group-item mb-3">
            <h5>{event.title}</h5>
            <p>{event.description}</p>
            <p>
              <strong>📍 Location:</strong> {event.location}
            </p>
            <p>
              <strong>📆 Date:</strong>{" "}
              {new Date(Number(event.date)).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>

            {user?.role === "CommunityOrganizer" && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setEditEvent(event);
                  setShowForm(true);
                }}
              >
                ✏️ Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
