// server/community-service/components/News/NewsList.jsx

import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { personalizationClient } from "../../apolloClients";

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

const GENERATE_SUMMARY = gql`
  mutation GenerateSummary($prompt: String!, $size: Int!) {
    generateSummary(prompt: $prompt, size: $size)
  }
`;

export default function NewsList() {
  const { data, loading, error } = useQuery(GET_NEWS);
  const [summaries, setSummaries] = useState({});
  const [generateSummary] = useMutation(GENERATE_SUMMARY, {
    client: personalizationClient,
  });

// Generate summary for news stories
  useEffect(() => {
    if (data && data.getNews) {
      data.getNews.forEach(async (news) => {
        if (!summaries[news.id]) {
          try {

          // Combine the news message and all replies into a single prompt
          const prompt = `News Title: ${news.topic}, News Content: ${news.content}`;

          console.log("Prompt for Summary:", prompt);
            
            const { data: summaryData } = await generateSummary({
              variables: { prompt: prompt, size: 150 },
            });
            console.log("Summary Data:", summaryData);
            
            setSummaries((prev) => ({
              ...prev,
              [news.id]: summaryData.generateSummary,
            }));
          } catch (err) {
            console.error(`Error generating summary for news ${news.id}:`, err);
          }
        }
      });
    }
  }, [data, generateSummary, summaries]);


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
          {/* Summary Section */}
          {summaries[item.id] ? (
              <div className="alert alert-info">
                <strong>News Story Summary:</strong><br />{summaries[item.id]}
              </div>
            ) : (
              <div className="alert alert-warning">Generating summary...</div>
            )}

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
