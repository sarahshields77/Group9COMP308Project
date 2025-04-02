import React from "react";
import DiscussionForm from "../components/Discussions/DiscussionForm";
import DiscussionList from "../components/Discussions/DiscussionList";
import CommunityNav from "../components/Shared/CommunityNav";


export default function DiscussionsPage() {
  return (
    <div className="container mt-4">
      <CommunityNav />
      <h2>💬 Neighbourhood Discussions</h2>
      <DiscussionForm />
      <DiscussionList />
    </div>
  );
}
