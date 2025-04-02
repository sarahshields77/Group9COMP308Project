// client/community-app/src/components/Discussions/DiscussionList.jsx
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

const GET_DISCUSSIONS = gql`
  query GetDiscussions {
    getDiscussions {
      id
      topic
      message
      author
      createdAt
    }
  }
`;

export default function DiscussionList() {
  const { data, loading, error } = useQuery(GET_DISCUSSIONS);
  const [activeReplyForm, setActiveReplyForm] = useState(null);

  const toggleReplyForm = (id) => {
    setActiveReplyForm(prevId => (prevId === id ? null : id));
  };

  if (loading) return <p>Loading discussions...</p>;
  if (error) {
    console.error("Error in DiscussionList:", error.message);
    return <p>Sorry! Something went wrong while loading discussions.</p>;
  }
  
  if (data.getDiscussions.length === 0) {
    return <p>No discussions yet. Start the conversation!</p>;
  }

  return (
    <div className="mt-4">
      {data.getDiscussions.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{item.topic}</h5>
            <p className="card-text">{item.message}</p>
            <p className="card-footer text-muted" style={{ fontSize: "0.8em" }}>
              Posted by: {item.author || "Anonymous"} on {new Date(Number(item.createdAt)).toLocaleString()}
            </p>

            {/* Replies */}
            <div className="mt-3">
              <h6>Replies</h6>
              <ReplyList discussionId={item.id} />

              <button
                className="btn btn-sm btn-outline-secondary mt-2"
                onClick={() => toggleReplyForm(item.id)}
              >
                {activeReplyForm === item.id ? "Cancel" : "Reply"}
              </button>

              {activeReplyForm === item.id && (
                <ReplyForm discussionId={item.id} onClose={() => setActiveReplyForm(null)} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

