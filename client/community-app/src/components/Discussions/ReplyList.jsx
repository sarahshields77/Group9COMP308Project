import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_REPLIES = gql`
  query GetReplies($discussionId: ID!) {
    getReplies(discussionId: $discussionId) {
      id
      message
      author
      createdAt
    }
  }
`;

export default function ReplyList({ discussionId }) {
  const { data, loading, error } = useQuery(GET_REPLIES, {
    variables: { discussionId }
  });

  if (loading) return <p>Loading replies...</p>;
  if (error) {
    console.error("Error in ReplyList:", error.message);
    return <p>Sorry! Something went wrong while loading replies.</p>;
  }

  if (data.getReplies.length === 0) {
    return <p>No replies yet. Continue the conversation!</p>;
  }

  return (
    <div className="mt-2">
      {data.getReplies.map((reply) => (
        <div key={reply.id} className="card mb-1 p-2">
          <p className="mb-1">{reply.message}</p>
          <small className="text-muted">By {reply.author} on {new Date(Number(reply.createdAt)).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
