// server/community-service/components/News/NewsForm.jsx

import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { GET_NEWS } from "./NewsList";

const ADD_NEWS = gql`
  mutation AddNews($title: String!, $content: String!) {
    addNews(title: $title, content: $content) {
      id
      title
      content
      createdAt
    }
  }
`;

export default function NewsForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addNews] = useMutation(ADD_NEWS, {
    onCompleted: () => {
      setTitle("");
      setContent("");
    },
    refetchQueries: [{ query: GET_NEWS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    await addNews({ variables: { title, content } });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input className="form-control mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="form-control mb-2" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button className="btn btn-success" type="submit">Post News</button>
    </form>
  );
}
