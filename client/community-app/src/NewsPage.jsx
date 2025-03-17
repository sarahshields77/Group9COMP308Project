// client/community-app/src/NewsPage.jsx
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_NEWS = gql`
  query GetNews {
    getNews {
      title
      content
    }
  }
`;

function NewsPage() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_NEWS);

  if (loading) return <p className="text-center">Loading news...</p>;
  if (error) return <p className="text-center text-danger">Error loading news: {error.message}</p>;

  return (
    <div className="container mt-5 text-center">
      <h1>📰 Community News</h1>
      <ul className="list-group">
        {data.getNews.map((newsItem, index) => (
          <li key={index} className="list-group-item">
            <h3>{newsItem.title}</h3>
            <p>{newsItem.content}</p>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default NewsPage;
