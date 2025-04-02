import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_REPLY = gql`
  mutation AddReply($discussionId: ID!, $message: String!, $author: String!) {
    addReply(discussionId: $discussionId, message: $message, author: $author) {
      id
    }
  }
`;

export default function ReplyForm({ discussionId }) {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [addReply] = useMutation(ADD_REPLY, {
    refetchQueries: ["GetReplies"]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !author) return;
    await addReply({ variables: { discussionId, message, author } });
    setMessage("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <input
        className="form-control mb-2"
        placeholder="Reply"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button className="btn btn-primary btn-sm">Post Reply</button>
    </form>
  );
}
