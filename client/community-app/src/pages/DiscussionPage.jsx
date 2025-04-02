import React from "react";
import DiscussionForm from "../components/Discussions/DiscussionForm";
import DiscussionList from "../components/Discussions/DiscussionList";

export default function DiscussionsPage() {
  return (
    <div className="container mt-4">
      <h2>💬 Neighbourhood Discussions</h2>
      <DiscussionForm />
      <DiscussionList />
    </div>
  );
}
