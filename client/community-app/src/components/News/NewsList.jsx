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
    console.error("❌ Apollo Error in NewsList:", error);
    return <p>Error loading news.</p>;
  }
  console.log("📅 News data:", data.getNews);
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
