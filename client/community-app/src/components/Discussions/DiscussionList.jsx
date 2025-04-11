// client/community-app/src/components/Discussions/DiscussionList.jsx

import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { personalizationClient } from "../../apolloClients";
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

const GENERATE_SUMMARY = gql`
  mutation GenerateSummary($prompt: String!, $size: Int!) {
    generateSummary(prompt: $prompt, size: $size)
  }
`;

export default function DiscussionList() {
  const { data, loading, error } = useQuery(GET_DISCUSSIONS);
  const [activeReplyForm, setActiveReplyForm] = useState(null);
  const [summaries, setSummaries] = useState({});
  const [discussionReplies, setDiscussionReplies] = useState({});
  const [generateSummary] = useMutation(GENERATE_SUMMARY, {
    client: personalizationClient,
  });

  // Generate summary for discussions and their replies
  useEffect(() => {
    if (data && data.getDiscussions) {
      data.getDiscussions.forEach(async (discussion) => {
        if (!summaries[discussion.id]) {
          try {

          // Combine the discussion message and all replies into a single prompt
          const combinedContent = `Discussion Title: ${discussion.topic}, Discussion Post: ${discussion.message}, Replies: \n` +
            discussionReplies[discussion.id]?.map(
              (reply) => `${reply.author || "Anonymous"}: ${reply.message}`
            ).join("\n") || "No replies yet.";

          console.log("Combined Content for Summary:", combinedContent);
            
            const { data: summaryData } = await generateSummary({
              variables: { prompt: combinedContent, size: 150 },
            });
            setSummaries((prev) => ({
              ...prev,
              [discussion.id]: summaryData.generateSummary,
            }));
          } catch (err) {
            console.error(`Error generating summary for discussion ${discussion.id}:`, err);
          }
        }
      });
    }
  }, [data, generateSummary, summaries]);

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

          {/* Summary Section */}
          {summaries[item.id] ? (
              <div className="alert alert-info">
                <strong>Discussion Summary:</strong><br />{summaries[item.id]}
              </div>
            ) : (
              <div className="alert alert-warning">Generating summary...</div>
            )}

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