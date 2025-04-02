// client/community-app/src/components/HelpRequests/HelpRequestForm.jsx
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

export const ADD_HELP_REQUEST = gql`
  mutation AddHelpRequest($title: String!, $description: String!, $category: String!, $postedBy: String!) {
    addHelpRequest(title: $title, description: $description, category: $category, postedBy: $postedBy) {
      id
    }
  }
`;

export default function HelpRequestForm() {
  const [form, setForm] = useState({ title: "", description: "", category: "", postedBy: "" });
  const [addRequest] = useMutation(ADD_HELP_REQUEST, {
    variables: form,
    onCompleted: () => setForm({ title: "", description: "", category: "", postedBy: "" }),
    refetchQueries: ["GetHelpRequests"]
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); addRequest(); }} className="mb-4">
      <input name="title" className="form-control mb-2" placeholder="Title" value={form.title} onChange={handleChange} />
      <textarea name="description" className="form-control mb-2" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="category" className="form-control mb-2" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="postedBy" className="form-control mb-2" placeholder="Your Name" value={form.postedBy} onChange={handleChange} />
      <button className="btn btn-primary" type="submit">Submit Request</button>
    </form>
  );
}
