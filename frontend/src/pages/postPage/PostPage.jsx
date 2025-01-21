import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function PostPage() {
  const [post, setPost] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchPost = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post: ", error.response?.data || error);
    }
  };
  useEffect(() => {

    fetchPost();
  }, []);
  const handleNewComment = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/comments`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      fetchPost();
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    }
  };
  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error);
    }
  };
  const handleLike = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error adding like:", error.response?.data || error);
    }
  };
  const handleUnlike = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error removing like:", error.response?.data || error);
    }
  };
  return (
    <section>
      <h1>Post Page</h1>
      <ul>
        <li>ID: {post._id}</li>
        <li>User: {post.user?.name}</li>
        <li>Photo: {post.photo}</li>
        <li>Text: {post.text}</li>
        <li>Like count: {post.likeCount}</li>
        <li>Is Liked: {post.isLiked ? "Yes" : "No"}</li>
        <li>Comments: {post.comments?.map((comment) => (
          <p key={comment._id}>{comment.user?.name}: {comment.text}</p>
        ))}</li>
      </ul>
      <p><Link to={`/posts/${post._id}/edit`}>Edit</Link> <button onClick={handleDeletePost}>Delete post</button></p>
      <p><button onClick={handleLike}>Like!</button><button onClick={handleUnlike}>Unlike!</button></p>
      <textarea placeholder="Add comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} /><br />
      <button onClick={handleNewComment}>Add comment</button>
    </section>
  );
}

export default PostPage;
