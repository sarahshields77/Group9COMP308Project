// client/community-app/src/components/Businesses/BusinessForm.jsx
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { businessClient } from "../../apolloClients";
import useUser from "../../hooks/useUser";

const ADD_DEAL = gql`
  mutation AddDeal($title: String!, $description: String, $businessId: ID!, $validUntil: String) {
    addDeal(title: $title, description: $description, businessId: $businessId, validUntil: $validUntil) {
      id
      title
    }
  }
`;

export default function BusinessDealsForm({ businessId }) {
  const user = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validUntil, setValidUntil] = useState("");

  const [addDeal, { loading, error }] = useMutation(ADD_DEAL, {
    client: businessClient,
    onCompleted: () => {
      setTitle("");
      setDescription("");
      setValidUntil("");
      alert("🎉 Deal added!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !businessId) return;
    addDeal({ variables: { title, description, businessId, validUntil } });
  };

  if (!user || user.role !== "BusinessOwner") return null;

  return (
    <form onSubmit={handleSubmit} className="card p-3 my-4">
      <h4>💸 Add a Deal</h4>
      <input
        className="form-control mb-2"
        placeholder="Deal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={validUntil}
        onChange={(e) => setValidUntil(e.target.value)}
      />
      <div className="text-center">
        <button type="submit" className="btn btn-primary mt-2">
          Post Deal
        </button>
      </div>
    </form>
  );
}
