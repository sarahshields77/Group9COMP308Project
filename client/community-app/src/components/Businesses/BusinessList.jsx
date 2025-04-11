// client/community-app/src/components/Businesses/BusinessList.jsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { businessClient } from "../../apolloClients";
import { personalizationClient } from "../../apolloClients";
import useUser from "../../hooks/useUser";
import ReviewForm from "./ReviewForm";

const GET_BUSINESSES = gql`
  query GetBusinesses {
    getBusinesses {
      id
      name
      description
      location
      ownerId
      imageUrl
      createdAt
    }
  }
`;

const GET_REVIEWS = gql`
  query GetReviews($businessId: ID!) {
    getReviews(businessId: $businessId) {
      id
      author
      text
      rating
      reply
      createdAt
    }
  }
`;

const REPLY_TO_REVIEW = gql`
  mutation ReplyToReview($reviewId: ID!, $reply: String!) {
    replyToReview(reviewId: $reviewId, reply: $reply) {
      id
      reply
    }
  }
`;

const GENERATE_SENTIMENT_ANALYSIS = gql`
  mutation AnalyzeSentiment($prompt: String!, $size: Int!) {
    analyzeSentiment(prompt: $prompt, size: $size)
  }
`;

function ReviewsList({ businessId, currentUser, ownerId }) {
  const user = useUser();
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const [analyzeSentiment] = useMutation(GENERATE_SENTIMENT_ANALYSIS, {
    client: personalizationClient,
  });

  const { data, loading, error, refetch } = useQuery(GET_REVIEWS, {
    variables: { businessId },
    client: businessClient,
  });

  const [replyToReview] = useMutation(REPLY_TO_REVIEW, {
    client: businessClient,
    onCompleted: () => {
      setReplyingTo(null);
      setReplyText("");
      refetch();
    }
  });
    
  // Sentiment analysis for all reviews as a whole
  useEffect(() => {
    if (data && data.getReviews && data.getReviews.length > 0) {
      const allReviewsText = data.getReviews.map((review) => review.text).join(" ");
      (async () => {
        try {
          const { data: sentimentData } = await analyzeSentiment({
            variables: { prompt: allReviewsText, size: 300 },
          });
          setSentiment(sentimentData.analyzeSentiment);
        } catch (err) {
          console.error(`Error generating sentiment analysis for business ${businessId}:`, err);
        }
      })();
    }
  }, [data, analyzeSentiment]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews.</p>;

  return (
    <div className="mt-3">
      <hr /><h4>⭐ Customer Reviews ⭐</h4>
      
      {/* Sentiment Analysis */}
      {sentiment ? (
        <div className="alert alert-info">
          <strong>Sentiment Analysis:</strong><br />{sentiment}
        </div>
      ) : (
        <div className="alert alert-warning">Generating sentiment analysis...</div>
      )}

      
      {data.getReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <>
        {data.getReviews.map((review) => (            

        <div key={review.id} className="border p-2 rounded mb-2">
          <p><strong>{review.author}</strong> rated it {review.rating}/5</p>
          <p>{review.text}</p>
          {review.reply ? (
            <p className="text-muted"><strong>Owner Reply:</strong> {review.reply}</p>
          ) : (
            currentUser?.id === ownerId && (
              <div>
                {replyingTo === review.id ? (
                  <>
                    <textarea
                      className="form-control mb-2"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                    />
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() =>
                        replyToReview({ variables: { reviewId: review.id, reply: replyText } })
                      }
                    >
                      Submit Reply
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setReplyingTo(review.id)}
                  >
                    Reply
                  </button>
                )}
              </div>
            )
          )}

        </div>  
        ))}
        </>
      )}
    </div>
  );
}

export default function BusinessList() {
  const { data, loading, error } = useQuery(GET_BUSINESSES, { client: businessClient });
  const user = useUser();
  const [visibleReviewFormId, setVisibleReviewFormId] = useState(null);

  if (loading) return <p>Loading businesses...</p>;
  if (error) return <p>Error loading businesses.</p>;

  return (
    <div>
      {data.getBusinesses.map((biz) => (
        <div key={biz.id} className="card my-3">          
          <div className="card-body">
            {biz.imageUrl && (
              <img
                src={biz.imageUrl}
                alt={`${biz.name} logo`}
                className="img-fluid mb-2"
                style={{ maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }}
              />
            )}
            <h5 className="card-title">{biz.name}</h5>
            <p className="card-text">{biz.description}</p>
            <p><strong>Location:</strong> {biz.location}</p>
            <p><strong>Owner:</strong> {biz.ownerId}</p>

            {user?.role === "Resident" && (
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-outline-primary mt-2"
                  onClick={() =>
                    setVisibleReviewFormId(prev => prev === biz.id ? null : biz.id)
                  }
                >
                  {visibleReviewFormId === biz.id ? "Cancel" : "Leave a Review"}
                </button>
              </div>
            )}

            {visibleReviewFormId === biz.id && (
              <ReviewForm businessId={biz.id} onClose={() => setVisibleReviewFormId(null)} />
            )}
            <ReviewsList businessId={biz.id} currentUser={user} ownerId={biz.ownerId} />
          </div>
        </div>
      ))}
    </div>
  );
}
