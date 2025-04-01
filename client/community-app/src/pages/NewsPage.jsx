// client/community-app/src/pages/NewsPage.jsx
import React from "react";
import NewsForm from "../components/News/NewsForm";
import NewsList from "../components/News/NewsList";

export default function NewsPage() {
  return (
    <div className="container mt-4">
      <h2>🗞️ Community News</h2>
      <NewsForm />
      <NewsList />
    </div>
  );
}
