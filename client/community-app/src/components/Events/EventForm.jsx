// client/community-app/src/components/Events/EventForm.jsx
import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { businessClient } from "../../apolloClients";
import useUser from "../../hooks/useUser";

const ADD_OR_UPDATE_EVENT = gql`
  mutation AddOrUpdateEvent(
    $id: ID
    $title: String!
    $description: String
    $location: String!
    $date: String!
    $organizerId: String!
  ) {
    addEvent(
      id: $id
      title: $title
      description: $description
      location: $location
      date: $date
      organizerId: $organizerId
    ) {
      id
      title
    }
  }
`;

function EventForm({ onCreatedOrUpdated, initialEvent }) {
  const user = useUser();
  const isEditMode = Boolean(initialEvent);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (initialEvent) {
      setForm({
        title: initialEvent.title.replace(/^🚫 Cancelled:\s*/, ""),
        description: initialEvent.description,
        location: initialEvent.location,
        date: new Date(Number(initialEvent.date))
          .toISOString()
          .slice(0, 16),
      });
      setIsCancelled(initialEvent.title.startsWith("🚫 Cancelled:"));
    }
  }, [initialEvent]);

  const [submitEvent, { loading, error }] = useMutation(ADD_OR_UPDATE_EVENT, {
    client: businessClient,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalTitle = isCancelled ? `🚫 CANCELLED: ${form.title}` : form.title;

    try {
      await submitEvent({
        variables: {
          id: initialEvent?.id,
          title: finalTitle,
          description: form.description,
          location: form.location,
          date: form.date,
          organizerId: user?.id || "test-organizer-1",
        },
      });
      alert(`✅ Event ${isEditMode ? "updated" : "created"} successfully!`);
      if (onCreatedOrUpdated) onCreatedOrUpdated();
    } catch (err) {
      console.error("❌ Submission error:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded bg-light">
      <h5>{isEditMode ? "Edit Event" : "Create a New Event"}</h5>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
          rows="3"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date & Time</label>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {isEditMode && (
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="cancelEvent"
            checked={isCancelled}
            onChange={(e) => setIsCancelled(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="cancelEvent">
            Mark as Cancelled
          </label>
        </div>
      )}

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading
          ? isEditMode
            ? "Updating..."
            : "Creating..."
          : isEditMode
          ? "Update Event"
          : "Create Event"}
      </button>

      {error && <p className="text-danger mt-2">❌ {error.message}</p>}
    </form>
  );
}

export default EventForm;
