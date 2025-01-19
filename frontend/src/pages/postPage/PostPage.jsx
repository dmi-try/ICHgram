import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostPage() {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post: ", error.response?.data || error);
      }
    };

    fetchPost();
  }, []);

  return (
    <div>
      <h1>Post Page</h1>
      <ul>
        <li>ID: {post._id}</li>
        <li>User: {post.user?.name}</li>
        <li>Photo: {post.photo}</li>
        <li>Text: {post.text}</li>
      </ul>
    </div>
  );
}

export default PostPage;
