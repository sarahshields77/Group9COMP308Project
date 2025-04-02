import React from "react";
import { useQuery, gql } from "@apollo/client";

export const GET_DISCUSSIONS = gql`
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading discussions.</p>;

  return (
    <div className="mt-4">
      {data.getDiscussions.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{item.topic}</h5>
            <p className="card-text">{item.message}</p>
            <p className="card-text text-muted" style={{ fontSize: "0.8em" }}>
              {item.author ? `Posted by: ${item.author}` : "Anonymous"} |{" "}
              {new Date(Number(item.createdAt)).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
