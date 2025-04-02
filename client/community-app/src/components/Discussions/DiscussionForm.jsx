// client/community-app/src/components/Discussions/DiscussionForm.jsx
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { GET_DISCUSSIONS } from "./DiscussionList";

const ADD_DISCUSSION = gql`
  mutation AddDiscussion($topic: String!, $message: String!, $author: String) {
    addDiscussion(topic: $topic, message: $message, author: $author) {
      id
      topic
      message
      author
      createdAt
    }
  }
`;

export default function DiscussionForm() {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [addDiscussion] = useMutation(ADD_DISCUSSION, {
    onCompleted: () => {
      setTopic("");
      setMessage("");
      setAuthor("");
    },
    refetchQueries: ["GetDiscussions"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic || !message) return;
    await addDiscussion({ variables: { topic, message, author } });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input className="form-control mb-2" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      <textarea className="form-control mb-2" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <input className="form-control mb-2" placeholder="Your Name (optional)" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <button className="btn btn-primary" type="submit">Post Discussion</button>
    </form>
  );
}
