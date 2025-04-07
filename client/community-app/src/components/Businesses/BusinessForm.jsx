// client/community-app/src/components/Businesses/BusinessForm.jsx
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { businessClient } from "../../apolloClients";
import useUser from "../../hooks/useUser";

const ADD_BUSINESS = gql`
  mutation AddBusiness($name: String!, $description: String, $location: String, $ownerId: String!, $imageUrl: String) {
    addBusiness(name: $name, description: $description, location: $location, ownerId: $ownerId, imageUrl: $imageUrl) {
      id
      name
    }
  }
`;

export default function BusinessForm() {
  const user = useUser(); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 

  const [addBusiness] = useMutation(ADD_BUSINESS, {
    client: businessClient,
    onCompleted: () => {
      setName("");
      setDescription("");
      setLocation("");
      setImageUrl("");
      alert("Business added!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBusiness({ variables: { name, description, location, ownerId: user.id, imageUrl } });
  };

  if (!user || user.role !== "BusinessOwner") return null;

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h5>📋 List a New Business</h5>
      <input
        className="form-control mb-2"
        placeholder="Business Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Image URL (e.g. https://...jpg)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div className="text-center">
        <button type="submit" className="btn btn-success mt-2">
          Add Business
        </button>
      </div>
    </form>
  );
}