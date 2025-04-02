// server/community-service/components/News/NewsList.jsx

import React from "react";
import { useQuery, gql } from "@apollo/client";

export const GET_NEWS = gql`
  query GetNews {
    getNews {
      id
      title
      content
      createdAt
    }
  }
`;

export default function NewsList() {
  const { data, loading, error } = useQuery(GET_NEWS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error in NewsList:", error.message);
    return <p>Sorry! Something went wrong while loading news.</p>;
  }
  
  if (data.getNews.length === 0) {
    return <p>No news yet. Start reporting!</p>;
  }

  return (
    <div className="mt-4">
      {data.getNews.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.content}</p>
            <p className="card-text text-muted" style={{ fontSize: "0.8em" }}>
              Posted: {item.createdAt ? new Date(item.createdAt).toLocaleString() : "Unknown date"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
