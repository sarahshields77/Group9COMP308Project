// client/community-app/src/components/Businesses/ReviewForm.jsx
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { businessClient } from "../../apolloClients";
import useUser from "../../hooks/useUser";

const ADD_REVIEW = gql`
  mutation AddReview($businessId: ID!, $author: String!, $text: String!, $rating: Int!) {
    addReview(businessId: $businessId, author: $author, text: $text, rating: $rating) {
      id
      text
      rating
    }
  }
`;

export default function ReviewForm({ businessId, onClose }) {
  const user = useUser();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    client: businessClient,
    onCompleted: () => {
      alert("✅ Review submitted!");
      setText("");
      setRating(5);
      if (onClose) onClose();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({
      variables: {
        businessId,
        author: user?.username || "Anonymous",
        text,
        rating: parseInt(rating)
      }
    });
  };

  if (!user || user.role !== "Resident") return null;

  return (
    <form onSubmit={handleSubmit} className="card p-3 my-3">
      <h6>📝 Leave a Review</h6>
      <textarea
        className="form-control mb-2"
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Rating (1-5)"
        value={rating}
        min="1"
        max="5"
        onChange={(e) => setRating(e.target.value)}
      />
      <div className="text-end">
        <button type="submit" className="btn btn-primary btn-sm me-2">Submit</button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}